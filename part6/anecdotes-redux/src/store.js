import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'


const store = configureStore({
  reducer:{
    anecdotes:anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  }
})

store.subscribe(()=>console.log('negozio',store.getState()))

export default store