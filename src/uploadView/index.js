
  
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css'
import api from './../api'
import ProgressBar from './../progressbar'
import Itemlist from './uploadFileList'
import FinishView from './uploadFinishView'
import SendView from './sendView'
import colors from './../colors'
import { VscDiffAdded } from "react-icons/vsc";
import { cancelUploadSwal, newUploadSwal } from './../alertViews';
import Modal from 'react-modal';
import roundFileSize from '../helpers/roundFileSze';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      borderRadius: '12px'
    },
};





const CHUNKCOUNT = []
const CHUNK_SIZE = 1048576 * 3;//its 3MB, increase the number measure in mb


 
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
            majorId: null

        }
        
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


    getFileContext = (e) => {
        const files = []
        const file_arr = Array.from(e.target.files)
        var full_count = 0
        var full_size = this.state.full_size
        file_arr.forEach(file=>{
            const _file = file;
            const _totalCount = _file.size % CHUNK_SIZE === 0 ? _file.size / CHUNK_SIZE : Math.floor(_file.size / CHUNK_SIZE) + 1; // Total count of chunks will have been upload to finish the file
            const _fileID = uuidv4() //+ get_ext(_file.name.split('.'));
            const file_json = {
                file_size: _file.size,
                origin_name: _file.name,
                file_guid: _fileID,
                chunk_count: _totalCount,
                file_data: _file
            }
            full_count = full_count + _totalCount
            full_size = full_size + _file.size
            files.push(file_json)
        })
        this.setState({files: [...this.state.files, ...files], full_count: this.state.full_count + full_count, full_size})
        
    }

    uploadCancel=async()=>{
        const answer =  await cancelUploadSwal
        if(answer){
            this.setState({
                fileLoopBreak: true, 
            })
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
                    return null
                }   
            }) 
        }
        
        // start loop of  all chunks
        if (majorId){
            for (const file of files) {
                if(this.state.fileLoopBreak){
                    break
                }
                // this file begins
                await this.counterOfFile(file, majorId)
                
               
            }
            await this.uploadCompleted(majorId);
            
        }
         
    }

    


    

    counterOfFile = async(file, id, count=1, chunkCount=0) => {
        var chunk_size_start = chunkCount

        for (count; ; count++ ) {
            if(this.state.fileLoopBreak){
                await this.uploadIsCancel(id, file)
                break
            }
            var percentage = (count / file.chunk_count) * 100;

            const chunk = file.file_data.slice(chunk_size_start, CHUNK_SIZE + chunk_size_start);
            this.setState({progress: percentage})
            //await this.timeout(1000); // local simulation

            const isUpload = await this.chunk_loop(chunk, file,id, count)
            if(!isUpload){
                console.log('upload error')
                await this.newConnect(file, id, count, chunk_size_start)
                
                break
                
                
            }

            chunk_size_start = chunk_size_start + chunk.size
            if(count === file.chunk_count){
                this.removeItem(file)
                return
            }
        }
    }

    

    chunk_loop = async (chunk, file, id, count) => {
        
        if(count === 1){
            return await this.uploadFirstChunk(chunk, count, file, id)
        }else{
            CHUNKCOUNT.push({count:count, chunk:chunk})
            if(CHUNKCOUNT.length === 5 || count === file.chunk_count){
                switch(CHUNKCOUNT.length){
                   
                    case 1:
                        var res =  await this.uploadChunks(chunk, count, file, id)
                        CHUNKCOUNT.length = 0
                        return res
                    case 3:
                        var res =  await Promise.all([
                            this.uploadChunks(CHUNKCOUNT[0].chunk, CHUNKCOUNT[0].count, file, id),
                            this.uploadChunks(CHUNKCOUNT[1].chunk, CHUNKCOUNT[1].count, file, id)
                        ])
                        CHUNKCOUNT.length = 0
                        return res
                    case 3:
                        var res =  await Promise.all([
                            this.uploadChunks(CHUNKCOUNT[0].chunk, CHUNKCOUNT[0].count, file, id),
                            this.uploadChunks(CHUNKCOUNT[1].chunk, CHUNKCOUNT[1].count, file, id),
                            this.uploadChunks(CHUNKCOUNT[2].chunk, CHUNKCOUNT[2].count, file, id)
                        ])
                        CHUNKCOUNT.length = 0
                        return res
                    case 4:
                        var res =  await Promise.all([
                            this.uploadChunks(CHUNKCOUNT[0].chunk, CHUNKCOUNT[0].count, file, id),
                            this.uploadChunks(CHUNKCOUNT[1].chunk, CHUNKCOUNT[1].count, file, id),
                            this.uploadChunks(CHUNKCOUNT[2].chunk, CHUNKCOUNT[2].count, file, id),
                            this.uploadChunks(CHUNKCOUNT[3].chunk, CHUNKCOUNT[3].count, file, id)
                        ])
                        CHUNKCOUNT.length = 0
                    return res
                    case 5:
                        var res =  await Promise.all([
                            this.uploadChunks(CHUNKCOUNT[0].chunk, CHUNKCOUNT[0].count, file, id),
                            this.uploadChunks(CHUNKCOUNT[1].chunk, CHUNKCOUNT[1].count, file, id),
                            this.uploadChunks(CHUNKCOUNT[2].chunk, CHUNKCOUNT[2].count, file, id),
                            this.uploadChunks(CHUNKCOUNT[3].chunk, CHUNKCOUNT[3].count, file, id),
                            this.uploadChunks(CHUNKCOUNT[4].chunk, CHUNKCOUNT[4].count, file, id)
                        ])
                        CHUNKCOUNT.length = 0
                        return res
                    default:
                        return false

                }
                
            }else{
                return true
            }
            
        }
    }           
    
    
    uploadFirstChunk = async (chunk, count, file, id) => {
        try {
            const form = new FormData()
            form.append('id', id)
            form.append('chunk', chunk)
            form.append('chunk_size', chunk.size)
            form.append('counter', count)
            form.append('filename', file.file_guid)
            form.append('file_size', file.file_size)
            form.append('origin_name', file.origin_name)
            form.append('extension', file.file_data.name.split('.').slice(-1)[0])
           
            const response = await api.start_chunk_upload(form).then(res=>{
                return res.data.isSuccess
            })
            return response

        }catch (error) {
            //debugger
            console.log('error', error)
            return false
        }
    }

    

    uploadChunks = async (chunk, count, file, id) => {
        try {
            const form = new FormData()
            form.append('id', id)
            form.append('chunk', chunk)
            form.append('chunk_size', chunk.size)
            form.append('counter', count)
            form.append('filename', file.file_guid)

           
            const response =  await api.insertfile(form).then(res=>{
                return res.data.isSuccess
            })
            return response
            
        }catch (error) {
            //debugger
            console.log('error', error)
            return false
        }
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
            // finish Upload
            //setTimeout(()=>this.resetUpload(), 2000)
            this.resetUpload()
            this.setState({upload_success: true})
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

    send = (infos)=>{
        const {files} = this.state
        //console.log(infos, ' => infos')
        //console.log(files, ' => files')
        //console.log(this.state, ' => state')
        const countOfFiles = files.map(file=>{
            return file.chunk_count
        })
        const allChunkCounts = countOfFiles.reduce((a, b) => a + b, 0)
        console.log(allChunkCounts, ' full counts')
        this.setState({openSendView: false, showProgress: true, infos}, ()=>{
            this.createMajor(files, infos)
        })
        
        
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
                            style={customStyles}
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
        const {showProgress, files, progress,  link, upload_success, mailConfirm, isLink} = this.state
            return (
                
                <div className='frame_input_upload'>
                    {!showProgress?
                        this.bottomView(files)
                        :
                        <div>{!showProgress? null: <div className='progressbar_view' ><ProgressBar counter={progress} bgcolor={colors.accentColor}/><div className='progressbar_btn_div' ><button onClick={()=>this.uploadCancel()}  className='upload_cancel'>abbrechen</button></div></div>}</div>
                    }
                    {files.length>0 ? <div className='upload_list'><Itemlist items={files} removeItem={(e)=>this.removeItem(e)}/></div> : null}
                    {upload_success ? <div className='upload_finish'><FinishView link={link} mailConfirm={mailConfirm} isLink={isLink} /></div> : null}
                    
                </div>
            )
    }
      
    
  
  
  }


