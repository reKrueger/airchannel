

import React from 'react';
import './index.css'
import api from './../api'
import ProgressBar from './../progressbar'
import colors from './../colors'
import DownloadFileList from './downloadFileList'
import DownloadMessageView from './downloadMessView'
import { VscArrowDown, VscInfo, VscCheck } from "react-icons/vsc";
import { downloadInfoView} from '../infoViews';






export default class DownloadView extends React.Component{

  constructor(props){
      super(props);
      this.state={    
         counter: 1,
         showProgress: false,
         files: [],
         majorInfo: {},
         message: '',
         isContent:false,
         link:this.props.match.params.id,
         complete: false,
         openInfoView: false


      }
  }
  componentDidMount(){
    console.log(' DOWNLOAD VIEW ')
    const link = this.props.match.params.id
    this.checkLink(link)

  }

  

  infoView = async()=>{
    const { mail_to, mail_user, date, use_download, use_link } = this.state.majorInfo
    const {files} = this.state
    const infos = {mail_to, mail_user, date, use_download, use_link, files }
    let answer =  await downloadInfoView(infos) // alert View
    if(answer){
        return
        }

    

}

  checkLink = async(link)=>{
    await api.is_major_detail(link).then(res=>{
      if(res.data.isSuccess){
        const data = res.data
        this.setState({isContent: true, files: data.fileList, message: data.message, majorInfo: data.majorInfo})
        console.log(res.data)
      }
    })
  }



  deleteBucket=async()=>{
    const {link} = this.state
    await api.download_delete_detail(link).then(res=>{
      if(res){
        this.setState({showProgress: false, })
      }

    })
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
    const isLocal = window.location.hostname=='localhost'
    const _url = isLocal? 'http://127.0.0.1:8000/transmit/' :  process.env.REACT_APP_API_BASE_URL
    const autori = isLocal? 'local' : process.env.REACT_APP_AUTORI
    const {origin_name, filename } = file
    this.setState({showProgress:true})
    const configDownload = {
      responseType: 'arraybuffer',
      onDownloadProgress:(progressEvent)=> {
        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        this.setState({counter: percentage})
      },
      url: _url + 'download/' + filename,
      method: 'get',
      headers:{
        'Authorization': `${autori}`,
      }
      
    }
    const empty_ext = ''
    await api.download_stream(origin_name, empty_ext, configDownload).then(res=>{
      this.removeItem(file)

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




  infoBtnView = ()=>{
    return (
      <div className= 'download_info_btn_div' onClick={()=>this.infoView()}><VscInfo size={30} color={colors.black}/></div>
    )
  }

  

  changeDownloadView =()=>{
    const complete = this.state.counter === 100
    return(
      <div>
      {!complete?
        <div className='div_input_upload'>
            <div className='download_icon_div' onClick={()=>this.file_loop()}><VscArrowDown size={35} color={colors.black}/></div>
            <div className='text_input_upload'>starte den download</div>
            {this.infoBtnView()}
        </div>
        :
        <div className='div_input_upload'>
          <div className='download_icon_div' ><VscCheck size={35} color={colors.black}/></div>
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
              <div className='text_input_upload_NO_CONTENT'>NO CONTENT</div>
            </div>
        </div>
      );
    }
    
  }
}

