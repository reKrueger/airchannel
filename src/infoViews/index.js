import Swal from 'sweetalert2'
import colors from './../colors'
import { renderToString } from 'react-dom/server'
import roundFileSize from '../helpers/roundFileSze';


const htmlLayout = (infos)=>{
  const { mail_to, mail_user, date, use_download, use_link, files } = infos
  let _size = 0
  for (const file of files) {
    _size = _size + file.file_size
  };
  const upload_size = 'gesamt '+ roundFileSize(_size)
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric' };
  const ds = new Date(date)
  const is_mail = mail_user ? mail_user : 'keine Angabe'
  const is_mail_to = mail_to === [''] ? mail_to : 'keine Angabe'
  const is_use_download = use_download ? 'einmailger Download': 'upload wird nach 12 Std gelöscht'
  const is_use_link = use_link ? 'upload-Link' : 'E-mail Benachrichtung'
  return(
    <div >
        <div style={{fontWeight: '600',height: '1.5em'}}> Erstellt: <span style={{fontWeight: '300'}}> {ds.toLocaleDateString("de-DE", options)}</span></div>
        <div style={{fontWeight: '600',height: '1.5em'}}> Dateigröße: <span style={{fontWeight: '300'}}> {upload_size}</span></div>
        <div style={{fontWeight: '600',height: '1.5em'}}> Absender: <span style={{fontWeight: '300'}}> {is_mail}</span></div>
        <div style={{fontWeight: '600',height: '1.5em'}}> Empfänger: <span style={{fontWeight: '300'}}> {is_mail_to}</span></div>
        <div style={{fontWeight: '600',height: '1.5em'}}> Speicher Option: <span style={{fontWeight: '300'}}> {is_use_download}</span></div>
        <div style={{fontWeight: '600',height: '1.5em'}}> Übermittlungsart: <span style={{fontWeight: '300'}}> {is_use_link}</span></div>
    </div>
  )
}


//background: rgba(187, 187, 187, 0.886);
const infoView = (title, text, cancelBtn, okBtnText, cancelBtnText)=>{

    // Alert POP UP
    //
    const e = Swal.fire({
        background: 'rgba(187, 187, 187, 0.886)',
        title: title,
        html: text,
        icon: 'info',
        showCancelButton: cancelBtn,
        cancelButtonColor: colors.red,
        confirmButtonColor: colors.highBlue,
        confirmButtonText: okBtnText,
        cancelButtonText: cancelBtnText
      }).then((result) => {
        if (result.isConfirmed) {
            return true
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return false
        }
      })
      return e
}


export const  downloadInfoView = async(infos)=>{
  const title = 'Upload Infos'
  const cancelBoolean = false
  const okBtnText = 'Ok'
  let htmlText = renderToString(htmlLayout(infos))
  let answer =  await infoView(title, htmlText, cancelBoolean,okBtnText, null) // alert View
  if(answer){
      return
      }

  

}