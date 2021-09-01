import React from 'react';
import './App.css';
import { Route, Switch} from 'react-router-dom';
import UploadView from './uploadView'
import DownloadView from './downloadView'
import { VscThreeBars } from "react-icons/vsc";
import colors from './colors'
import air from './AIR_1024px.png'
import Bg from './background'
import api from './api'



const Beta = <div className='open_beta'>open beta</div>




export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      mobile: false,
      height: '',
      backend: false,
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


  routing = ()=> {
    return (
        <Switch>
          <Route exact path="/" render={(props) => (
              <UploadView {...props} mobile={this.state.mobile} backend={this.state.backend} />
              )}></Route>
          <Route  path="/:id" render={(props) => (
              <DownloadView {...props} mobile={this.state.mobile} backend={this.state.backend} />
              )}></Route>
        </Switch> 
    );
  }


  

  
  render(){
    return (
      <div className='app_window' style={{height: this.state.height}}>
        <div className='head_view'>
          <div className='title'><img  className='air_icon' src={air} alt="Logo"/> AIR channel{Beta}</div>
          <div className='menu'>
            <div className='menu_icon'><VscThreeBars size={30} color={colors.white}/> </div></div>
        </div>
        <div className='unkown_view'><Bg/></div>
        <div className='actions_view'>{this.routing()}</div>
      </div>
    );
  }
}



