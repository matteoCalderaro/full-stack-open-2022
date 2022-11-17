import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService.js'

const anecdoteReducer = createSlice({
  name:'anecdote',
  initialState: [],
  reducers: {
    vote(state,action){
      const id = action.payload.id
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

export const addVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote)
    return dispatch(vote(updatedAnecdote))
  }
}

export const createNewAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNewAnecdote(data)
    return dispatch(addAnecdote(newAnecdote))
  }
}

export const initializaAnecdotes = (data) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    return dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteReducer.reducer