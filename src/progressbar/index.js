
import './index.css'
import colors from './../colors'
const ProgressBar = (props) => {
    const { bgcolor, counter } = props;
  
    const containerStyles = {
      //position: 'absolute',
      height: '150px',
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
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '5px',
      height: '100%',
      width: `${counter}%`,
      backgroundColor: colors.black,
      
    }
  
    const labelStyles = {
      color: 'black',
      height: '100%',
      width: '100%',
      //border: '1px solid rgba(151, 151, 151, 0.812)',
      textShadow: `1px 1px ${colors.grey}`,
      //paddingLeft:'3vw',
      fontSize: '150%',
      //minWidth: '50px',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "rgba(255, 255, 255, 0.512)",
      
    }
    
    const progressDiv = {
      height: 'auto',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
    
 



    return (
      <div style={progressDiv}>
      <div className="c-subscribe-box u-align-center">
        <div className="rainbow"><span></span><span></span></div>
          <div className="c-subscribe-box__wrapper">
          <div style={labelStyles}>{`${Math.floor(counter)} %`}</div>
            
        </div>
      </div>
      </div>
    );
  };
  
  export default ProgressBar;