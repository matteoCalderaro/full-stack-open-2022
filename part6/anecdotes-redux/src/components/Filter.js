import { useDispatch, connect } from 'react-redux';
import { changeFilter } from '../reducers/filterReducer';

const style = {
  marginBottom: 10
}

const Filter = (props) => {
  //const dispatch = useDispatch()

  const handleChange = (e) => {
    props.changeFilter(e.target.value)
    // dispatch(changeFilter(e.target.value))
  }

  return(
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  changeFilter
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)

// export default Filter