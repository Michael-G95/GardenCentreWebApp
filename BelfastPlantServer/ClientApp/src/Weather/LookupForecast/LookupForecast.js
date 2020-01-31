import React, { useState, useEffect } from 'react'
import Styles from './LookupForecast.module.css'
import AjaxService from '../../AjaxService';

import ThermometerImg from '../../res/thermometer.svg'
import TempWeatherImg from '../../res/temporary-weather.png'
import SaveImg from '../../res/save-disk.svg'

const LookupForecast = ({ locationMode, location, reloadFavourites }) => {
    // Component to load a forecast weather
    const [weatherData, setWeatherData] = useState(false);
    // Round to 2 dp
    const To2DecimalPlaces = (n) => Math.round(n * 100) / 100

    useEffect(() => {
        console.log("EFFECT");
        if (locationMode === 2) {
            // City name
            AjaxService.GetWeatherForCityForecast(location)
                .then((response) => {
                    setWeatherData(
                        response.data
                    )
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            // Co Ords
            AjaxService.GetWeatherForCoOrdsForecast(location.coords.longitude, location.coords.latitude)
                .then((response) => {
                    setWeatherData(
                        response.data
                    )
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [location])

    if (!weatherData) {
        return <></>
    }

    const SaveToFavourite = () => {
        try {
            console.log(location.coords);
            localStorage.setItem("weather", `{"coords":{"latitude":${location.coords.latitude},"longitude":${location.coords.longitude}}}`)
            reloadFavourites();
        }
        catch (err) {
            alert('Saving is not permitted on your browser!');
        }
    }

    let weatherView = weatherData.list.map((data,index) => {
        const date = new Date(data.dt*1000)
        console.log(date.toDateString())
        const dateStr = `${date.getDate()}/${date.getMonth()+1} ${date.getHours()}:${date.getMinutes()}` 
        
        return (    
            <div className={Styles["container"]} key={index}>
                <div className="weather-info">
                   Time: {dateStr}
                </div>
                <div className="weather-info">
                    <img className="weather-icon" id="weather-bfast-info-icon" src={TempWeatherImg}
                        alt="Description" /><span id="weather-bfast-info-text">{data.weather[0].description}</span>
                </div>
                <div className="weather-info">
                    <img className="weather-icon" id="weather-bfast-temp-icon" src={ThermometerImg}
                        alt="Temp" /><span id="weather-bfast-temp-text">{To2DecimalPlaces(data.main.temp > 100 ? data.main.temp - 273.15 : data.main.temp)}</span>
                </div>
                
            </div>
        )
    });

    return (
        <>
            <div className={Styles["root"]}>
                <h3>
                    {locationMode === 2 ? `Weather in ${location}` : 'Weather at Your Location'}
                </h3>
                <div className={Styles["forecast-row"]}>
                    {weatherView}
                </div>
                <div className="weather-info refresh-button" onClick={SaveToFavourite}>
                    <img className="weather-icon" src={SaveImg} alt="Save" /><span
                        id="weather-bfast-reload-text">Save to Favourite</span>
                </div>
            </div>
        </>
    )
}

export default LookupForecast