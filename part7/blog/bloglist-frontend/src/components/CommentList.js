import CommentForm from '../components/CommentForm'
import ToggableInputComments from './ToggableInputComments'
import { useRef } from 'react'

const CommentList = ({ blog }) => {
  const inputRef = useRef()

  return(
    <div id='comments' style={{ display: '' }}>
      <div className='commentBox'>
        {blog.comments.map((c) => (
          <div key={c.id}>
            <div className='comment'>
              <div>
                <div style={{ marginBottom:6 }}>comment: {c.text}</div>
                <div style={{ fontSize:14 }}>author: {c.username}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToggableInputComments  ref={inputRef} buttonLabel='add a comment'>
        <CommentForm inputRef={inputRef} blog={blog}/>
      </ToggableInputComments>
    </div>
  )
}

export default CommentList