import { useState, useEffect } from 'react';
import axios from 'axios'

const Weather = ({city}) => {
  const OPENWEATHER_API_KEY = process.env.REACT_APP_API_KEY;
  const [data,setData] = useState([])

  useEffect(()=>{
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`)
    .then(response=> setData(response.data))
  },[])

  return(
    <>
      {data.main ?
        <div>
          <h2>Weather in {city}</h2>
          <div>
              Temperature: {data.main.temp} °C
          </div>
          <div style={{display:'flex',alignItems:'center'}}>
          <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='weather icon'/>
          <div>{data.weather[0].description}</div>
          </div>
          <div>Wind {data.wind.speed} m/s</div>
        </div>
      : null
      }
    </>
  )
}
export default Weather 