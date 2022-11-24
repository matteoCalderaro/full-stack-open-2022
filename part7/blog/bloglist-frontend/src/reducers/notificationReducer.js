import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: null,
  reducers:{
    addMessage(state,action){
      return action.payload
    }
  }
})

export const { addMessage } = notificationReducer.actions

let timer

export const setMessage = (message,time) => {
  return dispatch => {
    dispatch(addMessage(message))
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => dispatch(addMessage(null)), time)
  }
}

export default notificationReducer.reducer