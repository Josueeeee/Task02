import { useState, useEffect } from 'react'
import './App.css'
import useWeather from './hooks/useWeather'
import backgrounddata from "../src/Data/backgrounddata.json"
function App() {
  //Lamada del hook
  const { weather ,callapi } = useWeather();
  console.log(callapi)
  console.log(weather)
  //Programando fecha y hora
  const now = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wennesday", "Thursday", "Friday", "Saturday"]
  const weekday = days[now.getDay()]
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octuber", "Nomber", "December"];
  const monthOfTheYear = months[now.getMonth()]


  //Trabajando con la temperatura
  const temp = weather.main?.temp; // Mando a llamar los grados Kelvin
  const celsius = temp - 273.15; // Lo convierto a Centrigrados
  const farenhait = celsius * 1.8 + 32; //  lo convierto a Farenhai
  const [temperature, Settemperature] = useState(true)
  const convert = () => {
    Settemperature(!temperature) //Alterno el resultado con la condicional alternario
  }


  //FONDO DINAMICO SEGUN EL ESTADO DEL CLIMA
  let thebackG = ""
  const climate = weather.weather?.[0].main;

  const backGr = () => {
    //Cree una data para manejar los backgrounds de la card
    if (now.getHours() >= 18) {
      //desde las 6 en adelante se mostrará un background de noche
      thebackG = backgrounddata.BackgroundNigth;
    } else {
      //estos background segun la temperatura
      if (climate == "Clouds") {
        thebackG = backgrounddata.BackgroundSCloud;
      } else {
        if (climate == "Clear") {
          thebackG = backgrounddata.BackgroundSClear;
        } else {
          if (climate == "Rain") {
            thebackG = backgrounddata.BackGroundRain;
          }
        }
      }
    }
    return thebackG;
  }


  
  return (
    <div className="App">
      <div className='card' style={{ backgroundImage: `url(${backGr()}` }} >
        <h2>Weather App°</h2>
        <h1>{temperature ? celsius.toFixed(2) : farenhait.toFixed(2)}° {temperature ? "C" : "F"}</h1>
        <p><b>{weekday}  </b> {monthOfTheYear} {now.getDate()}, {now.getFullYear()}  {now.getHours()}:{now.getMinutes()} {now.getTime}</p>
        <div>
          <img src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" style={{ width: 150 }} />
        </div>
        <div className='footer-card'>
          <button onClick={convert}>{temperature ? "FARENHAITE" : "CELSIUS"} °</button>
          <p>"{weather.weather?.[0].description}"</p>
          <p><i className="fa-solid fa-wind"> </i> <b>Wind-Speed  </b>{weather.wind?.speed} m/s </p>
          <p><i className="fa-solid fa-cloud"></i> <b> Clouds </b>{weather.clouds?.all}%</p>
          <p><i className="fa-solid fa-location-dot"></i> <b>{weather.name}, {weather.sys?.country}</b></p>
        </div>
      </div>
    </div>
  )
}

export default App
