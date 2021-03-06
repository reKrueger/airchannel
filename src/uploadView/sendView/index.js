import React from 'react';
import './index.css';
import Radio from '@material-ui/core/Radio';
import Switch from '@material-ui/core/Switch';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {sendAlerts} from './../../alertViews';
import api from './../../api'
import {colors, styled} from '@material-ui/core';
import {USE_DOWNLOAD, USE_NOT_DOWNLOAD, PLACEHOLDER_TEXT} from './../../text'


const BlackSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: 'black',
      
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: 'black',
    },
  }));




export class ViewText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            useLink: true,
            useDownload: false,
            message: '',
            mail_user: '',
            mail_to: '',
            send_option:'link',
            visible: true,
            mobileHeight: ''

        }
        this.wrapper = React.createRef();

    }
    componentDidMount(){
        const vh = window.innerHeight ;
        this.setState({mobileHeight: `${vh}px`})
    }

    componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            this.reset_state()
        }
    }

    reset_state = () => {
        this.setState({
            useUserMail: false,
            useLink: true,
            useMail: false,
            useDownload: true
        })
    }

    handleInput = ({ target }) => {
        this.setState({ [target.name]: target.value })

        
    }

    handleMail = () => {
        const is_used = this.state.useLink? false : true
        this.setState({ useLink: is_used});
    };

    handleDownload = () => {
        //const used = event.target.value
        const is_used = this.state.useDownload? false : true
        this.setState({useDownload: is_used});
    };

    











    radioSwitchMail = ()=>{
        const valueR = this.state.useLink? 'link' : 'mail'
        return(
            <div className='send_view_change_zone_div'>
                <div className='send_view_radio_div'>
                    <FormControl >
                        <div className='send_view_formlabel' color='default'>??bermittlungsart</div>
                        <RadioGroup value={valueR} onChange={this.handleMail} >
                            <FormControlLabel value="link" control={<Radio color="default"/>} label="Link" />
                            <FormControlLabel value="mail" control={<Radio color="default"/>} label="Link per mail" />
                        </RadioGroup>
                    </FormControl>
                </div>
                {this.useLinkOrMail()}
            </div>
        )
    }

    useLinkOrMail = () => {
        const { useLink } = this.state
        if(!useLink){
            return (
                <div className='send_view_show_options'>
                    <div className='send_view_div_input'>E-mail des Absenders:
                        <input className='send_view_input' type='email' name='mail_user' value={this.state.mail_user} onChange={this.handleInput}></input>
                    </div>
                    <div className='send_view_div_input'>E-mail des Empf??nger:
                        <input className='send_view_input' type='email' name='mail_to' value={this.state.mail_to} onChange={this.handleInput}></input>
                    </div>
                </div>
            )
        }else{
            return (
                <div className='send_view_show_options'>
                    <div className='send_view_div'>
                        <div className='send_view_div_linktext'>Erhalte einen Link nach dem Upload</div>
                    </div>
                </div>
            )
        }
                
          
    }

    













    radioSwitchDownload = ()=>{
        return(
            <div className='send_view_change_zone_div'>
                <div className='send_view_radio_div'>
                    <FormControl >
                    <div className='send_view_formlabel' >Download</div>
                    <FormControlLabel control={
                        <BlackSwitch size="medium" color='secondary' checked={this.state.useDownload} onChange={this.handleDownload} />}
                        label="einmaliger Download"
                        />
                    </FormControl>
                </div>
                {this.downloadOptionText()}
            </div>
        )
    }

    downloadOptionText = () => {
        const { useDownload } = this.state
        if(useDownload){
            return (
                <div className='sendview_info_text'>{USE_DOWNLOAD}</div>
            )
        }else{
            return (
                <div className='sendview_info_text'>{USE_NOT_DOWNLOAD}</div>
            )
        }
        
    }









    send_info = async()=>{
        const { mail_to, mail_user, message, useDownload, useLink} = this.state
        // sending option => use mail
        if(!useLink){
            // validate.... no input im E-mail field
            if(!mail_user || !mail_to){
                let answer =  await sendAlerts('empty')
                if(answer){
                    return
                }
            }
            // validate.... e-mail Absender
            const is_mail_user = await api.is_mail_detail(mail_user).then(res=>{return res.data.isSuccess})
            if(!is_mail_user){
                let answer =  await sendAlerts('mailuser')
                if(answer){
                    return
                }
            }
            // validate.... e-mail Empf??nger
            const is_mail_to = await api.is_mail_detail(mail_to).then(res=>{return res.data.isSuccess})
            if(!is_mail_to){
                let answer =  await sendAlerts('mailto')
                if(answer){
                    return
                }
            }
        }
        this.props.infos({ mail_user, mail_to, message, useDownload, useLink })

    }


    hide() {
        this.setState({ visible: false });
    }
    

    render() {
        return (
            <div className={this.props.mobile?'send_view_modal_mobile':'send_view_modal'} style={this.props.mobile?{height:this.state.mobileHeight}:null}>
                <div className={this.props.mobile?'send_view_frame_mobile':'send_view_frame'}>
                    <div className='send_view_title_div'>
                        Daten??bertragung
                    </div>
                    <div className='send_view_change_zone'>{this.radioSwitchDownload()}</div>
                    <div className='send_view_change_zone'>{this.radioSwitchMail()}</div>
                    <div className='send_view_div'>
                        <textarea className='send_view_message' placeholder={PLACEHOLDER_TEXT} rows={6} type='text' name='message' value={this.state.message} onChange={this.handleInput}></textarea>
                    </div>
                    <div className='send_view_btn_div'>
                        <button className='send_btn' onClick={() => this.props.close()}>abbruch</button>
                        <button className='send_btn' style={{color: colors.blue}} onClick={() => this.send_info()}>senden</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewText;



