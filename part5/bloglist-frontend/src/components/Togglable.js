import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props,refs) => {
  const [visible, setVisible] = useState(false)

  const hidden = { display: visible ? 'none': '' }
  const displayed = { display: visible ? '': 'none', marginBottom:'20px' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(refs,() => {
    return { toggleVisibility }
  })
  return(
    <div>
      <div style={hidden}>
        <div>
          <button onClick={toggleVisibility}>{props.buttonName}</button>
        </div>
      </div>
      <div style={displayed}>

        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})
Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonName: PropTypes.string.isRequired,
}

export default Togglable