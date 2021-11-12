import './index.css'
import React from 'react';


export default class Bar extends React.Component {
    constructor(props) {
      super(props);
      
    }
    
    render() {
    const { counter} = this.props;
      return (
        <div className='TransferBar'>
        <div className="container_transferBar ">
          <div className="transfer_progressbar-container">
            <div className="transfer_progressbar-complete" style={{width: `${Math.floor(counter)}%`, color:'white'}}>
              <div className="transfer_progressbar-liquid"></div>
            </div>
            <span className="transfer_progress">{counter} %</span>
          </div>
        </div>
        </div>
      )
    }
  }
  
  