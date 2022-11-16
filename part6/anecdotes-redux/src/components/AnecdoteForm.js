
import { useDispatch } from 'react-redux';
import { createNewNote } from '../reducers/anecdoteReducer';


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = (e) => {
    e.preventDefault()
    dispatch(createNewNote(e))
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