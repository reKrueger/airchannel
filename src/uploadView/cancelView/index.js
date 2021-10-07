
  
import React from 'react';
import './index.css'
import { cancelUploadSwal, newUploadSwal } from './../../alertViews';




export default class CancelView extends React.Component{
    constructor(props){
        super(props);
        this.state={ 
            

        }
        
    }
  
    
    

    

    uploadCancel = async()=>{
        const answer =  cancelUploadSwal
        if(answer){
            this.props.loopBreak()
        }
        
    }

    

    

    

    



    


    render(){
            return (
                <div className='progressbar_btn_div'>
                    <button onClick={()=>this.uploadCancel()}  className='upload_cancel'>STOP</button>
                </div>
            )
    }
      
    
  
  
  }


