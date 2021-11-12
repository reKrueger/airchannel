import React from 'react';
import './index.css'
import api from './../api'
import Bar from './../progressbar/transferBar'
import Itemlist from './uploadFileList'
import FinishView from './uploadFinishView'
import SendView from './sendView'
import fileContext from './fileHandle/fileContext'
import range from '../helpers/getRange';
import CancelView from './cancelView';
import colors from './../colors'
import { VscDiffAdded, VscFolder, VscFolderActive, VscArrowUp } from "react-icons/vsc";
import { cancelUploadSwal, newUploadSwal } from './../alertViews';
import { simpleInfoView } from './../infoViews';
import Modal from 'react-modal';
import roundFileSize from '../helpers/roundFileSze';
import axios from 'axios'
import axiosRetry from 'axios-retry';

const SendViewStyles = {
    content: {
        width: '420px',
        height: '100vh',
        top: '0%',
        left: '0%',
        right: 'auto',
        bottom: 'auto',
        //marginRight: '-50%',
        //transform: 'translate(-50%, -50%)',
        border: `none`,
        //borderRadius: '2px',
        background: 'nome',
        },overlay: { background: 'rgba(64, 64, 64, 0.568)',width: '100vw', } // blur background
};


const CHUNK_SIZE = 1048576 * 1 // 1 MB 
const UPLOAD_THREAD = 40
const source = axios.CancelToken.source();

export default class UploadView extends React.Component{
    constructor(props){
        super(props);
        this.state={ 
            files:[],
            filesSize:0,
            infos:{},
            showProgress: false,
            progress: 0,
            openSendView: false,
            mailConfirm: '',
            upload_success: false,
            visible: false,
            link: '',
            isLink: null,
            fileLoopBreak: false,
            majorId: null,
            upload_begin: '',
            inputFolder: false,
            eventArr :[],

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
            
            
        }
    }

    inputHandle=(input)=>{
        const context = fileContext(input)
        const {files, filesSize} = this.state
        this.setState({files: files.concat([...context.files]), filesSize: filesSize + context.size})
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

    newConnect = async(file, id, count, chunkCount )=>{
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

    
    progressAction = (progressEvent,count, fullCount , fileSize)=>{
        const loadedFromCHunk = (progressEvent.loaded / progressEvent.total) * 100
        const {eventArr} = this.state
        //console.log(eventArr)
        eventArr[count - 1] = loadedFromCHunk
        var sum = eventArr.reduce(function(a, b){
            return a + b;
        }, 0);
        this.cancelUpload()
        const progress = sum / fullCount
        this.setState({progress: progress, eventArr: eventArr})
        
        
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
            form.append('mail_to', [infos.mail_to])
            form.append('mail_user', infos.mail_user)
            form.append('message', infos.message)
            form.append('use_download', infos.useDownload)
            form.append('use_link', infos.useLink)
            console.log('')
            console.log('info ',infos)
            console.log('')
            //
            // create Major Model
            majorId = await api.create_major(form).then(res=>{
                //console.log('res => ceate ', res)
                if(res.data.isSuccess){
                    return res.data.id
                }else{
                    if(res.data.clean){
                        console.log('hier')
                        const info = 'du hast gerade die gesamten Daten von Airchannel gelöscht !'
                        simpleInfoView(info)
                        this.setState(this.baseState)
                        
                    }
                    const titel = 'Ups, Datenbank fehler !'
                    const text = 'bitte versuchen Sie es zu eien späteren Zeitpunkt noch einmal'
                    const cancelBtn = false
                    const okBtnText = 'ok'
                    cancelUploadSwal(titel, text, cancelBtn, okBtnText)
                    this.setState(this.baseState)

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
                this.setState({process:0,loaded:0, total:0, eventArr:[]})
            }
            console.log('all finish')
            this.uploadCompleted(majorId)
        }
    }


    

    create_chunks= (file)=>{
        let chunk_start  = 0
        for(let i = 1; i<=file.chunk_count; i++){
            const chunk = file.file_data.slice(chunk_start, CHUNK_SIZE + chunk_start)
            file.chunks.push(chunk)
            chunk_start = chunk_start + chunk.size
        }
        return file
    }



    countListLoop = (countlist, file,id)=>{
        const promises = []
        for(let i of countlist){
            const count = parseInt(i) + 1
            this.cancelUpload()
            promises.push(this.createFile(file, id, count, file.chunks[i].size))
        }
        return promises
    }

    s3UrlLoop = async(countlist, file, id)=>{
        const promises = []
        for(let e of countlist){
            const count = parseInt(e) + 1
            const url = await this.createFile(file, id, count, file.chunks[e].size)
            if(!url){
                this.setState({fileLoopBreak: true})
                break
                
            }
            this.cancelUpload()
            promises.push(this.uploadFileToS3(url, file.chunks, count, file.file_guid, file.file_size))
        }
        return promises
    }
    
    
    upload_dispatcher = async(file, id)=>{
        const countArr = [...range(1, file.chunk_count)]
        var i,j, countlist, chunk = UPLOAD_THREAD;
        for (i = 0,j = countArr.length; i < j; i += chunk) {
            countlist =countArr.slice(i, i + chunk);
            this.cancelUpload()
            if(this.state.fileLoopBreak){
                return
            }
            await Promise.all(await this.s3UrlLoop(countlist, file, id))
        }
        this.removeItem(file)
           
    }

    
    createFile = async(file, id, count, chunkSize) => {
        if(this.state.fileLoopBreak){
            return
        }
        try {
            const form = new FormData()
            form.append('id', id)
            form.append('count', count)
            form.append('filename', file.file_guid)
            form.append('file_size', file.file_size)
            form.append('chunk_size', chunkSize)
            form.append('origin_name', file.origin_name)
            form.append('extension', file.file_data.name.split('.').slice(-1)[0])
            if(file.folder_name){
                form.append('folder', JSON.stringify(file.folder_name))
            }
            
            
            return await api.create_file(form).then(res=>{
                if(res.data.isSuccess){
                    const presignedPostData = res.data.s3
                    return presignedPostData
                }else{
                    const titel = 'Ups, Datenbank fehler !'
                    const text = 'bitte versuchen Sie es zu eien späteren Zeitpunkt noch einmal'
                    const cancelBtn = false
                    const okBtnText = 'ok'
                    cancelUploadSwal(titel, text, cancelBtn, okBtnText)
                    
                    
                }
                
            })
           
        }catch (error) {
            //debugger
            console.log('error', error)
        }
    } 
 
  


    uploadFileToS3 = async(presignedPostData, chunks, count, filename, fileSize) => {
        // create a form obj
        if(this.state.fileLoopBreak){
            return
        }
        const formData = new FormData();
        // append the fields in presignedPostData in formData         
        Object.keys(presignedPostData.fields).forEach(key => {
                      formData.append(key, presignedPostData.fields[key]);
                    });           
        
        formData.append("file", chunks[count - 1]);
        // post the data on the s3 url

        const config = {
            onUploadProgress: progressEvent => this.progressAction(progressEvent, count, chunks.length, fileSize )  /*console.log('chunk', count,' ',Math.floor(progressEvent.loaded/100000),  ' => ',Math.floor(progressEvent.total/100000))*/,
            headers: {
                'Content-Type': "multipart/form-data",
             },
             cancelToken: source.token
          

        }
        //console.log(presignedPostData.url)

        axiosRetry(axios, { retries: 8, retryCondition: (_error) => true});
        await axios.post(presignedPostData.url, formData, config).then(()=>this.fileSetStorage(filename, count))
        .catch(err=>{
            if (axios.isCancel(err)) {
                console.log(err.message);
                formData.delete('file')
              }
            return 
        })
        //console.log('____________')
        
             
    }

    fileSetStorage = (filename, count)=>{
        api.filed(filename,count).then(res=>{
            console.log(count,' =>  ', res.data.isSuccess)
        })
    }




    uploadCompleted = async (id) => {
        if(this.state.fileLoopBreak){
            this.setState(this.baseState)
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
        const fileList = this.state.files
        const removed_list = fileList.filter(file=>{ 
            if(file.file_guid != uploadFile.file_guid){
               return file
           }
        })
        this.setState({files: removed_list,  progress: 0})
    }

    // removed item from list 
    // .file_guid = uuid name from upload file
    // stste new list 
    removeFolder = (foldername)=>{
        const fileList = this.state.files
        var full_size = 0
        const removed_list = fileList.filter(file=>{ 
            
            if(file.folder_name[0] !== foldername){
                full_size = full_size + file.file_size
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
                <button className='upload_icon_btn' hidden={this.state.openSendView} onClick={()=>this.setState({openSendView: true})}><VscArrowUp size={35} color='black'/></button>
            </div>
        )
    }

    


    bottomView = ()=>{
        const {mobile} = this.props
        const {upload_success, inputFolder, files,filesSize} = this.state
        const upload_size = 'gesamt '+ roundFileSize(filesSize)
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
                        {inputFolder? <input  className='input_upload' type='file' multiple onChange={this.inputHandle}  directory="" webkitdirectory="" msdirectory="" odirectory=""/> : <input  className='input_upload' type='file' multiple onChange={this.inputHandle}/> }
                        <VscDiffAdded size={50} color={colors.black}/>
                    </label>
                    <div className='text_input_upload_size'  >{show_text}</div>
                    {mobile? null: <div className='change_input_div' style={inputFolder? {background: 'rgba(0, 0, 0, 0.123)'}:null} onClick={()=>this.setState({inputFolder: inputFolder? false:true})}>{inputFolder? <VscFolderActive size={30}/>:<VscFolder size={30}/>}</div>}
                    {files.length>0 ? this.readyToSend() : null}
                    <div className='rodal_div_' >
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
                <div>{!showProgress? this.bottomView(): 
                        <div className='progressbar_view'>
                            <div className='cancel_place'><CancelView loopBreak={()=>this.setState({fileLoopBreak: true})} /></div>
                            <Bar counter={Math.floor(progress)}/>
                        </div>}
                    </div>
                
                {files.length>0 ? <div className='upload_list'><Itemlist items={files} load={upload_begin} removeItem={(e)=>this.removeItem(e)} removeFolder={(e)=>this.removeFolder(e)}/></div> : null}
                {upload_success ? <div className={this.props.mobile?'upload_finish_mobile':'upload_finish'}><FinishView link={link} mailConfirm={mailConfirm} isLink={isLink} mobile={this.props.mobile} /></div> : null}    
            </div>
        )
    }
}


