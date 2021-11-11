import React from 'react';
import './index.css';
import { VscFile, VscTrash } from "react-icons/vsc";





export default class Item extends React.Component{

    constructor(props){
        super(props);
        this.state={ 
            filename: '',

          
  
        }
    }
  
  
    componentDidMount(){
    }
  
  
  
    render(){
        //console.log(this.props.item  , '  item')
        const item =  this.props.item
        return(
            <div className='fileList_item_frame'>
                <div className='item_icon_div'>
                    <div className='item_icon'><VscFile size={30}/></div>
                </div>
                <div className='download_item_name_div'>
                    <div className='download_item_name'>{item.origin_name}</div>
                </div>
            </div>
        )
    }
      
    
  
  
  }