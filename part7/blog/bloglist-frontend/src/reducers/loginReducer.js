
import { createSlice } from '@reduxjs/toolkit'
const loginReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state,action){
      return action.payload
    }
  }
})

export const { setUser } = loginReducer.actions


export default loginReducer.reducer