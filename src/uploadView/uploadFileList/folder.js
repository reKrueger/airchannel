import React from 'react';
import './index.css';
import { VscFile, VscTrash, VscFolder } from "react-icons/vsc";
import SquareLoader from "react-spinners/SquareLoader";
import color from '../../colors';
import { colors } from '@material-ui/core';





export default class Folder extends React.Component{


    

    

  
  
    render(){
        //console.log(this.props.item  , '  item')
        const foldername =  this.props.folder
        const is_load = this.props.load

        return(
            <div className='folder_frame_div'>
                <div className='item_icon_div'>
                    <div className='item_icon'>{is_load? <SquareLoader color={color.black} loading={true}  size={26} />:<VscFolder size={30}/>}</div>
                </div>
                <div className='item_name_div'>
                    <div className='item_name'>{foldername}</div>
                </div>
                {is_load? null:
                    <div className='item_remove_div'>
                        <button className='item_remove' onClick={()=>this.props.removeItem(foldername)}>x</button>
                    </div>
                }
            </div>
        )
    }
      
    
  
  
  }