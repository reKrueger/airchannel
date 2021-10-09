
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
      width: '100%',
      backgroundColor: "rgba(255, 255, 255, 0.512)",
      borderRadius: '0vh',
      overflow: 'hidden',
      borderRadius: '2px',
      marginRight: '2em',
      marginLeft: '2em'
      
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
      color: 'black',
      height: '6vh',
      width: '5em',
      border: '1px solid rgba(151, 151, 151, 0.812)',
      textShadow: `1px 1px ${colors.white}`,
      //paddingLeft:'3vw',
      fontSize: '150%',
      //minWidth: '50px',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '30px',
      backgroundColor: "rgba(255, 255, 255, 0.512)",
      borderRadius: '2px',
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
        <div style={labelStyles}>{`${Math.floor(counter)} %`}</div>
        <div style={containerStyles}>
          <div style={fillerStyles}>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;