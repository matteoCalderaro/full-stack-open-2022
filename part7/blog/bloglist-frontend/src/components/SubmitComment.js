import useField from '../hooks/useField'


const commentFormStyle = {
  background: '#fcffa3',
  border: '1px solid gray',
  borderRadius: '5px',
  margin: '5px 0px',
  padding: '5px',
  //maxWidth: '280px',
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: '30px'
}

const SubmitComment = ({ submitComment }) => {
  const { reset:resetTitle,...title } = useField('text')
  console.log(title)


  return(
    <div style={commentFormStyle}>
      <form onSubmit={submitComment}>

        <input {...title}/>
        <button className='button-70'>submit</button>

      </form>

    </div>

  )
}
export default SubmitComment