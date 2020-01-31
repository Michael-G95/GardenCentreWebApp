import React from 'react'
import {Link} from 'react-router-dom'

const LinksArea = ({UrlLink,page}) => {
    // Component to generate the site links area
    return (
        <div className="left">
            <img src={UrlLink} alt="Links" />
            <Link to="/home">
                <div className={page === "home" ? "nav-item nav-item-current" : "nav-item"}>
                    <span>Home</span>
                </div>
            </Link >
            <Link to="/weather">
                <div className={page === "weather" ? "nav-item nav-item-current" : "nav-item"}>
                    <span>Weather</span>
                </div>
            </Link >
            <Link to="/plants">
                <div className={page === "plants" ? "nav-item nav-item-current" : "nav-item"}>
                    <span>Plants</span>
                </div>
            </Link >
        </div>
    )
}

export default LinksArea