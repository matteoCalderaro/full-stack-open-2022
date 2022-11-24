import commentService from '../services/comments'
import { setMessage } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import useField from './../hooks/useField'

const CommentForm = ({ inputRef,blog }) => {
  const { reset:resetComment,...comment } = useField('text')
  const dispatch = useDispatch()

  const submitComment = async (e) => {
    e.preventDefault()

    let newComment = {
      id: blog.id,
      text: comment.value,
    }
    try {
      await commentService.addComment(newComment)
      dispatch(initializeBlogs())
      dispatch(setMessage('comment added',5000))
      resetComment()
      inputRef.current.toggleVisibility()
    } catch (error) {
      dispatch(setMessage(error.response.data.error,5000))
    }
  }

  return(
    <form onSubmit={submitComment}>
      <input {...comment}/>
      <button className='button-70'>submit</button>
    </form>
  )
}
export default CommentForm