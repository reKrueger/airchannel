
  
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css'
import api from './../api'
import ProgressBar from './../progressbar'
import Itemlist from './uploadFileList'
import FinishView from './uploadFinishView'
import SendView from './sendView'
import range from '../helpers/getRange';
import CancelView from './cancelView';
import colors from './../colors'
import { VscDiffAdded } from "react-icons/vsc";
import { cancelUploadSwal, newUploadSwal } from './../alertViews';
import { simpleInfoView } from './../infoViews';
import Modal from 'react-modal';
import roundFileSize from '../helpers/roundFileSze';
import axios from 'axios'
import axiosRetry from 'axios-retry';

const SendViewStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: `1px solid ${colors.black}`,
      borderRadius: '2px',
      background: 'rgba(236, 236, 236, 0.668)'
    },overlay: { background: 'rgba(64, 64, 64, 0.668)' } // blur background
};


const CHUNK_SIZE = 548576 //1048576 * 2// 1MB 
const BUCKET_COUNT = 110
const UPLOAD_THREAD = 170
const source = axios.CancelToken.source();

export default class UploadView extends React.Component{
    constructor(props){
        super(props);
        this.state={ 
            files:[],
            infos:{},
            showProgress: false,
            full_count: 0,
            full_size: 0,
            progress: 0,
            openSendView: false,
            mailConfirm: '',
            upload_success: false,
            visible: false,
            link: '',
            isLink: null,
            fileLoopBreak: false,
            majorId: null,
            loaded: new Map(),
            upload_begin: ''

        }
        this.baseState = this.state 
        
    }
  
    
    resetUpload = () => {
        this.setState({
            showProgress: false,
            process: 0,
            upload_success: false,
        })
    }

    timeout=(ms)=> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    cancelUpload = ()=>{
        
        if(this.state.fileLoopBreak){
            console.log('this.cancelUpload')
            source.cancel('post canceled.')
            this.setState(this.baseState)
        }
    }

    

    uploadIsCancel = async(id, file)=>{
        const filename = file.file_guid
        await api.remove_file_detail(id, filename).then(res=>{
            const is_remove = res.data.isSuccess
            if(is_remove){
                this.removeItem(file)
                this.setState({majorId: id})
                console.log('file gelöscht............!')
                this.resetUpload()
            }
        })

    }

    newConnect = async(file, id, count , chunkCount )=>{
        var connect = true
        while (connect){
            console.log('wiederhole verbindung')
                try{
                    const ping = await api.create_ping()
                    if(ping){
                        console.log(ping.data.is)
                        console.log('**** CONNECT *****')
                        connect = false
                        await this.counterOfFile(file, id, count , chunkCount )

                    }
                }catch{
                    if(!this.state.showProgress){
                        connect = false
                    }
                    await this.timeout(3000);
                }
        }
    }
    

    newUpload = async()=>{
        const answer =  await newUploadSwal()
        if(answer){
            this.setState({
                upload_success: false, 
                use_link: null,
                use_email: null
            })
        }
    }

    progressAction = (progressEvent, count, fullCount)=>{
        this.cancelUpload()
        const chunk = ((progressEvent.loaded/10000) / (progressEvent.total/10000)) * 100
        console.log('chunk ',count,': ',Math.floor(progressEvent.loaded/100000),  ' => ',Math.floor(progressEvent.total/100000))
        const add = (acc, a)=>{
            return acc + a
        }
        const u = Array.from(this.state.loaded.values()).reduce(add, 0)
        this.state.loaded.set(count , chunk)
        this.setState({progress: u / fullCount})
    }

    // ********************
    // *******FIIE*********
    // ********************
    getFileContext = (e) => {
        const files = []
        const file_arr = Array.from(e.target.files)
        var full_count = 0
        var full_size = this.state.full_size
        file_arr.forEach(file=>{
            const _file = file;
            const _totalCount =  Math.ceil(file.size / CHUNK_SIZE) // counts of cjunks
            const _fileID = uuidv4() 
            const file_json = {
                chunk_count: _totalCount,
                file_size: _file.size,
                origin_name: _file.name,
                file_guid: _fileID,
                file_data: _file,
                chunks: []
            }
            full_count = full_count + _totalCount
            full_size = full_size + _file.size
            files.push(file_json)
        })
        this.setState({files: [...this.state.files, ...files], full_count: this.state.full_count + full_count, full_size})
        
    }


    // ACTION
    // user send data........
    //
    send = (infos)=>{
        const {files} = this.state
        this.setState({openSendView: false, showProgress: true, infos}, ()=>{
            this.createMajor(files, infos)
        })
    }



    createMajor = async (files, infos) => {
        let majorId = this.state.majorId
        if(!majorId){
            const form = new FormData()
            form.append('mail_to', infos.mail_to)
            form.append('mail_user', infos.mail_user)
            form.append('message', infos.message)
            form.append('use_download', infos.useDownload)
            form.append('use_link', infos.useLink)
            //
            // create Major Model
            //
            //
            //
            majorId = await api.create_major(form).then(res=>{
                //console.log('res => ceate ', res)
                if(res.data.isSuccess){
                    return res.data.id
                }else{
                    if(res.data.clean){
                        console.log('hier')
                        const info = 'du hast gerade die gesamten Daten von Airchannel gelöscht !'
                        simpleInfoView(info)
                        this.resetUpload()
                        
                    }
                    return false
                }   
            }) 
        }
        
        // start loop of  all chunks
        if (majorId){
            for (const file of files) {
                this.cancelUpload()
                this.setState({upload_begin: file.file_guid})
                await this.upload_dispatcher(this.create_chunks(file), majorId)
            }
            console.log('all finish')
            this.uploadCompleted(majorId)
        }
    }


    

    create_chunks= (file)=>{

        let chunk_start  = 0
        for(let i = 1; i<=file.chunk_count; i++){
            const chunk = file.file_data.slice(chunk_start, CHUNK_SIZE + chunk_start)
            //console.log(max_chunk_size,'........ ',chunk.size)
            file.chunks.push(chunk)
            chunk_start = chunk_start + chunk.size
        }
        return file
    }

    
    
    upload_dispatcher = async(file, id)=>{
        console.log(file)
        const promises_1 = []
        const promises_2 = []
        const countArr = [...range(1, file.chunk_count)]
        console.log(countArr)
        var i,j, countlist, chunk = UPLOAD_THREAD;
        for (i = 0,j = countArr.length; i < j; i += chunk) {
            countlist =countArr.slice(i, i + chunk);
            this.cancelUpload()
            //console.log(countlist)
            for(let i of countlist){
                const count = parseInt(i) + 1
                this.cancelUpload()
                //console.log(count)
                promises_1.push(this.createFile(file, id, count,file.chunks[i].size))
            }
            const urlList = await Promise.all(promises_1)
            promises_1.length = 0 
            for(let e of urlList){
                this.cancelUpload()
                promises_2.push(this.uploadFileToS3(e, file.chunks, parseInt(e.bucket), file.file_guid, id))
            }
            await Promise.all(promises_2)
            promises_2.length = 0
        }
        console.log('finish')
        this.removeItem(file)
           
    }

    
    createFile = async(file, id, count, chunkSize) => {
        try {
            const form = new FormData()
            form.append('id', id)
            form.append('chunks', count)
            form.append('filename', file.file_guid)
            form.append('file_size', file.file_size)
            form.append('chunk_size', chunkSize)
            form.append('origin_name', file.origin_name)
            form.append('extension', file.file_data.name.split('.').slice(-1)[0])
            
            return await api.create_file(form).then(res=>{
                const presignedPostData = res.data.s3
                return presignedPostData
            })
           
        }catch (error) {
            //debugger
            console.log('error', error)
        }
    } 
 
  


    uploadFileToS3 = async(presignedPostData, chunks, count, filename, id) => {
        // create a form obj
        const formData = new FormData();
        // append the fields in presignedPostData in formData         
        Object.keys(presignedPostData.fields).forEach(key => {
                      formData.append(key, presignedPostData.fields[key]);
                    });           
        
        // append the file
        console.log(count - 1)
        formData.append("file", chunks[count - 1]);
        // post the data on the s3 url

        const config = {
            onUploadProgress: progressEvent => this.progressAction(progressEvent, count, chunks.length)  /*console.log('chunk', count,' ',Math.floor(progressEvent.loaded/100000),  ' => ',Math.floor(progressEvent.total/100000))*/,
            headers: {
                'Content-Type': "multipart/form-data",
             },
             cancelToken: source.token
          

        }
        //console.log(presignedPostData.url)

        axiosRetry(axios, { retries: 8, retryCondition: (_error) => true});
        await axios.post(presignedPostData.url, formData, config)
        .then(res=>{
            
            console.log(' res ', count, ' : ', res)
            //this.fileSetStorage(filename, count) 
            
            
        }).catch(err=>{
            if (axios.isCancel(err)) {
                console.log(err.message);
                formData.delete('file')
              }
            return 
        })
             
    }

    fileSetStorage = (filename, count)=>{
        api.filed(filename,count).then(res=>{
            console.log(count,' =>  ', res.data.isSuccess)
        })
    }

    uploadCompleted = async (id) => {
        
        if(this.state.fileLoopBreak){
            this.setState({fileLoopBreak: false})
            return
        }
        const response = await api.upload_detail(id)
        const data = response.data;
        if (data.isSuccess) {
            if(data.link){
                
                const download_link =  data.link
                if (typeof window !== 'undefined') {
                    const path = window.location.protocol + '//' + window.location.host +'/'+  download_link; 
                    //console.log('show download link ', download_link)
                    this.setState({upload_success: true, link: path, isLink: true})
                }
            }
            if(data.email){
                const sended_mail =  data.email
                console.log('show download email', sended_mail)
                this.setState({upload_success: true, mailConfirm: sended_mail, isLink: false})
            }
            this.resetUpload()
            this.setState({upload_success: true})
        }else{
            if(data.list){
                console.log('... es wurde nicht alles gespeichert !!!!')
                console.log(data.list)
                //this.resetUpload()
            }
        }
    }
    
      


    

    // removed item from list 
    // .file_guid = uuid name from upload file
    // stste new list 
    removeItem = (uploadFile)=>{
        let full_size = this.state.full_size
        full_size = full_size - uploadFile.file_size
        const fileList = this.state.files
        const removed_list = fileList.filter(file=>{ 
            if(file.file_guid != uploadFile.file_guid){
               return file
           }
        })
        this.setState({files: removed_list, full_size, progress: 0})
    }

    

    // if file in Upload list
    // show button to open send menu
    readyToSend = ()=>{
        return(
            <div className='ready_to_send_div'> 
                <button className='start_upload_btn' hidden={this.state.openSendView} onClick={()=>this.setState({openSendView: true})}>senden</button>
            </div>
        )
    }

    

    bottomView = (files)=>{
        const {full_size, upload_success} = this.state
        const upload_size = 'gesamt '+ roundFileSize(full_size)
        if(upload_success){
            return(
                <div className='div_input_upload' onClick={()=>this.newUpload()}>
                    <label className='label_input_upload'>
                        <VscDiffAdded size={50} color={colors.black}/>
                    </label>
                    <div className='text_input_upload'>hinzufügen von Dateien</div>
                </div>
            )
        }else{
            const show_text = files.length>0 ? upload_size : 'hinzufügen von Dateien'
            return(
                <div className='div_input_upload'>
                    <label className='label_input_upload'>
                        <input  className='input_upload'   type='file' multiple onChange={this.getFileContext} />
                        <VscDiffAdded size={50} color={colors.black}/>
                    </label>
                    <div className='text_input_upload_size'>{show_text}</div>
                    {files.length>0 ? this.readyToSend() : null}
                    <div className='rodal_div' >
                        <Modal
                            style={SendViewStyles}
                            isOpen={this.state.openSendView} 
                            onRequestClose={()=>this.setState({openSendView: false})}
                            ariaHideApp={false}
                
                        >
                            <SendView 
                                open={this.state.openSendView} 
                                close={()=>this.setState({openSendView: false})} 
                                infos={(infos)=>this.send(infos)} 
                                mobile={this.props.mobile} 
                                newOpen={()=>this.setState({openSendView: true})}
                            />
                        </Modal>
                    </div>
                </div>
            )
        }
    }

    


    render(){
        const {showProgress, files, progress, upload_begin, link, upload_success, mailConfirm, isLink} = this.state
        return (
            <div className='frame_input_upload'>
                {!showProgress?
                    this.bottomView(files)
                    :
                    <div>{!showProgress? null: 
                        <div className='progressbar_view'>
                            <ProgressBar counter={progress} bgcolor={colors.accentColor}/>
                            <div className='cancel_place'><CancelView loopBreak={()=>this.setState({fileLoopBreak: true})} /></div>
                        </div>}
                    </div>
                }
                {files.length>0 ? <div className='upload_list'><Itemlist items={files} load={upload_begin} removeItem={(e)=>this.removeItem(e)}/></div> : null}
                {upload_success ? <div className='upload_finish'><FinishView link={link} mailConfirm={mailConfirm} isLink={isLink} /></div> : null}    
            </div>
        )
    }
}


