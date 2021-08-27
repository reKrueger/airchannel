
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
      
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${counter}%`,
      borderRadius: '3vh',
      backgroundColor: colors.black,
    }
  
    const labelStyles = {
      color: 'white',
      height: '100%',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginRight: '10px'
    }
    
    const progressDiv = {
      position: 'absolute',
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
 



    return (
      <div style={progressDiv}>
        <div style={containerStyles}>
          <div style={fillerStyles}>
            <span style={labelStyles}>{`${Math.round(counter)} %`}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;