import React from 'react';
import './index.css';



export default class DownloadFileList extends React.Component{

    constructor(props){
        super(props);
        this.state={ 
          backcolor: 'transparent'
  
        }
    }
  
  
    componentDidMount(){
    }

    /*
    setBackground = ()=>{
      const color = this.state.backcolor = 'transparent' ? 'white' : 'transparent'
      this.setState({backcolor: color})
    }
    */
  
  
  
    render(){
      return (
        <div className='download_mess_frame' >{this.props.message}</div>
      )
    }
      
    
  
  
  }