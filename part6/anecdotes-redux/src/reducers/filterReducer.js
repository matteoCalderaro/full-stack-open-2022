import { createSlice } from '@reduxjs/toolkit';

const filterReducer = createSlice({
  name: 'filter',
  initialState: '',
  reducers:{
    setFilter(state,action){
      return action.payload
    }
  }
})

export const {setFilter} = filterReducer.actions

export const changeFilter = (value) => {
  return dispatch => dispatch(setFilter(value))
}

export default filterReducer.reducer