import { useSelector } from 'react-redux'

const styleError ={
  maxWidth: '400px',
  color: 'red',
  border: '1px solid red',
  padding: '5px 10px',
  borderRadius: '5px',
  backgroundColor: '#eee8e8',
  position: 'absolute',
  top: '65px',


}
const styleSuccees ={
  color: 'green',
  border: '1px solid green',
  padding: '5px 10px',
  borderRadius: '5px',
  backgroundColor: '#eee8e8',
  position: 'absolute',
  top: '60px',
  right:0,
  maxWidth: '250px',

}


const Notification = () => {
  const message = useSelector(state => state.notification)
  if(message){
    return(
      <div style={message.includes('added') || message.includes('removed') ? styleSuccees : styleError}>{message}</div>
    )
  } else{
    return null
  }
}

export default Notification