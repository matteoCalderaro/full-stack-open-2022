import { useState } from 'react'
const blogStyle = {
  //backgroundColor: '#eee8e8',
  border: '1px solid gray',
  borderRadius: '5px',
  margin: '5px 0px',
  padding: '5px',
  maxWidth: '280px'
}

const BlogForm = ({ create }) => {
  const [newBlog, setNewBlog] = useState({ title:'',author:'',url:'' })

  const handleBlogForm = ({ name, value }) => {
    setNewBlog({ ...newBlog,[name]:value })
  }

  const submitNewBlog = (event) => {
    event.preventDefault()
    create(newBlog)
    setNewBlog({ title:'',author:'',url:'' })
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={submitNewBlog} style={blogStyle}>
        <div>
          title
          <input
            id='test'
            type='text'
            name='title'
            value={newBlog.title}
            onChange={({ target }) => handleBlogForm(target)}
            placeholder='write title here...'
          />
        </div>
        <div>
          author
          <input
            type='text'
            name='author'
            value={newBlog.author}
            onChange={({ target }) => handleBlogForm(target)}
          />
        </div>
        <div>
          url
          <input
            type='text'
            name='url'
            value={newBlog.url}
            onChange={({ target }) => handleBlogForm(target)}
          />
        </div>
        <button type='submit'>newBlog</button>
      </form>
    </div>
  )
}

export default BlogForm