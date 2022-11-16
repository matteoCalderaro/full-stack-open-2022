
import { useDispatch } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { removeMessage, setMessage } from './../reducers/notificationReducer';
import anecdoteService from '../services/anecdoteService'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = (e) => {
    e.preventDefault()
    anecdoteService.createNewAnecdote(e.target.note.value)
      .then(response => {
        dispatch(createNewAnecdote(response))})

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