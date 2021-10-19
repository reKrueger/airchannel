import React from 'react';
import './index.css';
import air from './../AIR_1024px.png'
import { withRouter } from "react-router-dom";




class ApiView extends React.Component{

    constructor(props){
        super(props);
        this.state={ 
          
  
        }
    }
  
  
    componentDidMount(){
    }

    componentDidUpdate(prevProps){
      
    }



  
  
    render(){
      return (
        <div className='helpView'>
            <div className='backToAirChannel_div' onClick={()=>this.props.history.push('/')}>back to <img className='air_icon' src={air} alt="Logo"/> AIR channel</div>
            s3 , but i work on self made ceph / Docker / Python solution
        </div>
      )
    }
      
    
  
  
  }
  export default withRouter(ApiView);