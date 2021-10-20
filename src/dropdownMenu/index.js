import React from 'react';
import './index.css';
import { VscThreeBars } from "react-icons/vsc";
import colors from './../colors'
import Dropdown from 'react-dropdown';
//import 'react-dropdown/style.css';
import { withRouter } from "react-router-dom";

const options = [
    { value: '/info', label: 'Info' },
    { value: '/help', label: 'Hilfe' },
    { value: '/api', label: 'API' },
    { value: '/speedtest', label: 'Speedtest' },
    { value: '/imprint', label: 'Impressum' },
    
  ];


class DropdownMenu extends React.Component{

    constructor(props){
        super(props);
        this.state={ 
        }
                
            
  
        
    }
  
  
    componentDidMount(){
    }

    

    onSelect=(e)=>{
        this.props.history.push(e.value)
    }
    
      
   
  //<VscThreeBars size={30} color={colors.white}/> 
  
    render(){
      return (
        <div className='menu_icon'>
            <Dropdown 
                arrowClosed={<VscThreeBars size={30} color={colors.black}/>}
                arrowOpen={<VscThreeBars size={30} color={colors.black}/>}
                options={options} 
                onChange={this.onSelect} 
                value=''
                placeholder=''
                placeholderClassName='test' 
                placeHolderValue= {false} />
            </div>
        
      )
    }
      
    
  
  
  }
  export default withRouter(DropdownMenu);