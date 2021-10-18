import React from 'react';
import './index.css';
import { VscThreeBars } from "react-icons/vsc";
import colors from './../colors'
import { DropdownView} from './dropdownView';
import Dropdown from 'react-dropdown';
//import 'react-dropdown/style.css';


const options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two', className: 'myOptionClassName' },
    {
     type: 'group', name: 'group1', items: [
       { value: 'three', label: 'Three', className: 'myOptionClassName' },
       { value: 'four', label: 'Four' }
     ]
    },
    {
     type: 'group', name: 'group2', items: [
       { value: 'five', label: 'Five' },
       { value: 'six', label: 'Six' }
     ]
    }
  ];

const defaultOption = null;

export default class DropdownMenu extends React.Component{

    constructor(props){
        super(props);
        this.state={ 
        }
                
            
  
        
    }
  
  
    componentDidMount(){
    }

    

    onSelect=(e)=>{
        console.log(e)
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
                placeholder=' '
                placeholderClassName='test' 
                placeHolderValue= {false} />
            </div>
        
      )
    }
      
    
  
  
  }