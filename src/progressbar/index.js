
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
      borderRadius: '3vh',
      overflow: 'hidden',
      
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
      height: 'auto',
      minWidth: '50px',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginRight: '5px',
    }
    
    const progressDiv = {
      height: '100%',
      width: '94%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
    const cancelStyles = {
      color: 'white',
      height: 'auto',
      minWidth: '50px',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginLeft: '10px',
      backgroundColor: "rgba(255, 255, 255, 0.512)",
      borderRadius:'6px',
      padding: '5px',
      textShadow: '2px 2px 4px #000000',
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