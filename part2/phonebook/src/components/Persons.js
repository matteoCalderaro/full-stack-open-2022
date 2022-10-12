import Person from "./Person"

const Persons = ({personsToShow, remove}) => {
  return(
    personsToShow.map(p=>
      <div key={p.name}>
        <Person name={p.name} number={p.number} remove={()=>remove(p.id,p.name)}/>
      </div>
      )
  )
}
export default Persons