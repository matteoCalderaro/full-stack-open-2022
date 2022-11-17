
import { useDispatch } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { setMessage } from './../reducers/notificationReducer';


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = (e) => {
    e.preventDefault()
    dispatch(createNewAnecdote(e.target.note.value))
    dispatch(setMessage(`You added: '${e.target.note.value}'`,2000))
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