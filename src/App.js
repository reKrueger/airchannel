import React from 'react';
import './App.css';
import { Route, Switch} from 'react-router-dom';
import UploadView from './uploadView'
import DownloadView from './downloadView'
import DropdownMenu from './dropdownMenu'
import Bg from './background'
import api from './api'
import HelpView from './helpView';
import SpeedtestView from './speedtestView';
import InfoView from './infoView'
import ImprintView from './imprintView';
import ApiView from './apiView';
import air from './AIR_1024px.png'




const Beta = <div className='open_beta'>open beta</div>




export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      mobile: false,
      height: '',
      backend: false
    }
      

    }
  
  componentDidMount(){
    this.createPing()
    window.addEventListener("resize", this.updateWindowDimensions());
    this.setState({height: window.innerHeight + "px"})
  }

  

  updateWindowDimensions() {
    const mobile = window.innerWidth<=600
    document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);
    this.setState({ mobile: mobile});
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions)
  }

  createPing = async()=>{
    await api.create_ping().then(res=>{
      if(res.data.is === 'pong'){
        this.setState({backend: true})
      }
    })
  }
//         

  headView = ()=>{
    return(
      <div className='head_view'>
      <div className='title'><img className='air_icon' src={air} alt="Logo"/> AIR channel{Beta}</div>
        <div className='menu'><DropdownMenu /></div>
      </div>
    )
  }

  background = ()=>{
    return(<div className='unkown_view'><Bg/></div>)
    
  }



  routing = ()=> {
    return (
        <Switch>
          <Route exact path="/help" render={(props) => (<HelpView  {...props} mobile={this.state.mobile} />)}></Route>
          <Route exact path="/info" render={(props) => (<InfoView  {...props} mobile={this.state.mobile} />)}></Route>
          <Route exact path="/speedtest" render={(props) => (<SpeedtestView  {...props} mobile={this.state.mobile} />)}></Route>
          <Route exact path="/imprint" render={(props) => (<ImprintView  {...props} mobile={this.state.mobile} />)}></Route>
          <Route exact path="/api" render={(props) => (<ApiView  {...props} mobile={this.state.mobile} />)}></Route>
          <Route exact path="/" render={(props) => (
            <div className='app_window' style={{height: this.state.height}}>
              {this.headView()}
              {this.background()}
              <div className='actions_view'><UploadView  {...props} mobile={this.state.mobile} backend={this.state.backend} /></div>
            </div>
              )}>
          </Route>
          <Route  path="/:id" render={(props) => (
            <div className='app_window' style={{height: this.state.height}}>
                {this.headView()}
                {this.background()}
                <div className='actions_view'><DownloadView {...props} mobile={this.state.mobile} backend={this.state.backend} /></div>
            </div>
              )}>
          </Route>
        </Switch> 
    );
  }


  

  
  render(){
    return (
      <div>{this.routing()}</div>
    );
  }
}



