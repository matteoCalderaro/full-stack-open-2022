import { createSlice } from "@reduxjs/toolkit"

const notificationReducer = createSlice({
  name: 'note',
  initialState: '',
  reducers:{
    addMessage(state,action){
      return action.payload
    },
    removeMessage(state,action){
      return null
    }
  }
})

export const {addMessage, removeMessage} = notificationReducer.actions

export const setMessage = (message,time) => {
  return dispatch => {
    setTimeout(()=> dispatch(removeMessage(null)), time)
    dispatch(addMessage(message))
  }
}

export default notificationReducer.reducer