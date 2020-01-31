import React from 'react';
import Nav from "./Nav/Nav";
import Footer from './Footer/Footer';




// HOF to add the nav and footer to a page content component

export default function withHeaderFooter(WrappedComponent,pageName) {
    return class extends React.Component {
        // No constructor - super(props) by default
        //Check if local storage is enabled

        constructor(props) {
            super(props)
            this.state = { flag: false };
        }
        checkForLocalStorage = () => {
            try {
                var storage = window['localStorage'],
                    x = '__storage_test__';
                storage.setItem(x, x);
                storage.removeItem(x);
                return true;
            }
            catch (e) {
                console.log(e);
                return false;
            }
        }

        render() {

            let plant1 = {};
            let plant2 = {};
            let weather = {};
            let storageEnabled   = true;

            if (this.checkForLocalStorage()) {
                
                plant1 = localStorage.plant1 ? JSON.parse(localStorage.plant1) : {};
                plant2 = localStorage.plant2 ? JSON.parse(localStorage.plant2) : {};
                weather = localStorage.weather ? JSON.parse(localStorage.weather) : {};
            } else {
                storageEnabled = false; // Record that storage is disabled and hide favourites
                console.log("Couldn't access local storage! Please check that it is enabled");
            }


            const getWeatherLink = () => {
                if (!weather) {
                    return "/weather"
                }
                try {
                    // Try to parse into an object - if doesn't work out, assume its a location string
                    if (weather.coords !== undefined) {
                        return `/weather/1/${weather.coords.longitude}/${weather.coords.latitude}`

                    } else {
                        return `/weather/2/${weather}`
                    }
                    
                }
                catch (err) {
                    // Location string
                    return `/weather/${weather}`;
                }
            }
            // Return the component wrapped with nav and footer 
            return (
                <>
                    <Nav page={pageName} plant1={plant1} plant2={plant2} weather={getWeatherLink()} storageEnabled={storageEnabled}/>
                    <WrappedComponent {...this.props} reloadFavourites={() => { this.setState({ flag: this.state.flag ? false : true ,...this.state}); console.log("lambda"); }}/>
                    <Footer />
                </>
            )
        }
    }
}

