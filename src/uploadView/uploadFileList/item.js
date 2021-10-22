import React from 'react';
import './index.css';
import { VscFile, VscClose } from "react-icons/vsc";
import SquareLoader from "react-spinners/SquareLoader";
import color from '../../colors';
import { colors } from '@material-ui/core';




export default class Item extends React.Component{

    

  
  
    render(){
        //console.log(this.props.item  , '  item')
        const item =  this.props.item
        const is_load = this.props.load

        return(
            <div className='download_item_frame'>
                <div className='item_icon_div'>
                    <div className='item_icon'>{is_load? <SquareLoader color={color.black} loading={true}  size={26} />:<VscFile size={30}/>}</div>
                </div>
                <div className='item_name_div'>
                    <div className='item_name'>{item.origin_name}</div>
                </div>
                {is_load?null:
                    <div className='item_remove_div'>
                        <button className='item_remove' onClick={()=>this.props.removeItem(item)}>x</button>
                    </div>
                }
            </div>
        )
    }
      
    
  
  
  }