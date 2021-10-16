import React from 'react';
import './index.css';
import Item from './item'
import Folder from './folder'


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




    FileListOfItem=(item)=>{
      const file = 
            <Item 
              item={item}
              removeItem={(e)=>this.props.removeItem(e)}
              load={this.props.load===item.file_guid? true: false}

              />;
      return file; 

      
  }


    folderList=()=>{
      const lines = [] 
      var folder = ''
      
      for(let i of this.props.items){
        if(i.folder.length<=0){
          lines.push(this.FileListOfItem(i))
          continue
        }

        
        if(folder !== i.folder[0]){
          lines.push(
            <Folder
              folder={i.folder[0]}
              item={i}
              removeItem={(e)=>this.props.removeFolder(e)}
              //load={this.props.load===i.file_guid? true: false}

              />
            )
        }
        folder = i.folder[0]
      }




      const listItems = lines.map((item) =>
        <ListItem value={item} key={lines.indexOf(item)} />);
      return listItems; 

      
  }


    fileList=()=>{
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
        <div className='File_list_frame'>{this.fileList()}</div>
      )
    }
      
    
  
  
  }