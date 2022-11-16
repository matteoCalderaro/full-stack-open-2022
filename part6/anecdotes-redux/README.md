## 
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