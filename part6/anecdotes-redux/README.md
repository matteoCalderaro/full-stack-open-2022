## anecdotes step1 - step6
npm install react-redux

import { Provider } from 'react-redux' <br>
import { useSelector, useDispatch } from 'react-redux'


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

## Anecdotes and the backend step1 - step2

npm install json-server --save-dev

```
"scripts": {
  "server": "json-server -p3001 --watch db.json",
  // ...
}
```
>src\App.js
```
useEffect(()=> {
    anecdoteService.getAll()
     .then(response => dispatch(setAnecdotes(response)))
  },[dispatch])
```
>src\services\anecdoteService.js

```
const getAll = async () => {
  let response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}
```
>src\reducers\anecdoteReducer.js
```
setAnecdotes(state,action){
  return action.payload
}
//---
export const {setAnecdotes} = anecdoteReducer.actions
```
## Anecdotes and the backend step3 - step6
Moving the comunication with the server from the components to the reducers. 
These kind of async actions can be implemented using the Redux Thunk library. With Redux Thunk it is possible to implement action creators which return a function instead of an object. The function receives Redux store's dispatch and getState methods as parameters. This allows for example implementations of asynchronous action creators, which first wait for the completion of a certain asynchronous operation and after that dispatch some action, which changes the store's state.
<br>
npm install redux-thunk

>src\App.js
```
useEffect(()=> {
    dispatch(initializaAnecdotes())
  },[dispatch])
```
>src\reducers\anecdoteReducer.js
```
setAnecdotes(state,action){
  return action.payload
}
//---
export const {setAnecdotes} = anecdoteReducer.actions
//---
export const initializaAnecdotes = (data) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    return dispatch(setAnecdotes(anecdotes))
  }
}
```
## Anecdotes and connect step1 - grand finale
Using the connect function instead of the hooks useSelector and useDispatch.

mapStateToProps

<pre>
import { connect, <del>useSelector</del> } from 'react-redux';

const Notification = (props) => {
  <del>const message = useSelector(state=>state.notification)</del>

  if(!props.message){
    return null
  }
  
  return (
    {props.message}
    <del>{message}</del>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)

<del>export default Notification</del>
</pre>

mapDispatchToProps

<pre>
import { <del>useDispatch,</del> connect } from 'react-redux';
import { changeFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  <del>const dispatch = useDispatch()</del>

  const handleChange = (e) => {
    props.changeFilter(e.target.value)
    <del>dispatch(changeFilter(e.target.value))</del>
  }

  return(
    filter: < input onChange={handleChange} />
  )
}

const mapDispatchToProps = {
  changeFilter
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)

<del>export default Filter</del>
</pre>