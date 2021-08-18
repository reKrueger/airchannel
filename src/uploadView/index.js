
  
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css'
import api from './../api'
import extensionList from './../extensions'
import ProgressBar from './../progressbar'
import Itemlist from './uploadFileList'
import FinishView from './uploadFinishView'
import SendView from './../sendView'
import colors from './../colors'
import { VscDiffAdded, VscThumbsdown } from "react-icons/vsc";
import { alertView } from '../alertViews';
import { isPlusToken } from 'typescript';





const CHUNK_SIZE = 1048576 * 3;//its 3MB, increase the number measure in mb

function get_ext(arr){
  const extension = []
  const extList = [].concat.apply([], Object.values(extensionList))
  arr.forEach((e)=>{
    if(extList.find(ext => ext==='.'+e.toLowerCase())){
      if(!extension.includes(e.toLowerCase())){
        extension.push(e.toLowerCase())
      }
      
      
      
    }

  })
  //console.log('extension ', extension)
  switch(extension.length){
    
    case 1:
      return `.${extension[0]}`
    case 2: 
      return `.${extension[0]}.${extension[1]}`
    default:
      window.alert('fehler bei extensions')
      return ''
  }
  
    

  
}



  




export default class UploadView extends React.Component{
    constructor(props){
        super(props);
        this.state={ 
            files:[],
            showProgress: false,
            counter: 0,
            full_count: 0,
            full_size: 0,
            beginingOfTheChunk: 0,
            endOfTheChunk: CHUNK_SIZE,
            progress: 0,
            openSendView: false,
            use_link: null,
            use_email: null,
            upload_success: false

        }
        this.wrapper = React.createRef();
    }
  
  
    resetChunkProperties = () => {
        this.setState({
            showProgress: true,
            progress: 0,
            counter: 0,
            beginingOfTheChunk: 0,
            endOfTheChunk: CHUNK_SIZE
        })
    }
    


    resetUpload = () => {
        this.setState({
            showProgress: false,
            process: 0,
            counter: 0,
            beginingOfTheChunk: 0
        })
    }
    
    
    newFileUpload = async()=>{

        // Alert POP UP
        //
        const titel = 'Neuer Upload?'
        const text = 'sind Sie Sicher, Sie haben keine möglichkeit mehr an den Downloadlink zu kommen!'
        const cancelBoolean = true
        const okBtnText = 'Ja, ich habe den link kopiert'
        const cancelBtnText = 'Nein, ich kopiere mir den link nochmal'

        const answer =  await alertView(titel, text, cancelBoolean, okBtnText, cancelBtnText)
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







    file_loop = async (files, infos) => {

        const form = new FormData()
        form.append('mail_to', infos.mail_to)
        form.append('mail_user', infos.mail_user)
        form.append('message', infos.message)
        form.append('use_download', infos.useDownload)
        form.append('use_link', infos.useLink)
        // create Major Model
        const majorId = await api.create_major(form).then(res=>{
            //console.log('res => ceate ', res)
            if(res.data.isSuccess){
                return res.data.id
            }else{
                return null
            }
        }) 
        if (majorId){
            for (const file of files) {
                await this.chunk_loop(file, majorId)
               
            }
        }
        
        
    }




    chunk_loop = async (file, id) => {
        var chunk_size_start = 0
        var chunk_test = 0

        for (var count=1; ; count++ ) {

            var chunk = file.file_data.slice(chunk_size_start, CHUNK_SIZE + chunk_size_start);
            //
            chunk_size_start = chunk_size_start + chunk.size
            chunk_test = chunk_test + chunk.size

            await this.uploadChunks(chunk, count, file, id)
            if(count === file.chunk_count){
                break
            }
        }
        console.log('loop Done! ==> remove file form list');
        this.removeItem(file)
    }            
            
    

    
    uploadChunks = async (chunk, count, file, id) => {
        console.log('')
        console.log('NEXT  CHUNK')

        try {

            const form = new FormData()
            form.append('id', id)
            form.append('chunk', chunk)
            form.append('chunk_size', chunk.size)
            form.append('counter', count)
            form.append('filename', file.file_guid)
            form.append('file_size', file.file_size)
            form.append('origin_name', file.origin_name)
            form.append('extension', get_ext(file.file_data.name.split('.')))
            const response = await api.insertfile(form)
          
            const data = response.data;
            if (data.isSuccess){
                // resCounter = data.counter // file counter
                this.setState({counter: this.state.counter + 1})
                // chunk daten sind angekommen
                if (this.state.counter === this.state.full_count) {
                    await this.uploadCompleted(id);
                }else{
                    var percentage = (this.state.counter / this.state.full_count) * 100;
                    this.setState({progress: percentage})
                }

            }else{
                console.log('Error Occurred:', data.errorMessage)
                return
            }
    


        }catch (error) {
            //debugger
            console.log('error', error)
        }
    }
    
    uploadCompleted = async (id) => {
        var form = new FormData();
        form.append('filename', this.state.fileGuid);
        const response = await api.upload_detail(id)
        const data = response.data;
        if (data.isSuccess) {
            if(data.link){
                const download_link =  data.link
                if (typeof window !== 'undefined') {
                    const path = window.location.protocol + '//' + window.location.host +'/'+  download_link; 
                    //console.log('show download link ', download_link)
                    this.setState({use_link: path})
                }
            }
            if(data.email){
                const sended_mail =  data.email
                console.log('show download email', sended_mail)
                this.setState({use_email:sended_mail})
            }
            console.log('')
            console.log('finish upload')
            console.log('')
            //setTimeout(()=>this.resetUpload(), 2000)
            this.resetUpload()
            this.setState({progress: 100, upload_success: true})
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
        this.setState({files: removed_list, full_size})

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
        this.file_loop(files, infos)
        this.setState({openSendView: false, showProgress: true})
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

    roundFileSize = (size)=>{
        // kilo bytes
        const kb_size = Math.round(size / 1000) 
        //mega bytes
        if(kb_size > 1000){
            const mb_size = Math.round(size / 100000) / 10 
            // giga bytes
            if(mb_size > 2000){
                const gb_size = Math.round(size / 10000000) / 100 
                return gb_size + '  GB'
            }
            return mb_size + '  MB'
        }
        return kb_size + '  KB'
    }

    bottomView = (files)=>{

        const {full_size, upload_success} = this.state
        const upload_size = 'gesamt '+this.roundFileSize(full_size)
        if(upload_success){
            return(
                <div className='div_input_upload' onClick={()=>this.newFileUpload()}>
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
                    <div className='text_input_upload'>{show_text}</div>
                    {files.length>0 ? this.readyToSend() : null}
                </div>
            )
        }
    }

    


    render(){
        
        const {showProgress, files, progress, full_count, use_email, use_link, upload_success, full_size} = this.state
            return (
                <div className='frame_input_upload'>
                    {!showProgress?
                        this.bottomView(files)
                        :
                        <div>{!showProgress? null: <ProgressBar counter={progress} bgcolor={colors.accentColor}/>}</div>
                    }
                    {files.length>0 ? <div className='upload_list'><Itemlist items={files} removeItem={(e)=>this.removeItem(e)}/></div> : null}
                    {use_link ? <div className='upload_finish'><FinishView link={use_link} return={()=>console.log('........wiederholung......')}/></div> : null}
                    <SendView 
                        open={this.state.openSendView} 
                        close={()=>this.setState({openSendView: false})} 
                        infos={(infos)=>this.send(infos)} 
                        mobile={this.props.mobile} 
                        newOpen={()=>this.setState({openSendView: true})}
                        refi={this.wrapper}
                        />
                </div>
            )
    }
      
    
  
  
  }


