import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import UploadView from './uploadView'
import DownloadView from './downloadView'
import { VscThreeBars } from "react-icons/vsc";
import colors from './colors'
import air from './AIR_1024px.png'
import BG from './background'
import api from './api'

// <img style={backgroundImg} src="https://picsum.photos/1500/900?random=1" alt='random_pic!'/>
const Beta = <div className='open_beta'>open beta</div>

const backgroundImg = {
    "width": "100%",
    "height": "100%",
    "object-fit": "cover",
}


export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      mobile: false,
      height: ''
    }
      

    }
  
  componentDidMount(){
    this.createPing()
    window.addEventListener("resize", this.updateWindowDimensions());
    console.log(window.location.hostname)
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
      console.log(res.data)
    })
  }

  routing = ()=> {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/airchannel/" render={(props) => (
              <UploadView {...props} mobile={this.state.mobile} />
              )}></Route>
          <Route exact path="/airchannel/:id" render={(props) => (
              <DownloadView {...props} mobile={this.state.mobile} />
              )}></Route>
          </Switch> 
      </BrowserRouter>

    );
  }

  randomBackground = ()=>{
    const rgb_1 = Math.floor(Math.random() * 256)
    const rgb_2 = Math.floor(Math.random() * 256)
    const rgb_3 = Math.floor(Math.random() * 256)
    const rgb_4 = Math.floor(Math.random() * 256)
    const rgb_5 = Math.floor(Math.random() * 256)
    const rgb_6 = Math.floor(Math.random() * 256)
    const contrast = rgb_1 + rgb_2 + rgb_3 + rgb_4 + rgb_5 + rgb_6
    //console.log('contrast', contrast)
    const style = `radial-gradient(rgb(${rgb_1}, ${rgb_2}, ${rgb_3}), rgb(${rgb_4}, ${rgb_5}, ${rgb_6}))`
    return {'background':'white' }
  }

  

  
  render(){
    return (
      <div className='app_window' style={{height: this.state.height}}>
        <div className='head_view'>
          <div className='title'><img  className='air_icon' src={air} alt="Logo"/> AIR channel{Beta}</div>
          <div className='menu'>
            <div className='menu_icon'><VscThreeBars size={30} color={colors.white}/> </div></div>
        </div>
        <div className='unkown_view' style={this.randomBackground()}><BG/></div>
        <div className='actions_view'>{this.routing()}</div>
      </div>
    );
  }
}



