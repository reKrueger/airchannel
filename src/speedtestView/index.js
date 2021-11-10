import React from 'react';
import './index.css';
import air from './../AIR_1024px.png'
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Progresser from './progresser';


const TEN = 1024 * 1024 * 10 // 10485760   == 10 MB
const TWO = 1024 * 1024 * 2 // 10485760   == 10 MB
const ONE = 1024 * 1024 * 1
const KB_256 = 1024 * 256
const KB = 1024 
const KB_128 = 1024 * 128
const ONE_GB = 1024 * 1024 * 1024
const HUN = 1024 * 1024 * 100 
const unit = 'Mbit/s'
const MBIT = 125000
const cancelTokenUpload= axios.CancelToken.source(); 
const cancelTokenDownload = axios.CancelToken.source(); 
class SpeedtestView extends React.Component{

    constructor(props){
        super(props);
        this.state={ 
          upload: [],
          download: [],
  
        }
    }
  
  
    componentDidMount(){
      
      //this.startTest()
    }

    startTest = async()=>{
      console.log('start upload')
      const up = await this.uploadSpeed()
      console.log('start download')
      const buffer = await this.downloadSpeed()
      
      //console.log('upload finish')
    }

   
    arrayAvg(arr){
      var i = 0, summ = 0, arrLen = arr.length;
      while (i < arrLen) {
          summ = summ + arr[i++];
      }
      return summ / arrLen;
    }
    
  

    createUploadBlob = ()=>{
      return new Blob([new ArrayBuffer(HUN)], {type : 'application/octet-stream'})

    }
    getSpeedTestUrl = ()=>{
      const isLocal = window.location.hostname=='localhost'
      const autori = isLocal? 'local' : process.env.REACT_APP_AUTORI
      const _url = isLocal? 'http://127.0.0.1:8000/speed/' :  process.env.REACT_APP_API_SPEED_URL
      return {_url, autori}
    }

      
      
      
     

    uploadSpeed = async()=>{
      const{_url, autori} = this.getSpeedTestUrl()
      console.log(_url, autori)
      const dummy = this.createUploadBlob()
      const form = new FormData()
      form.append('file', dummy)
      const finishDownLoad = new Date().getTime() + 15000 
      var runtime = new Date().getTime() 
      var startLoad = 0
      const configUpload = {
        onUploadProgress: progressEvent => {
          if(new Date().getTime() <= finishDownLoad){
            const loaded = progressEvent.loaded
            console.log('____> ',loaded)
            const loadSec = new Date().getTime()
            const sec = ((loadSec - runtime) / 1000) 
            const downloadSizeToMBit = (loaded - startLoad) / MBIT
            const mos = downloadSizeToMBit / sec
            console.log(' upload ')
            console.log('sec pro : ',sec, ' s')
            console.log('size pro : ',downloadSizeToMBit, ' MBit' )
            console.log('_____________')
            console.log(mos, ' MBit/s')
            console.log('_____________')
            
            
            this.setState({upload: this.state.upload.concat(mos)})
            startLoad = loaded
            runtime = loadSec
            
    
          }else{
            const {upload} = this.state
            this.setState({upload: this.state.upload.concat(this.arrayAvg(upload))})
            console.log('CANCEL UPLOAD')
            cancelTokenUpload.cancel();
          } 
        },
        url: _url + 'upload/',
        data: form,
        method: 'post',
        cancelToken: cancelTokenUpload.token,
        headers:{
          'Authorization': `${autori}`,
          'Content-Type': 'application/octet-stream', //'multipart/form-data;boundary=boundary',
          'Accept': 'application/json;text/plain',
        }
      }
      
      
      return await axios(configUpload).catch(error => {
        console.log(error.message);
      });
      
      
    }

  

  


    downloadSpeed = async()=>{ 
      const{_url, autori} = this.getSpeedTestUrl()
      const finishDownLoad = new Date().getTime() + 15000 // 15 seconds of upload;
      var startLoad = 0
      var runtime = new Date().getTime() 
      var startTime = 0
      const configDownload = {
        responseType: 'arraybuffer',
        onDownloadProgress:(progressEvent)=> {
          if(new Date().getTime() <= finishDownLoad){
            const loaded = progressEvent.loaded
            const times = (progressEvent.timeStamp / 1000) - startTime
            const loadSec = new Date().getTime()
            const sec = ((loadSec - runtime) / 1000) 
            const downloadSizeToMBit = (loaded - startLoad) / MBIT
            const mos = downloadSizeToMBit / times
            console.log(' Download ')
            console.log(times)
            console.log('sec pro : ',sec, ' s')
            console.log('size pro : ',downloadSizeToMBit, ' MBit' )
            console.log('_____________')
            console.log(mos, ' MBit/s')
            console.log('_____________')
            
            startLoad = loaded
            runtime = loadSec
            startTime = progressEvent.timeStamp / 1000
            this.setState({download: this.state.download.concat(mos)})
            

          }else{
            const {download} = this.state
            this.setState({download: this.state.download.concat(this.arrayAvg(download))})
            console.log('CANCEL DOWNLOAD')
            cancelTokenDownload.cancel();
          } 
          
          
          
          
        },
        url: _url + 'download/',
        method: 'get',
        cancelToken: cancelTokenDownload.token
      
      
      }
    

      return await axios(configDownload)
        .catch(error => {
            console.log(error.message);
        });

    
    }


    textView = (method)=>{
      switch(method){

          case 'UPLOAD TEST':
              return(
                  <div className='speedTextCon'>
                      <div className='speedTextRow1'>bal blalalalaa</div>
                      <div className='speedTextRow1'> tutusgsau</div>
                  </div>
              )

          case 'DOWNLOAD TEST':
              return(
                  <div className='speedTextCon'>
                      <div className='speedTextRow1'>nizaus</div>
                      <div className='speedTextRow1'> tsahhsau</div>
                  </div>
              )

          case 'test':
              return

          default:
              return
      }
    }

    
    


    render(){
      const {upload, download} = this.state
      const upMos = upload[upload.length - 1] ? upload[upload.length - 1] : 0
      const downMos = download[download.length - 1] ? download[download.length - 1] : 0
      

      return (
        <div className='speedViewMain'>
            <div className='backToAirChannel_div' onClick={()=>this.props.history.push('/')}>back to <img className='air_icon' src={air} alt="Logo"/> AIR channel</div>
            <div className='prgressViewContainer'>
              <div className='speedField'>
                <Progresser counter={upMos} />
                <div className='isRun'>UPLOAD TEST</div>
                  {this.textView('UPLOAD TEST')}
              </div>
              <div className='speedField'>
                <Progresser counter={downMos} />
                <div className='isRun'>DOWNLOAD TEST</div>
                  {this.textView('DOWNLOAD TEST')}
              </div>
              <div className='speedField'>
                <Progresser counter={0} />
                <div className='isRun'>TEST</div>
                  {this.textView(' TEST')}
              </div>
            </div>
            <div className='speedStartDiv'><button className='speedStartBtn' onClick={()=>this.startTest()}>START TEST</button></div>
        </div>
      )
    }
      
  }
  export default withRouter(SpeedtestView);