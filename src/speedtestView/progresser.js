import colors from './../colors'



const Progresser = (props) => {
    const { counter} = props;


    const progressDiv = {
        height: '100vh',
        width: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'red'
      }

    const labelStyles = {
        color: 'green',
        height: 'auto',
        width: '5em',
        border: '1px solid rgba(151, 151, 151, 0.812)',
        textShadow: `1px 1px ${colors.grey}`,
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
    const containerStyles = {
      //position: 'absolute',
      height: 'auto',
      width: 'auto',
      //backgroundColor: "rgba(255, 255, 255, 0.512)",
      borderRadius: '0vh',
      overflow: 'hidden',
      borderRadius: '2px',
      marginRight: '2em',
      marginLeft: '2em',
      background: colors.white
      
    }
  
    const fillerStyles = {
        width: 'auto',
        display: 'flex',

        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: `${(counter)}%`,
        backgroundColor: colors.black,
      
    }

  
    return(
        <div className='speedFrame'>
            <div className='speedContainer'>
                <div className='speedCount'>{`${Math.round(counter*10)/10} Mbit/s`}</div>
                <div style={fillerStyles}/>
            </div>
        </div>
    );
  };
  
  export default Progresser;