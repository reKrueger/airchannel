
/*

      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    */

import colors from './../colors'
const ProgressBar = (props) => {
    const { bgcolor, counter } = props;
  
    const containerStyles = {
      //position: 'absolute',
      height: '6vh',
      width: '90%',
      backgroundColor: "rgba(255, 255, 255, 0.512)",
      borderRadius: '0vh',
      overflow: 'hidden',
      borderRadius: '2px'
      
    }
  
    const fillerStyles = {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: '100%',
      width: `${counter}%`,
      backgroundColor: colors.black,
      
    }
  
    const labelStyles = {
      position: 'absolute',
      color: 'white',
      height: '6vh',
      width: 'auto',
      left:'6%',
      textShadow: `2px 2px ${colors.black}`,
      //paddingLeft:'3vw',
      fontSize: '150%',
      //minWidth: '50px',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      //marginRight: '5px',
      //backgroundColor: "rgba(255, 255, 255, 0.512)"
    }
    
    const progressDiv = {
      height: '100%',
      width: '94%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
    
 



    return (
      <div style={progressDiv}>
        <div style={containerStyles}>
          <div style={fillerStyles}>
            <span style={labelStyles}>{`${Math.floor(counter)} %`}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;