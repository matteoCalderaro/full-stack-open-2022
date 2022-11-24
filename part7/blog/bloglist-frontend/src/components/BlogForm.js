import { useDispatch } from 'react-redux'
import { createBlog } from './../reducers/blogReducer'
import useField from './../hooks/useField'


const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()

  const { reset:resetTitle,...title } = useField('text')
  const { reset:resetText,...text } = useField('text')

  const submitNewBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: title.value,
      text: text.value
    }

    dispatch(createBlog(newBlog))

    resetTitle()
    resetText()
  }

  return(
    <div>
      <h2 style={{ marginBottom:0 }}>create new</h2>
      <form onSubmit={submitNewBlog} className='blogFormStyle'>
        <div>
          <div>
            title
            <input
              type='text'
              {...title}
              style={{ width:'220px' }}
            />
          </div>
          <div style={{ marginTop:'5px' }}>
            text
            <input
              {...text}
              style={{ width:'220px' }}
            />
          </div>
        </div>


        <button type='submit'>newBlog</button>

      </form>
    </div>
  )
}

export default BlogForm