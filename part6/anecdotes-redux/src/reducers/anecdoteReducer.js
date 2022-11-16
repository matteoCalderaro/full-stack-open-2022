import { createSlice } from '@reduxjs/toolkit';

const anecdoteReducer = createSlice({
  name:'anecdote',
  initialState: [],
  reducers: {
    vote(state,action){
      const id = action.payload
      const anecdoteToChange = state.find(a=>a.id === id)
      const updatedAnecdote = {...anecdoteToChange,votes:anecdoteToChange.votes +1}
      return state.map(a => a.id === id ? updatedAnecdote : a )
    },
    addAnecdote(state,action){
      return [...state,action.payload]

      // without server response ------------
      // const content = action.payload
      // state.push({
      //   content,
      //   votes: 0,
      //   id: (Math.random()*10000).toFixed(0)
      // })

      // return [...state,{
      //   content,
      //   votes: 0,
      //   id: (Math.random()*10000).toFixed(0)
      // }]
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }
})

export const {vote,addAnecdote,setAnecdotes} = anecdoteReducer.actions

export const addVote = (id) => {
  return dispatch => {
    return dispatch(vote(id))
  }
}

export const createNewAnecdote = (data) => {
  return dispatch => {
    return dispatch(addAnecdote(data))
  }
}

export const initializaAnecdotes = (data) => {
  return dispatch => {
    return dispatch(setAnecdotes(data))
  }
}

export default anecdoteReducer.reducer