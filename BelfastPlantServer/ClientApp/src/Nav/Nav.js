import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

// Resources imports
import HeaderImage from '../res/header-logo.png';
import UrlLink from '../res/url-link.png';

import LinksArea from './LinksArea';
import FavouritesArea from './FavouritesArea';

// Component to render the header and navigation areas common to all pages
const Nav = ({ page, plant1, plant2,weather,storageEnabled }) => {
    
    return (
        <>
            <header>
                <img src={HeaderImage} alt="" />
            </header>
            <nav>
                <LinksArea UrlLink={UrlLink} page={page}/>
                <FavouritesArea plant1={plant1} plant2={plant2} weather={weather} storageEnabled={storageEnabled}/>
            </nav>
        </>
    )
}

export default Nav