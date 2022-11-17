import { useDispatch, connect } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { setMessage } from './../reducers/notificationReducer';


const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()

  const addNote = (e) => {
    e.preventDefault()
    props.createNewAnecdote(e.target.note.value)
    props.setMessage(`You added: '${e.target.note.value}'`,5000)
    // dispatch(createNewAnecdote(e.target.note.value))
    // dispatch(setMessage(`You added: '${e.target.note.value}'`,5000))
    e.target.note.value = ''
  }

  return(
    <>
    <h2>create new</h2>
    <form onSubmit={addNote}>
      <div><input name='note'/></div>
      <button type='submit'>create</button>
    </form>
    </>
  )
}

const mapDispatchToProps = {
  createNewAnecdote,
  setMessage
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

//export default AnecdoteForm