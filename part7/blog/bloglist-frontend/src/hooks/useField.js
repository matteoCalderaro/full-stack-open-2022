import { useState } from 'react'

const useField = (type) => {
  const [value,setValue] = useState('')

  const changeValue = (e) => {
    setValue(e.target.value)
  }
  const reset = () => {
    setValue('')
  }

  return{
    type: type,
    value:value,
    onChange: changeValue,
    reset:reset
  }

}

export default useField