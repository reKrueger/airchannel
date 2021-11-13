import React from 'react';
import './index.css';
import air from './../AIR_1024px.png'
import { withRouter } from "react-router-dom";




class InfoView extends React.Component{

    constructor(props){
        super(props);
        this.state={ 
          
  
        }
    }
  
  
    componentDidMount(){
    }

    render(){
      const address = ' bc1qxra7pp8nf3g7uk6ugs06tkm8fangc4palnmnun'
      return (
        <div className='helpView'>
            <div className='backToAirChannel_div' onClick={()=>this.props.history.push('/')}>back to <img className='air_icon' src={air} alt="Logo"/> AIR channel</div>
            ... non sign in temporary File transfer on web !
            <div style={{marginTop:'50px'}}>donate Bitcoins:  <div style={{color:'hotpink'}}>{address}</div></div>
        </div>
      )
    }
      
    
  
  
  }
  export default withRouter(InfoView);