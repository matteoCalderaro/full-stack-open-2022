import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [rating, setRating] = useState(new Array(7).fill(0))

  const random = () => {
    const number = Math.round(Math.random()*6)
    setSelected(number)
  }

  const addVote = () => {
    const ratingCopy = [...rating]
    ratingCopy[selected] += 1
    setRating(ratingCopy)
    console.log(ratingCopy)
  }

  const mostVoted = () =>{
    const maxVoted = Math.max(...rating)
    const index = rating.indexOf(maxVoted)

    const bestAnecdote = {
      content: anecdotes[index],
      votes: maxVoted
    }
    return bestAnecdote
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {rating[selected]} votes</div>
      <div>
        <button onClick={addVote}>vote</button>
        <button onClick={random}>next anecdote</button>  
      </div>
      <h2>Anecdote with most votes</h2>
      <div>
        {mostVoted().content}  
      </div>
      <div>
        has {mostVoted().votes} votes
      </div>
    </div>
  )
}

export default App
