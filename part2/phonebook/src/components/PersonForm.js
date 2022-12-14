const PersonForm = ({onSubmit, newPerson, changeInput}) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        name: <input name='name' value={newPerson.name} onChange={changeInput}/>
      </div>
      <div>
        phone: <input name='number' value={newPerson.number} onChange={changeInput}/>
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}
export default PersonForm