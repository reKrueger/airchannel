import Swal from 'sweetalert2'
import colors from './../colors'






//background: rgba(187, 187, 187, 0.886);
export const infoView = (title, text, cancelBtn, okBtnText, cancelBtnText)=>{

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