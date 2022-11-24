import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, voteBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import CommentList from './CommentList'


const Blog = () => {
  const navigate = useNavigate()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)


  const dispatch = useDispatch()

  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const vote = (blog) => {
    dispatch(voteBlog(blog.id))
  }

  const removeBlog = (blog) => {
    dispatch(deleteBlog(blog))
    navigate('/')
  }

  const displayComments = (target) => {
    let next = document.getElementById('comments')
    next.style.display = next.style.display === 'none' ? '' : 'none'
    if(target.innerHTML === 'view comments' ){
      target.innerHTML = 'hide comments'
    } else {target.innerHTML = 'view comments'}
  }


  return(

    <>
      {blog && (
        <>
          <h2>blog</h2>
          <div className='blogStyle'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight:'bold',fontSize:20,marginBottom:10 }}>{blog.title}</span>
            </div>
            <div style={{ display: '' }}>
              <>
                <div style={{ marginBottom:'20px' }}>text: {blog.text}</div>

                <div><span>likes: {blog.likes}</span><button onClick={() => vote(blog)}>add</button></div>
                <div style={{ fontSize:14 }}>published: {blog.user.name}</div>
                <div style={{ position:'relative',padding:12 }}>
                  {blog.user.name === user && (
                    <button style={{ position:'absolute',left:0, bottom: 0 }} className='button-70' onClick={() => removeBlog(blog)}>remove</button>
                  )}
                  {blog.comments.length !== 0 && (
                    <button style={{ position:'absolute',right: 0,bottom: 0 }} className='button-70' onClick={({ target }) => displayComments(target)}>hide comments</button>
                  )}

                </div>
              </>
            </div>
          </div>

          <CommentList blog={blog} />
        </>
      )}
    </>

  )
}

export default Blog
