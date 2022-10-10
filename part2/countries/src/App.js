import axios from 'axios'
import { useEffect, useState } from 'react';
import CountriesList from './components/CountriesList'
import Country from './components/Country'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [countriesToShow, setCountriesToShow] = useState([])
  const [countryName, setCountryName] = useState('')

  useEffect(()=> {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setAllCountries(response.data)
    })
  },[])

  const handleInput = (event) => {
    const search= event.target.value
    setCountryName(search)
    if(search){
      setShowAll(false)
    } else {
      setShowAll(true)
    }
    setCountriesToShow(allCountries.filter(country=>country.name.common.toLowerCase().includes(search.toLowerCase())))
  }
  
  const setSingleItem = (singleItem) =>{
    setCountriesToShow((allCountries.filter(country=>country.name.common.toLowerCase() === singleItem.toLowerCase())))
  }
  
  const sort = (array) =>{
    array.sort((a, b) => {
      const nameA = a.name.common.toLowerCase(); 
      const nameB = b.name.common.toLowerCase(); 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }
  sort(countriesToShow)
  sort(allCountries)

  return(
    <div>
      find countries: <input value={countryName} onChange={handleInput} />
      {showAll ? 
      <CountriesList countriesData={allCountries} showAll={showAll}/> 
      :
      countriesToShow.length > 10 ? 
      <div style={{marginTop:20}}>Too many results: {countriesToShow.length}<br/>Make the query more specific</div>
      :
      countriesToShow.length === 1 ?
      <Country countryData={countriesToShow[0]}/>
      :
      countriesToShow.length === 0 ?
      <p>wrong name</p>
      :
      <CountriesList countriesData={countriesToShow} setSingleItem={setSingleItem}/>
      }
    </div>
  )
}
export default App;
