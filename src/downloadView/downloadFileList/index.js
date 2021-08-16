import React from 'react';
import './index.css';
import Item from './item'


function ListItem(props) {
    return (<div>
                <div className= "list_item">{props.value}</div>
            </div>);
}

export default class DownloadFileList extends React.Component{

    constructor(props){
        super(props);
        this.state={ 
          
  
        }
    }
  
  
    componentDidMount(){
    }

    componentDidUpdate(prevProps){
      //console.log(prevProps, '   prevprps')
      if(this.props.items.length !== prevProps.items.length){
        console.log('items length änderung')
      }
    }

    create_list=()=>{
        const lines = [] 
        this.props.items.forEach(item => {
            lines.push(
              <Item 
                item={item}

                />
              )
        });




        const listItems = lines.map((item) =>
        <ListItem value={item} key={lines.indexOf(item) } />);
        return listItems; 

        
    }
  
  
  
    render(){
      return (
        <div className='File_list_frame'>{this.create_list()}</div>
      )
    }
      
    
  
  
  }