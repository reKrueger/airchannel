import React from 'react';
import './index.css';
import Item from './item'
import Folder from './folder'


function ListItem(props) {
  return (<div>
              <div className= "list_item_folder">{props.value}</div>
          </div>);
}

export default class FileList extends React.Component{

    constructor(props){
        super(props);
        this.state={
          open:'', 
          
  
        }
        
    }
  
  
    componentDidMount(){
    }

    componentDidUpdate(prevProps){
      if(this.props.items.length !== prevProps.items.length){
      }
    }

    

    

    FileList=()=>{
        const lines = [] 
        this.props.items.forEach(item => {
          
            lines.push(
              <Item 
                item={item}
                removeItem={(e)=>this.props.removeItem(e)}
                load={this.props.load===item.file_guid? true: false}

                />
              )
        });




        const listItems = lines.map((item) =>
        <ListItem value={item} key={lines.indexOf(item) } />);
        return listItems; 

        
    }
    FileListOfItem=(item)=>{
      const file = 
            <Item 
              item={item}
              removeItem={(e)=>this.props.removeItem(e)}
              load={this.props.load===item.file_guid? true: false}

              />;
      return file; 

      
  }

    


    

    FolderList=()=>{
      const name = this.state.open
      const lines = [] 
      var folder = ''
      
      for(let i of this.props.items){
        if(i.folder_name.length<=0){
          lines.push(this.FileListOfItem(i))
          continue
        }

        
        if(folder !== i.folder_name[0]){
          lines.push(
            <Folder
              folder={i.folder_name[0]}
              item={i}
              removeItem={(e)=>this.props.removeFolder(e)}
              load={this.props.load===i.file_guid? true: false}

              />
            )
        }
        folder = i.folder_name[0]
      }




      const listItems = lines.map((item) =>
        <ListItem value={item} key={lines.indexOf(item)} />);
      return listItems; 

      
  }

  
  
  
  
    render(){
      const {hierarchy} = this.state
      return (
        <div className='File_list_frame'>
          
          {this.FolderList()}
          
        </div>
      )
    }
      
    
  
  
  }