import React, { useState, useEffect } from 'react'
import withHeaderFooter from '../WithHeaderFooter'
import Styles from './Weather.module.css'
import useField from '../useField/useField';
import LookupForecast from './LookupForecast/LookupForecast';
import LookupNow from './LookupNow/LookupNow';
import { useParams } from 'react-router-dom';
const Weather = ({reloadFavourites})=>{
    // Component to display a weather info page to user

    let {mode,loc,latLoc} = useParams();
    let locationParam = null;

    // Check to see if have gotten a co ord, string (name) or nothing. If nothing locationParam remains null
    if(loc && !latLoc){
        locationParam=loc;
    }else if (loc && latLoc){
        locationParam = {coords:{
            latitude:latLoc,
            longitude:loc
        }}
    }


    const [forecastMode,setForecastMode]=useState(0);
    const cityNameInput=useField();

    // Checking for URL params and setting default values if they are not passed in (from favourite)
    const [location, setLocation] = useState({ mode: mode ? Number(mode) : 0, data: locationParam ? locationParam : "" });

    // Function to set location state if the user has entered valid input
    const doneEnteringName = ()=>{
        if(cityNameInput.valid){
            setLocation({ mode: 2, data: cityNameInput.value });
        }else{
            alert('Please enter something to search for in city name!')
        }
    }

    // Function to load location from browser API
    const getCoOrdLocation = ()=>{
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
          } else {
            navigator.geolocation.getCurrentPosition(
                (result)=>{
                    setLocation({ mode: 1, data: result });
                    
                }, 
                (err)=>alert("Unable to get the geolocation from your browser. Please try entering a city name instead"));
          }
    }

    // function to load appropriate component dependant on mode
    const renderWeather=()=>{
        if(location.mode !==0){
            if(forecastMode===0){
                return <LookupNow locationMode={location.mode} location={location.data} reloadFavourites={reloadFavourites}/>
            } else if (forecastMode === 1) {
                return <LookupForecast locationMode={location.mode} location={location.data} reloadFavourites={reloadFavourites} />
            }
        }else{
            return <></>
        }
        
    }

    return (
    <>
        <div className={Styles["root"]}>
            <h2>
                Weather Information
            </h2>
            <div className={Styles["container"]}>
                <div className={Styles["input-area"]}>
                    <h3>
                        Choose Weather Lookup Mode
                    </h3>
                    <section className={Styles["container"]}>
                        <div onClick={()=>setForecastMode(0)}
                            className={[Styles["button"],forecastMode===0?Styles["selected-button"]:""].join(' ')}>
                            <span>Now</span>
                        </div>
                        <div onClick={()=>setForecastMode(1)}
                            className={[Styles["button"],forecastMode===1?Styles["selected-button"]:""].join(' ')}>
                            <span>Forecast</span>
                        </div>
                    </section>
                    <section>
                        <h3>
                            Use My Location
                        </h3>
                        <div className={[Styles["button"],Styles["geo-button"]].join(' ')}
                            onClick={getCoOrdLocation}  
                        >
                            <span>Click to locate</span>
                        </div>
                    </section>

                    <section>
                        <h3>Enter a City Name</h3>
                        <div className={Styles["input-group"]}>
                            <span>Name</span>
                            <input type="text" value={cityNameInput.value} onChange={cityNameInput.onChangeEventHandler}/>
                            <div className={[Styles["button"],Styles["geo-button"]].join(' ')}
                                onClick={doneEnteringName}
                                >
                                <span>Go</span>
                            </div>
                        </div>
                    </section>
                </div>

                <aside>
                    {renderWeather()}
                </aside>
            </div>
            
            
        </div>
    </>
    )
}

export default withHeaderFooter(Weather,'weather');