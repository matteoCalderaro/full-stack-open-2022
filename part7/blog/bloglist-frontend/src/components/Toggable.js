import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggable = forwardRef((props,refs) => {
  const [visible, setVisible] = useState(false)

  const hidden = { display: visible ? 'none': '' }
  const displayed = { display: visible ? '': 'none' }

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
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
      </div>
      <div style={displayed}>

        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})
Toggable.displayName = 'Toggable'
export default Toggable