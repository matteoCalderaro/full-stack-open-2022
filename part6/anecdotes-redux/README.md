## anecdotes step1 - step6
npm install react-redux

import { Provider } from 'react-redux' <br>
import { useSelector, useDispatch } from 'react-redux'

----

### uncontrolled form
```
  const addNote = (e) => {
    e.preventDefault()
    dispatch({
      type: 'NEW_NOTE',
      data: {
        content: e.target.note.value,
        votes: 0,
        id: (Math.random()*1000).toFixed(0) 
      }
    })
  }

  return (
    // ...
      <form onSubmit={addNote}>
        <div><input name='note'/></div>
        <button type='submit'>create</button>
      </form>
    // ...
  )
```

### from action-objects to action creator-functions stored in the reducer

src\App.js
```
const addNote = (e) => {
  e.preventDefault()
  dispatch(createNewNote(e))
}
```

src\reducers\anecdoteReducer.js
```
export const createNewNote = (e) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content: e.target.note.value,
      votes: 0,
      id: (Math.random()*1000).toFixed(0) 
    }
  }
} 
```
## better anecdotes step7 - step10
---

npm install @reduxjs/toolkit

### Moving the store into its own file store.js using configureStore by Toolkit and combined reducers

```
const store = configureStore({
  reducer:{
    anecdotes:anecdoteReducer,
    notes: notificationReducer,
    filter: filterReducer
  }
})
```

### Create new reducers using the createSlice function by Toolkit's
 ```
 import { createSlice } from "@reduxjs/toolkit"

const notificationReducer = createSlice({
  name: 'note',
  initialState: '',
  reducers:{
    addMessage(state,action){
      return action.payload
    }
  }
})

export const {addMessage} = notificationReducer.actions

export const setMessage = (message) => {
  return dispatch => {
    return dispatch(addMessage(message))
  }
}

export default notificationReducer.reducer
```

### conditional rendering based on multiple reducers

src\components\AnecdoteList.js
```
const anecdotes = useSelector(state => {
    if(!state.filter){
      return state.anecdotes.sort((p,c)=>c.votes-p.votes)
    } else {
      return state.anecdotes.filter(a=>a.content.includes(state.filter)).sort((p,c)=>c.votes-p.votes)
    }
  })
```

