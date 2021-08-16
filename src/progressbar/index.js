
/*

      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    */

import colors from './../colors'
const ProgressBar = (props) => {
    const { bgcolor, counter } = props;
  
    const containerStyles = {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: "transparent",
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${counter}%`,
      backgroundColor: colors.black,
    }
  
    /*'
    const labelStyles = {
      color: 'white',
      fontWeight: 'bold'
    }
    <span style={labelStyles}>{`${Math.round(counter)} %`}</span>
  */



    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          
        </div>
      </div>
    );
  };
  
  export default ProgressBar;