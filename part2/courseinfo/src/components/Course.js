const Header = ({name}) => <h2>{name}</h2>
   
const Total = ({parts}) => {
	const totalExercises = parts.map(p=>p.exercises).reduce((p,c)=>p+c,0)
	return <div style={{fontWeight:'bold'}}>total of {totalExercises} exercises</div>
	}

const Part = ({part}) => <p>{part.name} {part.exercises}</p>
  
const Content = ({parts}) => {
  return(
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}
  
const Course = ({course}) => {
  return(
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course