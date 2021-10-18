import Swal from 'sweetalert2'
import colors from './../colors'






//background: rgba(187, 187, 187, 0.886);
const alertView = (title, text, cancelBtn, okBtnText, cancelBtnText)=>{

    // Alert POP UP
    //
    const e = Swal.fire({
        background: 'rgba(187, 187, 187, 0.886)',
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: cancelBtn,
        cancelButtonColor: colors.black,
        confirmButtonColor: colors.black,
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


export const cancelUploadSwal=async()=>{
  // Alert POP UP
 //
 const titel = 'Abbruch?'
 const text = 'sind Sie Sicher, das Sie den Upload abbrechen möchten !'
 const cancelBoolean = true
 const okBtnText = 'Ja, abbrechen'
 const cancelBtnText = 'Nein, weiter hochladen'

 const answer =  await alertView(titel, text, cancelBoolean, okBtnText, cancelBtnText)
 if(answer){
     return true
 }
 
}

export const newUploadSwal = async()=>{

  // Alert POP UP
  //
  const titel = 'Neuer Upload?'
  const text = 'sind Sie Sicher, Sie haben keine möglichkeit mehr an den Downloadlink zu kommen!'
  const cancelBoolean = true
  const okBtnText = 'Ja, ich habe den link kopiert'
  const cancelBtnText = 'Nein, ich kopiere mir den link nochmal'

  const answer =  await alertView(titel, text, cancelBoolean, okBtnText, cancelBtnText)
  if(answer){
      return true
  }
  
}


export const sendAlerts = async(alert)=>{
  const title = 'E-mail exestiert nicht'
  const cancelBoolean = false
  const okBtnText = 'Ok'

  switch(alert){
    case 'mailuser':
      var text = 'bitte überprüfen deine    Absender    Adresse'
      var answer =  await alertView(title, text, cancelBoolean,okBtnText, null) // alert View
      return answer

    case 'mailto':
      var text = 'bitte überprüfen deine   Empfänger   Adresse'
      var answer =  await alertView(title, text, cancelBoolean,okBtnText, null) // alert View
      return answer

    case 'empty':
      var text = 'Pflichtfelder sind nicht ausgefüllt !'
      const new_title = 'keine Eingabe'
      var answer =  await alertView(new_title, text, cancelBoolean,okBtnText, null) // alert View
      return answer
  }
}