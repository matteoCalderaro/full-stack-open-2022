import { connect, useSelector } from 'react-redux';


const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  //const message = useSelector(state=>state.notification)

  if(!props.message){
    return null
  }
  
  return (
    <div style={style}>
      {props.message}
      {/*{message} */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)

//export default Notification