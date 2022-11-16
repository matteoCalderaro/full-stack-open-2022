
import { useDispatch } from 'react-redux';
import { createNewNote } from '../reducers/anecdoteReducer';
import { removeMessage, setMessage } from './../reducers/notificationReducer';


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = (e) => {
    e.preventDefault()
    dispatch(createNewNote(e.target.note.value))
    dispatch(setMessage(`You added: '${e.target.note.value}'`))
    setTimeout(()=>dispatch(removeMessage()),5000)
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

export default AnecdoteForm