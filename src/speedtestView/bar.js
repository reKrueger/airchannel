import React from 'react';


export default class Bar extends React.Component {
    constructor(props) {
      super(props);
      
      this.firstDayOfYear = new Date(new Date().getFullYear(), 0, 1).getTime()
      this.firstDayOfNextYear = new Date(new Date().getFullYear() + 1, 0, 1).getTime()
    }
    
    getProgress() {
      const now = new Date().getTime()
      return Math.round((now - this.firstDayOfYear) / (this.firstDayOfNextYear - this.firstDayOfYear) * 100);
    }
    
    render() {
    const { counter} = this.props;
      return (
        <div className="container_bar">
          <div className="progressbar-container">
            <div className="progressbar-complete" style={{width: `${counter}%`}}>
              <div className="progressbar-liquid"></div>
            </div>
            <span className="progress">{Math.round(counter*10)/10} MBit/s</span>
          </div>
        </div>
      )
    }
  }
  
  