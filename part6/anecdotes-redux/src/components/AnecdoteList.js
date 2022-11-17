
import { useDispatch, useSelector } from 'react-redux';
import { addVote } from './../reducers/anecdoteReducer';
import { setMessage } from './../reducers/notificationReducer';

const AnecdoteList = () => {
  
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if(!state.filter){
      return state.anecdotes.map(a=>a).sort((p,c)=>c.votes-p.votes)
    
    } else {
      return state.anecdotes.filter(a => a.content.includes(state.filter)).sort((p,c)=>c.votes-p.votes)
    }
  })
  
  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(setMessage(`You voted: '${anecdote.content}'`,5000))
  }

  return(
    <>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={()=>vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

export default AnecdoteList