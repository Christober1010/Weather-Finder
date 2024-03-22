import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import sun from './Assets/sun.png'
// import cloud from './Assets/cloud.png'
// import rain from './Assets/rain.png'
// import snow from './Assets/snow.png'
import thunder from './Assets/thuderstorm.png'
import humidityicon from './Assets/humidity.png'
import windicon from './Assets/wind.png'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';



function App() {
  const [city, setCity] = useState("Chennai")
  const [data, setData] = useState("")
  const [weather, setWeather] = useState("");
  const [icon, setIcon] = useState(sun)

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c036a74e3eaaedd40641366883f90ef&units=metric`
      );
      const data = await response.json();
      setWeather(data);
      // fetchWeather();
    } catch (error) {
      toast.error("No city Found")
      console.error(error);
    }
  };
  const handleSubmit = () => {
    setCity(data)
    fetchWeather();
  }

  useEffect(() => {
    fetchWeather();
  }, [])



  const [isdark, setIsdark] = useState(false)

  return (
    <div className={`container w-50 m-auto ${isdark ? "light text-dark" : "bg-dark text-light"} text-light mt-2 rounded-3`}>
      <div>
        <button className='btn btn-outline-light'
          onClick={() => setIsdark(!isdark)}>
          {isdark ? <i className='fa fa-lightbulb-o'></i> : <i className='fa fa-moon-o'></i>}
        </button>
      </div>
      <div className='header text-center'>
        <p>Weather Finder <i className='fa fa-search'></i> </p>
      </div>
      <div className='d-flex w-50 m-auto'>
        <input className='form-control mx-2' value={data} type='text' placeholder='Chennai' onChange={(event) => setData(event.target.value)} ></input>
        <button className='btn btn-outline-light p-2' onClick={() => handleSubmit()} ><i className='fa fa-search' ></i></button>
      </div>
      <div className='text-center mt-3'>

        <img src={icon} height={'200'}></img>

        <h2 className='title'>
          {weather && weather.name}
        </h2>

        <p>{weather && Math.floor(weather.main.temp)}<sup>0</sup>C</p>
      </div>

      <div className='row text-center mt-3'>
        <div className='lat col-6'>
          <h5>Lattitude</h5>

          <p>{weather && weather.coord.lat.toFixed(2)}</p>
        </div>
        <div className='lon col-6'>
          <h5>Longitude</h5>
          <p>{weather && weather.coord.lon.toFixed(2)}</p>
        </div>
      </div>

      <div className='row text-center mt-3'>
        <div className='side col-6 mt-2'>
          <img src={windicon} height={'50'} />
          <h1>Wind speed</h1>
          <div>{weather && weather.wind.speed} Km/hr</div>
        </div>
        <div className='side col-6'>
          <img src={humidityicon} height={'50'} />
          <h1>Humidty</h1>
          <div>{weather && weather.main.humidity} %</div>
        </div>
      </div>
      <div className='mt-2 text-center'>
        <p>Designed by <b>Christober</b></p>
      </div>
    </div>
  );
}

export default App;
