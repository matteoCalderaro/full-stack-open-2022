import { useDispatch } from 'react-redux';
import { changeFilter } from '../reducers/filterReducer';

const style = {
  marginBottom: 10
}

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value))
  }

  return(
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter