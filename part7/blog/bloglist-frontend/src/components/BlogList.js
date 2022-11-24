import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Toggable from './ToggableInputComments'
import BlogForm from './BlogForm'
import { useRef } from 'react'
import BlogPreview from '../components/BlogPrewiev'


const BlogList = () => {

  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()

  return(
    <>
      <h2>blogs...</h2>
      <Toggable ref={blogFormRef} buttonLabel='create'>
        <BlogForm blogFormRef={blogFormRef}/>
      </Toggable>
      {blogs && (
        blogs.map(blog =>
          <Link
            to={`blogs/${blog.id}`}
            key={blog.id} style={{ textDecoration: 'none' }}
          > { <BlogPreview blog={blog}/> }
          </Link>
        )
      )}
    </>
  )
}



export default BlogList