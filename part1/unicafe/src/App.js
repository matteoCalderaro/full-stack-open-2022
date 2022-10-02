import { useState } from 'react'

const style = {
  border:'1px solid #dddddd'
}
const Button = (props) => {
    return(
        <button onClick={props.onClick}>{props.text}</button>
    )
}
const StatisticLine = ({text,value}) =>{
  return(
    <tr>
      <td style={style}>{text}</td>
      <td style={style}>{value}</td>
    </tr>
  )
}
const Statistic = ({good, neutral, bad}) => {
  const round = (num)=>{
    return Math.round((num + Number.EPSILON) * 100) / 100
  }
  const all = good + neutral + bad
  const average = round((good-bad)/all)
  const percentageOfPositive = round((good/all)*100)
  
  if(all===0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <>
    <table>
      <tbody>
        <StatisticLine text='good:' value={good} />
        <StatisticLine text='neutral:' value={neutral} />
        <StatisticLine text='bad:' value={bad} />
        <StatisticLine text='all:' value={all} />
        <StatisticLine text='average:' value={average} />
        <StatisticLine text='positive:' value={`${percentageOfPositive}%`} />
      </tbody>
    </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={()=>setGood(good+1)} text='good'/>
      <Button onClick={()=>setNeutral(neutral+1)} text='neutral'/>
      <Button onClick={()=>setBad(bad+1)} text='bad'/>
      <h2>statistic</h2>
      <Statistic good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App