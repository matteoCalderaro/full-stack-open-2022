const SearchFilter = ({changeFilter}) => {
  return(
    <p>
      filter shown with <input onChange={changeFilter}/>
    </p>
  )
}

export default SearchFilter