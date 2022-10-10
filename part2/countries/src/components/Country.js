import Weather from "./Weather";
const Country = ({countryData}) => {
 
  return(
    <>
      <h1>{countryData.name.common}</h1>
      <div>capital: {countryData.capital[0]}</div>
      <div>area: {countryData.area}</div>
      <h3>languages: </h3>
      <ul>{Object.values(countryData.languages).map((value,i)=><li key={i}>{value}</li>)}</ul>
      <img  style={{width:200}} src={countryData.flags.png} alt={`${countryData.name.common} flag`}/>
      <Weather city={countryData.capital[0]}/>
    </>
  )
}
export default Country