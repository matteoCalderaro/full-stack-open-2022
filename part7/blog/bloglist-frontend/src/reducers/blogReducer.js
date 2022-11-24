import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'
import { setMessage } from './notificationReducer'
import { initializeUsers } from './userReducer'


const blogReducer = createSlice({
  name:'blogs',
  initialState: [],
  reducers: {
    setBlogs(state,action){
      return action.payload
    },
    addBlog(state,action){
      return [...state,action.payload]
    },
    removeBlog(state,action){
      return state.filter(blog => blog.id !== action.payload)
    },
    updateBlog(state,action){
      const blogToUpdate = state.find(b => b.id === action.payload)
      return state.map(b => b.id === action.payload ? blogToUpdate : b)
    }
  }
})

export const { setBlogs,addBlog,removeBlog,updateBlog,updateBlogWithComments } = blogReducer.actions


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    return dispatch(setBlogs(blogs))
  }
}

export const createBlog =  (newBlog) => {
  return async (dispatch) => {
    try {
      let returnedData = await blogService.create(newBlog)
      dispatch(addBlog(returnedData))
      dispatch(initializeUsers())
      dispatch(setMessage(`a new blog '${returnedData.title}' by ${returnedData.user.name} added`,5000))
    } catch(error) {
      dispatch(setMessage(error.response.data.error,5000))
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      let confirm = window.confirm(`Remove blog '${blog.title}' by '${blog.user.name}'`)
      if(confirm) {
        await blogService.remove(blog.id)
        dispatch(removeBlog(blog.id))
        dispatch(setMessage('blog removed',5000))
        dispatch(initializeUsers())
      } else return
    } catch (error) {
      dispatch(setMessage(error.response.data.error,5000))
    }
  }
}

export const voteBlog = (id) => {
  return async (dispatch) => {
    try {
      let returnedData = await blogService.updateLikes(id)
      dispatch(updateBlog(returnedData.data))
      dispatch(initializeBlogs())
    } catch (error) {
      dispatch(setMessage(error.response.data.error,5000))
    }
  }
}

export default blogReducer.reducer





