const Notification = ({message}) => {
    

    if(!message){
        return null
    }
    const style = message.includes('Information') ? 'error' : 'success'

    return(
        <div className={style}>
            {message}
        </div>
    )
}
export default Notification