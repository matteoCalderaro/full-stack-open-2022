import Person from "./Person"

const Persons = ({personsToShow}) => {
  return(
    personsToShow.map(p=>
      <div key={p.name}>
        <Person name={p.name} phone={p.phone}/>
      </div>
      )
  )
}
export default Persons