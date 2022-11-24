import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggable = forwardRef((props,refs) => {
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
        <div style={{ display:'flex' }}>
          <span style={{ marginRight:'auto',textDecoration: 'underline' }} onClick={toggleVisibility}>{props.buttonLabel}</span>
        </div>
      </div>
      <div style={displayed}>

        {props.children}
        <div style={{ display:'flex' }}>
          <span style={{ marginRight:'auto',textDecoration: 'underline' }} onClick={toggleVisibility}>cancel</span>
        </div>
      </div>
    </div>
  )
})
Toggable.displayName = 'Toggable'
export default Toggable