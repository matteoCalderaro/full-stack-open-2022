import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog,deleteBlog,updateLikes }) => {
  const [visible, setVisible] = useState(false)
  const hidden = { display: visible ? '' : 'none' }

  const blogStyle = {
    background: 'linear-gradient(to right, #CBEDFF 0%, #FFFDF9 95%, #EFFEFF 100%)',
    border: '1px solid gray',
    borderRadius: '5px',
    margin: '5px 0px',
    padding: '5px',
    maxWidth: '280px'
  }
  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const update = (blog) => {
    updateLikes(blog)
  }

  return(
    <div style={blogStyle} className='blog'>
      <div style={itemStyle}>
        <div>
          <div>title: {blog.title}</div>
          <div>author: {blog.author}</div>
        </div>
        <button id='view_button_blog' onClick={() => setVisible(!visible)}>{visible?'hide':'view'}</button>
      </div>
      <div style={hidden} className='togglableContent'>
        <div className='url'>url: {blog.url}</div>
        <div><span className='likes'>likes: {blog.likes}</span><button onClick={() => update(blog)}>add</button></div>
        <div>published: {blog.user.name}</div>
        <button className='button-70' onClick={() => deleteBlog(blog)}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  //updateLikes: PropTypes.func.isRequired,
  //deleteBlog: PropTypes.func.isRequired,
}


export default Blog
