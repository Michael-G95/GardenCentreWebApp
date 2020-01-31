import React, { useState, useEffect } from 'react'
import Styles from './LookupNow.module.css'
import AjaxService from '../../AjaxService';

import ThermometerImg from '../../res/thermometer.svg'
import TempWeatherImg from '../../res/temporary-weather.png'
import SaveImg from '../../res/save-disk.svg'

const LookupNow = ({ locationMode, location, reloadFavourites }) => {
    // Component to load weather for now
    
    const [weatherData, setWeatherData] = useState(false);

    // Round to 2 dp
    const To2DecimalPlaces = (n)=> Math.round(n * 100) / 100

    useEffect(() => {
        if (locationMode === 2) {
            // City name
            AjaxService.GetWeatherForCity(location)
                .then((response) => {
                    setWeatherData({
                        description: response.data.weather[0].description,
                        temperature: response.data.main.temp,
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            // Co Ords
            AjaxService.GetWeatherForCoOrds(location.coords.longitude,location.coords.latitude)
            .then((response)=>{
                setWeatherData({
                    description: response.data.weather[0].description,
                    temperature: response.data.main.temp,
                })
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }, [location])

    if (!weatherData) {
        return <></>
    }

    const SaveToFavourite=()=>{
        try {
            if (location.coords) {
                console.log(location.coords);
                localStorage.setItem("weather", `{"coords":{"latitude":${location.coords.latitude},"longitude":${location.coords.longitude}}}`)
                reloadFavourites();
            } else {
                console.log(location)
                localStorage.setItem("weather",location)
            }
            
        }
        catch (err) {
            console.log(err)
            alert('Saving is not permitted on your browser!');
        }
    }

    return (
        <>
            <div className={Styles["root"]}>
                <h3>
                    {locationMode === 2 ? `Weather in ${location}` : 'Weather at Your Location'}
                </h3>

                <div className={Styles["container"]}>
                    <div className="weather-info">
                        <img className="weather-icon" id="weather-bfast-info-icon" src={TempWeatherImg}
                            alt="Description" /><span id="weather-bfast-info-text">{weatherData.description}</span>
                    </div>
                    <div className="weather-info">
                        <img className="weather-icon" id="weather-bfast-temp-icon" src={ThermometerImg}
                            alt="Temp" /><span id="weather-bfast-temp-text">{To2DecimalPlaces( weatherData.temperature > 100 ? weatherData.temperature-273.15 : weatherData.temperature)}</span>
                    </div>
                    <div className="weather-info refresh-button" onClick={SaveToFavourite}>
                        <img className="weather-icon" src={SaveImg} alt="Save" /><span
                            id="weather-bfast-reload-text">Save to Favourite</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LookupNow