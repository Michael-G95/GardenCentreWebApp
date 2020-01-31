import React, { useState, useEffect } from 'react'
import AjaxService from '../AjaxService';
import { useParams, Redirect } from 'react-router-dom';
import '../index.css' 
import './PlantsView.css'
import withHeaderFooter from '../WithHeaderFooter';

import No_Image from '../res/no_image.png'
import AddPlantToFavourites from '../Home/AddPlantToFavourites';
const PlantsView = ({ reloadFavourites }) => {

    // Component to display plant information

    const { id } = useParams();
    const [plantData, setPlantData] = useState(false);
    const [error, setError] = useState(false);
    

    console.log(plantData);
    // Get the plant data and read into state
    useEffect(() => {
        AjaxService.GetSinglePlant(id)
            .then((response) => {
                console.log(response.data.images.length < 1);
                setPlantData({
                    cname: response.data.common_name,
                    sciname: response.data.scientific_name,
                    genus: response.data.genus.name,
                    bloomPeriod: response.data.main_species.seed.bloom_period,
                    lifespan: response.data.main_species.specifications.lifespan,
                    photo: response.data.images.length > 0 ? response.data.images[0].url : null,
                    id: response.data.id
                })
            })
            .catch((err) => {
                console.log(err);
                setError(true);
            })

    }, [id])

    // No or falsy ID passed via url param - can't look up a plant with this so return to homepage
    if (!id) {
        return <Redirect to='/' />
    }
    // Awaiting data
    if (!plantData) {
        return <p>Loading...</p>
    }
    // Error getting plant
    if (error) {
        return <Redirect to="/" />
    }

    return (
        <>
            <section className="secondary-section">
                <h2 id="plant-cname">
                    {plantData.cname}
                </h2>
                <div>
                    <img src={plantData.photo || No_Image} alt="No Photo Found" id="plant-photo" />
                    <div className="plant-data-list-area">
                        <ul className="plant-data-list">
                            <li>
                                Scientific Name:&nbsp;<span id="plant-sciname">{plantData.sciname}</span>
                            </li>
                            <li >
                                Genus:&nbsp;<span id="plant-genus">{plantData.genus}</span>
                            </li >
                            <li>
                                Seed Bloom Period:&nbsp;<span id="plant-bloom">{plantData.bloomPeriod} </span>
                            </li>
                            <li>
                                Lifespan:&nbsp;<span id="plant-lifespan">{plantData.lifespan} </span>
                            </li>
                            <li>
                                <button type="button" className="plant-add-fav" onClick={() => AddPlantToFavourites(plantData,reloadFavourites)}>Add To Favourites</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default withHeaderFooter(PlantsView)