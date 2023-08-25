import React, { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';
const Home = () => {
  const [data,setData]= useState({
    celcius: 10,
    name:"London",
    humidity: 10,
    speed: 2,
    image: "/images/1clouds-.png",
    weather: " ",
    min: "5",
    max: "15"
  })
  const [name,setName] = useState('')
  const [error,setError] = useState('')

  const handleClick= ()=>{
    if (name !== ""){
      const apiurl= `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=5685dc0855e894c0358a1b9bad8d40d7&units=metric`
    axios.get(apiurl)
    .then(res => {
      let imagePath = '';
      console.log(res.data);
      if(res.data.weather[0].main == "Clouds"){
        imagePath= "/images/1clouds-.png"
      }else if(res.data.weather[0].main == "Clear"){
        imagePath= "/images/clear.png"
      }
      else if(res.data.weather[0].main == "Rain"){
        imagePath= "/images/rain.png"
      }
      else if(res.data.weather[0].main == "Drizzle"){
        imagePath= "/images/drizzle.png"
      }
      else if(res.data.weather[0].main == "Mist"){
        imagePath= "/images/mist.png"
      }
      else{
        imagePath = '/images/1cloud-.png'
      }


      setData({...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagePath, weather: res.data.weather[0].description,min: res.data.main.temp_min,max: res.data.main.temp_max})
      setError("");
    })
    .catch(err =>{ 
      if(err.response.status == 404){
        setError("Invalid city Name")
      }
     });
    }
    else{
      setError("");
    }
    
  }
  return (
    <div className='container'>
      <div className='weather'>
<div className='search'>
<input type='text' placeholder='Enter city name' onChange={e => setName(e.target.value)
} onKeyDown={e => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }}/>
<button> <img src='/IMG//search.png' alt=''
 onClick={handleClick}
 /> </button>
</div>
<div className='error'>
  <p>{error}</p>
</div>
<div className='winfo'>
  <img src={data.image} alt='' className='weatherimg'/>
  <p>{data.weather}</p>
  <h1>{ Math.round(data.celcius)}°C</h1>
  <h2>{data.name}</h2>
  <p> min⬇ { Math.round (data.min)}°C &nbsp; &nbsp; max↑ { Math.round (data.max)}°C </p>
  <div className='details'>
    <div className='col'>
      <img src='/images//Humidity1.png' alt=''/>
      <div> <p>{Math.round (data.humidity)}%</p> 
      <p>Humidity</p>
      </div>
    </div>
    <div className='col'>
    <img src='/images/windnew.png' alt=''/>
      <div> <p> { Math.round (data.speed)} km/hr</p> 
      <p>wind</p>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  )
}

export default Home
