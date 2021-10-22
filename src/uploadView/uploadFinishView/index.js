import React from 'react';
import './index.css';
import ReactTooltip from "react-tooltip";


export default class FileList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      place: "top",
      type: "dark",
      effect: "float",
      condition: false
    };
  }

  changePlace(place) {
    this.setState({
      place: place
    });
  }

  changeType(type) {
    this.setState({
      type: type
    });
  }

  changeEffect(effect) {
    this.setState({
      effect: effect
    });
  }

  _onClick() {
    this.setState({
      condition: true
    });
  }

  
  
  showView = ()=>{
    if(!this.props.isLink){
      return(
        <div className='div_link'>
            <div className='link_text'>der Downloadlink wurde erfolgreich an </div>
            <div className='email_text'>{this.props.mailConfirm} </div>
            <div className='link_text'>gesendet. </div>
            <div className='link_text_2'>dein Download bleibt 12 Stunden lang gespeichert</div>
            <div className='link_text_2'>alle Daten werden nach ablauf unwiederuflich gelöscht</div>
          </div>
      )
    }else{
      return(
        <div className='div_link'>
            <div className='link_text'> hier ist der link zum kopieren</div>
            <a className='link_copy'
                  data-for="custom-event"
                  data-tip="link wurde kopiert"
                  data-event="click focus"
                  onClick={() => {navigator.clipboard.writeText(this.props.link)}}
                >
                  {this.props.link}
                </a>

                <ReactTooltip id="custom-event" place="right" effect="solid" globalEventOff="click" afterShow={()=>{navigator.clipboard.writeText(this.props.link)}} />
                <div className='link_text_2'>dein Download bleibt 12 Stunden lang gespeichert</div>
                <div className='link_text_2'>...alle Daten werden nach ablauf unwiederuflich gelöscht</div>
          </div>
      )
    }
  }





  
  
  render(){
    return (
        <div className='view_finish'>
          {this.showView()}
        </div>
    )
  }
    
  
  
  }