import React, { useEffect, useState } from 'react';
import axios from 'axios'


const useWeather = () => {
    const [ weather, setWeather] = useState({})

    useEffect( function weatherapi(){
        const success = pos =>{
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0e5f4f7e6860e8f9b22b1698ab1a2e90`)
            .then(res => setWeather(res.data)
            )
        }
        navigator.geolocation.getCurrentPosition(success);
    }, [])

 
    return{ weather }
  
};

export default useWeather;