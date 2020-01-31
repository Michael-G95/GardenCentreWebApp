import axios from 'axios';
import {TREFLE_SECRET} from './secrets';

/**
 * Component to manage AJAX Calls to 3rd party APIs and twitter endpoint
 */
const GetLastTweet = () => {
    return axios.get(
        "https://localhost:44312/api/Twitter/GetTweet"
    )
}

const GetWeatherForCity = (city) => {
    // Function to get weather for now, for a city name

    if (!city) {
        // City name required param
        return null;
    }

    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9d04104eab78795b58404629d377b5a7`);
}

const GetWeatherForCoOrds=(long,lat)=>{
    if(!long || !lat){
        return null;
    }
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9d04104eab78795b58404629d377b5a7`)
}

const GetWeatherForCityForecast = (city) => {
    // Function to get weather for now, for a city name

    if (!city) {
        // City name required param
        return null;
    }

    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9d04104eab78795b58404629d377b5a7`);
}

const GetWeatherForCoOrdsForecast=(long,lat)=>{
    if(!long || !lat){
        return null;
    }

    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=9d04104eab78795b58404629d377b5a7`)
}

const GetSinglePlantPage = async (page) => {
    return (axios.get(`https://trefle.io/api/plants/?token=${await TREFLE_SECRET()}&complete_data=true&page_size=1&page=${page}`)
    )



}

const GetSinglePlant = async (id) => {
    //return axios.get(`https://trefle.io/api/plants/${id}?token=${await TREFLE_SECRET()}`);
    
    return axios.get(`https://trefle.io/api/plants/${id}?token=${await TREFLE_SECRET()}`, {})

}

const SearchPlantByName = async (name) => {
    try {
        return (axios.get(`https://trefle.io/api/plants?token=${await TREFLE_SECRET()}&q=${name}&complete_data=true`)
        )
    }
    catch (err) {
        // Error
        console.log(err);
        return null;
    }
}

const AjaxService = {
    GetWeatherForCity, GetSinglePlantPage, GetSinglePlant, SearchPlantByName, GetWeatherForCoOrds, GetWeatherForCityForecast, GetWeatherForCoOrdsForecast, GetLastTweet
}

export default AjaxService;
