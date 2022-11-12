const styleError ={
  maxWidth: '400px',
  color: 'red',
  border: '1px solid red',
  padding: '5px 10px',
  borderRadius: '5px',
  backgroundColor: '#eee8e8'

}
const styleSuccees ={
  color: 'green',
  border: '1px solid green',
  padding: '5px 10px',
  borderRadius: '5px',
  backgroundColor: '#eee8e8'
}


const Notification = ({ message }) => {
  if(message){
    return(
      <p id='error_message' style={message.includes('added') || message.includes('removed') ? styleSuccees : styleError}>{message}</p>
    )
  } else{
    return null
  }
}

export default Notification