import React from 'react';
import './index.css';
import Dialog from '@material-ui/core/Dialog';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { alertView } from '../alertViews';
import api from './../api'


const placeholder = ' schreibe eine Nachricht an den Empfänger...'





export class ViewText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            useLink: true,
            useDownload: true,
            message: '',
            mail_user: '',
            mail_to: '',
            send_option:'link',
            download_option: 'einmalig'

        }
        this.wrapper = React.createRef();

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

    handleMail = (event) => {
        const used = event.target.value
        const is_used = used == 'mail'? false : true
        this.setState({send_option: used, useLink: is_used});
    };

    handleDownload = (event) => {
        const used = event.target.value
        const is_used = used == '12'? false : true
        console.log('radio ', used, '  is ', is_used)
        this.setState({download_option: used, useDownload: is_used});
    };
    











    radioSwitchMail = ()=>{
        return(
            <div className='send_view_change_zone_div'>
                <div className='send_view_radio_div'>
                    <FormControl >
                        <FormLabel className='send_view_formlabel'>Übermittlungsart</FormLabel>
                        <RadioGroup  value={this.state.send_option} onChange={this.handleMail}>
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
        const { send_option } = this.state
        switch(send_option){
            case 'mail':
                return (
                    <div className='send_view_show_options'>
                        <div className='send_view_div_input'>E-mail des Absenders:
                            <input className='send_view_input' type='email' name='mail_user' value={this.state.mail_user} onChange={this.handleInput}></input>
                        </div>
                        <div className='send_view_div_input'>E-mail des Empfänger:
                            <input className='send_view_input' type='email' name='mail_to' value={this.state.mail_to} onChange={this.handleInput}></input>
                        </div>
                        
                    </div>
                )
            case 'link':
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
                        <FormLabel className='send_view_formlabel'>Download</FormLabel>
                        <RadioGroup  value={this.state.download_option} onChange={this.handleDownload}>
                            <FormControlLabel value="einmalig" control={<Radio color="default"  />} label="einmaliger Download" />
                            <FormControlLabel value="12" control={<Radio color="default"/>} label="innerhalb 12 Stunden" />
                        </RadioGroup>
                    </FormControl>
                </div>
                {this.downloadOptionText()}
            </div>
        )
    }

    downloadOptionText = () => {
        const { download_option } = this.state
        switch(download_option){
            case '12':
                return (
                    <div className='sendview_info_text'> "Dein Upload wird 12 Stunden gespeichert, er steht so oft und zur jeder Zeit zum Download bereit"</div>
                )
            case 'einmalig':
                return (
                    <div className='sendview_info_text'> "Nach dem erstem Dowload werden alle Daten der Übertragung gelöscht, kein weiter Download mehr möglich"</div>
                )
        }
    }

    send_info = async()=>{
        const { mail_to, mail_user, message, useDownload, send_option, useLink  } = this.state
        const titel = 'E-mail exestiert nicht'
        const cancelBoolean = false
        const okBtnText = 'Ok'

        
        // sending option => use mail
        if(send_option === 'mail'){

            // validate.... no input im E-mail field
            if(!mail_user || !mail_to){
                this.props.close()
                let text = 'Pflichtfelder sind nicht ausgefüllt !'
                const new_title = 'keine Eingabe'
                let answer =  await alertView(new_title, text, cancelBoolean,okBtnText, null) // alert View
                if(answer){
                    this.props.newOpen()
                    return
                }
            }
            // validate.... e-mail Absender
            const is_mail_user = await api.is_mail_detail(mail_user).then(res=>{return res.data.isSuccess})
            if(!is_mail_user){
                this.props.close()
                let text = 'bitte überprüfen deine    Absender    Adresse'
                let answer =  await alertView(titel, text, cancelBoolean,okBtnText, null) // alert View
                if(answer){
                    this.props.newOpen()
                    return
                }
            }
            // validate.... e-mail Empfänger
            const is_mail_to = await api.is_mail_detail(mail_to).then(res=>{return res.data.isSuccess})
            if(!is_mail_to){
                this.props.close()
                let text = 'bitte überprüfen deine   Empfänger   Adresse'
                let answer =  await alertView(titel, text, cancelBoolean,okBtnText, null) // alert View
                if(answer){
                    this.props.newOpen()
                    return
                }
            }
        }

        
        this.props.infos({ mail_user, mail_to, message, useDownload, useLink })

    }


    
    

    render() {
        
        return (
            <Dialog
                ref={this.props.refi}
                PaperProps={{ style: { borderRadius: 6 } }}
                className={this.props.mobile?'send_view_dialog_mobile':'send_view_dialog'}
                open={this.props.open === true}
                fullScreen>
                <div className='send_view_frame'>
                    <div className='send_view_div'>
                        Datenübertragung
                    </div>
                    <div className='send_view_change_zone'>{this.radioSwitchDownload()}</div>
                    <div className='send_view_change_zone'>{this.radioSwitchMail()}</div>
                    <div className='send_view_div'>
                        <textarea className='send_view_message' placeholder={placeholder} rows={6} type='text' name='message' value={this.state.message} onChange={this.handleInput}></textarea>
                    </div>
                    <div className='send_view_btn_div'>
                        <button className='send_btn' onClick={() => this.props.close()}>abbruch</button>
                        <button className='send_btn' onClick={() => this.send_info()}>senden</button>
                    </div>


                </div>
            </Dialog>
        );
    }
}

export default ViewText;



