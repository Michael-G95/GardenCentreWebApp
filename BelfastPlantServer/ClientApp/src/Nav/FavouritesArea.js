import React from 'react'

import FavouritesStar from '../res/favourites-star.png'
import {Link} from 'react-router-dom'

const FavouritesArea = ({plant1, plant2,weather,storageEnabled}) => {
    return (
        <>
            {

                storageEnabled ? (
                    <div className="right">
                        <img src={FavouritesStar} alt="Favourites" onClick={() => localStorage.clear()} />
                        <Link to={plant1.data ? `/plants/id/${plant1.data}` : "/plants"}>
                            <div className="nav-item">
                                <span>{plant1.name ? plant1.name : "Favourite Plant"}</span>
                            </div>
                        </Link >
                        <Link to={plant2.data ? `/plants/id/${plant2.data}` : "/plants"}>
                            <div className="nav-item">
                                <span>{plant2.name ? plant2.name : "Favourite Plant"}</span>
                            </div>
                        </Link >
                        <Link to={weather}>
                            <div className="nav-item">
                                <span>Favourite Weather Location</span>
                            </div>
                        </Link >

                    </div>
                )
                    : <></>
            }
        </>
    )
}

export default FavouritesArea