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

export const setMessage = (message) => {
  return dispatch => {
    return dispatch(addMessage(message))
  }
}
export const deleteMessage = () => {
  return dispatch => {
    return dispatch(removeMessage(null))
  }
}

export default notificationReducer.reducer