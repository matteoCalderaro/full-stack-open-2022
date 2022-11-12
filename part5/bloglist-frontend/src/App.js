import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notifications from './components/Notifications'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
//import axios from 'axios'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [credentials, setCredentials] = useState({ username : '', password : '' })
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  //in case a token is expired it clears the localstorage
  // useEffect(() => {
  //   async function matteo() {
  //     let userParsed = 0
  //     let userInLocalStorage = window.localStorage.getItem('loggedUser')
  //     if(userInLocalStorage) {
  //       userParsed = JSON.parse(userInLocalStorage)
  //       try {
  //         await axios.post('/api/token','dada', {
  //           headers: { 'Authorization': `bearer ${userParsed.token}` }
  //         })

  //       } catch (error) {
  //         window.localStorage.clear()
  //       }
  //     }
  //   }
  //   matteo()
  // },[])

  useEffect(() => {
    let userInLocalStorage = window.localStorage.getItem('loggedUser')
    if(userInLocalStorage) {
      let userParsed = JSON.parse(userInLocalStorage)

      setUser(userParsed)
      blogService.setToken(userParsed.token)
    }
  },[])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((p,c) => c.likes - p.likes) )
    )
  }, [])

  useEffect(() => {
    let timer = setTimeout(() => setMessage(null),4000)
    return () => clearTimeout(timer)
  },[message])

  const handleLoginForm = ({ name,value }) => {
    setCredentials({ ...credentials, [name] : value })
  }

  const submitLogin = async (event) => {
    event.preventDefault()
    try {
      let returnedValue = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(returnedValue))
      setUser(returnedValue)
      blogService.setToken(returnedValue.token)

    } catch (error) {
      setMessage(error.response.data.error)
    }
  }

  const addNewBlog = async (newBlog) => {
    try {
      let returnedData = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedData))
      console.log(returnedData)
      setMessage(`a new blog '${returnedData.title}' added by ${returnedData.user.name} `)
      blogFormRef.current.toggleVisibility()
    } catch(error) {
      setMessage(error.response.data.error)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      let confirm = window.confirm(`Remove blog '${blog.title}' by '${blog.user.name}'`)
      if(confirm) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id!==blog.id))
        setMessage('blog removed')
      } else return
    } catch (error) {
      setMessage(error.response.data.error)
    }
  }

  const updateLikes = async (blog) => {
    try {
      let returnedData = await blogService.updateLikes(blog)
      setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedData).sort((p,c) => c.likes - p.likes))
    } catch (error) {
      setMessage(error.response.data.error)
    }
  }

  if (user === null) {
    return(
      <div>
        <h2>log in to application</h2>
        <Notifications message={message}/>
        <form onSubmit={submitLogin}>
          <div>
            username
            <input
              type='text'
              name='username'
              value={credentials.username}
              onChange={({ target }) => handleLoginForm(target)}
              id='input_username'
            />
          </div>
          <div>
            password
            <input
              type='password'
              name='password'
              value={credentials.password}
              onChange={({ target }) => handleLoginForm(target)}
              id='input_password'
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const logout = () => {
    window.location.href = 'http://localhost:3000/'
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>

      <h2>blogs</h2>
      <Notifications message={message}/>
      <div>
        {user.name} logged
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonName={'create'} ref={blogFormRef}>
        <BlogForm create={addNewBlog}/>
      </Togglable>

      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} user={user} blog={blog} deleteBlog={deleteBlog} updateLikes={updateLikes} />
        )}
      </div>

    </div>
  )
}

export default App
