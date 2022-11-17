import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  let response = await axios.get(baseUrl)
  return response.data
}

const createNewAnecdote = async (data) => {
  const newAnecdote = {content:data,votes:0}
  let response = await axios.post(baseUrl,newAnecdote)
  return response.data
}

const updateAnecdote = async (anecdote) => {
  const anecdoteVoted = {...anecdote,votes:anecdote.votes +1 }
  let response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdoteVoted)
  return response.data
}

export default {getAll, createNewAnecdote, updateAnecdote}