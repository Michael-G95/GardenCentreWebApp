import React, { useState, useEffect } from 'react'
import withHeaderFooter from '../WithHeaderFooter';
import LastTweet from './Tweet'


// Resources imports
import ThermometerImg from '../res/thermometer.svg'
import RefreshImg from '../res/refresh.svg'
import TempWeatherImg from '../res/temporary-weather.png'
import AjaxService from '../AjaxService';



import AddPlantToFavourites from './AddPlantToFavourites'
import No_Image from '../res/no_image.png'

const Home = ({ reloadFavourites}) => {
    
    // State to hold weather info
    const [weatherState, setWeatherState] = useState({
        description: null,
        temperature: null,
        lastUpdate: null
    });

    // State to hold plant info
    const [plantState, setPlantState] = useState({
        cname:null,
        sciname:null,
        genus:null,
        bloomPeriod:null,
        lifespan:null,
        photo:null,
        id:null
    });
    // Function to round to 2 decimal places
    const To2DecimalPlaces = (n)=> Math.round(n * 100) / 100

    // Function to load the weather from API and update state
    const updateWeather = ()=>{
        AjaxService.GetWeatherForCity("Belfast,uk")
        .then((response)=>{

            const now = new Date();

            // Function to modify 1 to 01 etc for time formatting, so 13:1 (1 sec) is 13:01 
            const To2Places = (n)=> {if(n>=0 && n<10) return "0"+n; else return n;}

            

            // Compose time string hh:mm
            const nowStr = `${To2Places(now.getHours())}:${To2Places(now.getMinutes())}`;

            // Update state to render the data to page
            setWeatherState({
                description:response.data.weather[0].description,
                temperature:response.data.main.temp,
                lastUpdate:"Last Updated: "+ nowStr
            });
        })
        .catch((error)=>{
            console.log(error.message);
            // Set state to indicate failure
            setWeatherState({
                description:"Unable to load weather",
                temperature:"-",
                lastUpdate:"Last Update failed"
            });
        })
    };

    // Effect to load weather only once on component load
    useEffect(()=>{
        updateWeather();
    },[])

    // Effect to load the random plant 
    useEffect(()=>{
        
        // Random number page index (page size 1) pulled from api to get random plant
        const randomPlant = Math.floor(Math.random() * 1000);
        // Get random page with 1 plant on it
        AjaxService.GetSinglePlantPage(randomPlant)
        .then((response)=>{
            // Get the plant for id 
            return AjaxService.GetSinglePlant(response.data[0].id);
        })
        .then((response)=>{
            // Update the state with retrieved data
            setPlantState({
                cname:response.data.common_name,
                sciname:response.data.scientific_name,
                genus:response.data.genus.name,
                bloomPeriod:response.data.main_species.seed.bloom_period,
                lifespan:response.data.main_species.specifications.lifespan,
                photo:response.data.images[0] ? response.data.images[0].url : null,
                id:response.data.id
            })
        })
        .catch((error)=>{
            // Unable to complete the retrieval of a random plant
            console.log(error);
            // Update plant state so name conveys the error
            setPlantState({cname:'Unable to get a random plant for now!',...plantState});
        })
    },[])

 


    
    // page html
    return (
        <>
            <section className="main-section">
                <div className="left">

                    <h2>
                        About Belfast Plant
                    </h2>

                    <p>
                        Belfast Plant is one of the best up-and-coming Garden Centres in Northern Ireland.<br />
                        <br />
                        We provide a wide range of plant products for your home, from simple indoor decoratative plants to grow-your-own vegetable kits.<br/>
                        We can offer help and support for gardeners of any level, who need advice to solve any issues with their plants<br />
                        On our website, we now have a Plants Information area where you can view important information about plants you own or may be considering buying!<br />

                        <br />
                        If you have any queries or would like to hear more about what we have to offer, why not call down and see us!
        
            </p>
                </div>
                <aside className="right">

                    <h3>
                        Weather in Belfast
            </h3>
                    <div className="weather-info">
                        <img className="weather-icon" id="weather-bfast-info-icon" src={TempWeatherImg}
                            alt="Weather Description" /><span id="weather-bfast-info-text">{weatherState.description}</span>
                    </div>
                    <div className="weather-info">
                        <img className="weather-icon" id="weather-bfast-temp-icon" src={ThermometerImg}
                            alt="Temperature" /><span id="weather-bfast-temp-text">{To2DecimalPlaces( weatherState.temperature > 100 ? weatherState.temperature-273.15 : weatherState.temperature)}</span>
                    </div>

                    <div className="weather-info refresh-button" onClick={updateWeather}>
                        <img className="weather-icon" src={RefreshImg} alt="Reload weather" /><span
                            id="weather-bfast-reload-text">Reload<br />{weatherState.lastUpdate}</span>
                    </div>
                </aside>
            </section>

            <section className="main-section">
                
                <section className="secondary-section left">
                    <h2>
                        Random Plant : Did you know?
                    </h2>
                    <h3 id="plant-cname">
                        {plantState.cname}
                    </h3>
                    <div>
                        <img src={plantState.photo || No_Image} alt="No Photo Found" id="plant-photo" />
                        <div className="plant-data-list-area">
                            <ul className="plant-data-list">
                                <li>
                                    Scientific Name:&nbsp;<span id="plant-sciname">{plantState.sciname}</span>
                                </li>
                                <li >
                                    Genus:&nbsp;<span id="plant-genus">{plantState.genus}</span>
                                </li >
                                <li>
                                    Seed Bloom Period:&nbsp;<span id="plant-bloom">{plantState.bloomPeriod} </span>
                                </li>
                                <li>
                                    Lifespan:&nbsp;<span id="plant-lifespan">{plantState.lifespan} </span>
                                </li>
                                <li>
                                    <button type="button" className="plant-add-fav" onClick={() => AddPlantToFavourites(plantState, reloadFavourites)}>Add To Favourites</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="right">
                    <LastTweet />
                </section>
            </section>
        </>
    )
}

// Add the header/footer to component to make it a page
export default withHeaderFooter(Home,"home");