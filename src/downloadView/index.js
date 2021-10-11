

import React from 'react';
import './index.css'
import api from './../api'
import axios from 'axios'
import ProgressBar from './../progressbar'
import colors from './../colors'
import DownloadFileList from './downloadFileList'
import DownloadMessageView from './downloadMessView'
import { VscArrowDown, VscInfo, VscCheck } from "react-icons/vsc";
import { downloadInfoView} from '../infoViews';
import { saveAs } from 'file-saver';



export default class DownloadView extends React.Component{

  constructor(props){
      super(props);
      this.state={    
         progress: 0,
         loaded: 0,
         total:0,
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

  progressAction = (progressEvent,fileSize)=>{
    const {loaded, total} = this.state
    if(progressEvent.loaded === progressEvent.total){
      this.setState({loaded: loaded + progressEvent.loaded, total: total + progressEvent.total })
    }
    console.log(loaded + progressEvent.loaded, '  /  ', fileSize)
    const progress =  (loaded + progressEvent.loaded) /  fileSize  * 100 
    this.setState({progress: progress})
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
        //console.log(res.data)
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

  

  

// test file  
// http://localhost:3000/2a5af97c23ef66b824b893f583acfcdf5e613f36c4a1df27b020b4465ec9ffb4


  file_loop = async () => {
    const {files} = this.state

    for (const file of files) {
      const chunks = file.count
      let start = 0
      const promises = []
      for(let i=1; i<=chunks; i++){
        if(i%100==0 || i== chunks){
          console.log(start, ' : ', i )
          promises.push(await this.downloadFiles(file, start, i))
          start = start + 100

        }
      }
      const resBuffers = await Promise.all(promises)
      saveAs(new Blob([...resBuffers], {
        type: 'application/octet-stream'
      }),file.origin_name)
      //
      this.removeItem(file)
       
    }
    //this.deleteBucket()
    this.setState({showProgress: false, })
  } 


  downloadFiles = async(file, start, end)=>{ 
    const params = `/${start}/${end}`
    const isLocal = window.location.hostname=='localhost'
    const _url = isLocal? 'http://127.0.0.1:8000/transmit/' :  process.env.REACT_APP_API_BASE_URL
    const autori = isLocal? 'local' : process.env.REACT_APP_AUTORI
    const {filename, file_size } = file
    this.setState({showProgress:true})
    const configDownload = {
      responseType: 'arraybuffer',
      onDownloadProgress:(progressEvent)=> {
        this.progressAction(progressEvent, file_size)
        //this.setState({counter: percentage})
      },
      url: _url + 'download/' + filename + params,
      method: 'get',
      headers:{
        'Authorization': `${autori}`,
      }
      
    }
    return await axios(configDownload)
        .then(res => {
          /** 
          const blob = new Blob([res.data], {
            type: 'application/octet-stream'
          })
          */
          return res.data
            //let extension = 'zip';
            //let tempFileName = `${this.state['selectedCommunity']}`
            //let fileName = `${tempFileName}.${extension}`;
            /*
            const blob = new Blob([res.data], {
              ((type: 'application/octet-stream'
            })

            saveAs(blob, fileName)
            */
        })
        .catch(error => {
            console.log(error.message);
        });

    
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
    const {isContent, showProgress, progress, files} = this.state
    if(isContent){
      return (
        <div className='frame_input_upload' >
          {!showProgress?
            this.changeDownloadView():<div>{!showProgress? null: <div className='progressbar_view' ><ProgressBar counter={progress} bgcolor={colors.accentColor}/></div>}</div>
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

