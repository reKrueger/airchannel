

import React from 'react';
import './index.css'
import api from './../api'
import ProgressBar from './../progressbar'
import colors from './../colors'
import DownloadFileList from './downloadFileList'
import DownloadMessageView from './downloadMessView'
import {  VscArrowDown } from "react-icons/vsc";







export default class DownloadView extends React.Component{

  constructor(props){
      super(props);
      this.state={    
         counter: 1,
         showProgress: false,
         files: [],
         message: '',
         isContent:false,
         link:this.props.match.params.id,
         complete: false


      }
  }
  componentDidMount(){
    console.log(' DOWNLOAD VIEW ')
    const link = this.props.match.params.id
    this.checkLink(link)

  }

  checkLink = async(link)=>{
    await api.is_major_detail(link).then(res=>{
      if(res.data.isSuccess){
        const data = res.data

        this.setState({isContent: true, files: data.fileList, message: data.message})
        console.log(res.data.fileList)


      }else{
        console.log(' kein bay vorhanden')
      }
    })
  }
  deleteBucket=async()=>{
    const {link} = this.state
    console.log('delete api')
    await api.download_delete_detail(link).then(res=>{
      if(res){
        this.setState({showProgress: false, })
      }

    })
  }

  removeItem = (item)=>{
    const fileList = this.state.files
    const removed_list = fileList.filter(file=>{ 
        if(file.filename != item.filename){
           return file
       }else{
           console.log('gefunden !!!!')
       }
    })
    this.setState({files: removed_list})

  }



  file_loop = async () => {
    const {files} = this.state

    for (const file of files) {
        console.log(file)
        await this.downloadFiles(file)
       
    }
    this.deleteBucket()
    
  } 


  downloadFiles = async(file)=>{ 
    const _url = window.location.hostname=='localhost'? 'http://127.0.0.1:5000/transmit/' :  process.env.REACT_APP_API_BASE_URL
    const token =  '6ca12987d9feb7e0f8b523fdeb0c27_ce'
    const {origin_name, filename, file_size, extension } = file
    this.setState({showProgress:true})
    const configDownload = {
      responseType: 'arraybuffer',
      onDownloadProgress:(progressEvent)=> {
        console.log(progressEvent, '   ============')
        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        this.setState({counter:percentage})
      },
      url: _url + '/download/' + filename,
      method: 'get',
      headers:{
        'Authorization': `${token}`,
      }
      
    }

    await api.download_stream(origin_name,extension,configDownload).then(res=>{
      console.log('........download file finish........')
      this.removeItem(file)

    })
  }


  messageView = ()=>{
    const {message} = this.state
    return(
        <div>
        {message.length>0 ? 
          <div className='download_message_view'>
            <div className='download_message_text'> Eine Nachricht für dich </div>
            <DownloadMessageView message={message} />
          </div>
          : null}
        </div>
            
    )
  }





  startDownload = ()=>{
    console.log('')
    console.log('start')
  }

  

  changeDownloadView =()=>{
    const {complete} = this.state
    return(
      <div>
      {!complete?
        <div className='div_input_upload'>
            <div className='download_icon_div' onClick={()=>this.file_loop()}><VscArrowDown size={35} color={colors.black}/></div>
            <div className='text_input_upload'>starte den download</div>
        </div>
        :
        <div className='div_input_upload'>
            <div className='text_input_upload'>download complete</div>
        </div>
      }
      </div>
    )
  }

  


  render(){
    const {isContent, showProgress, counter, files} = this.state
    if(isContent){
      return (
        <div className='frame_input_upload' >
          {!showProgress?
            this.changeDownloadView():<div>{!showProgress? null: <ProgressBar counter={counter} bgcolor={colors.accentColor}/>}</div>
          }
          {files.length>0 ? <div className='download_list_view'>{this.messageView()}<DownloadFileList items={files} /></div> : null}
          
        </div>
      );
    }else{
      return (
        <div className='frame_input_upload' >
            <div className='div_input_upload'>
              <div className='text_input_upload'>NO CONTENT</div>
            </div>
        </div>
      );
    }
    
  }
}

