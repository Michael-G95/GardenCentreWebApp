import React, { useState, useEffect } from 'react'
import withHeaderFooter from "../WithHeaderFooter"
import Styles from './PlantsSearch.module.css'
import useField from '../useField/useField'
import { Link } from 'react-router-dom'

const PlantsSearch = () => {
    // Component to give the user search functionality in plants

    const nameField = useField(); // hook which enables maintianing state for a text input

    return (
        <>
            <div className={Styles["centre"]}>
                <h1>
                    Search for a Plant
                </h1>

                <div className={Styles["input-area"]}>
                    <span>Common or Scientific Name</span>
                    <input type="text" value={nameField.value} onChange={nameField.onChangeEventHandler}/>
                    {
                        nameField.valid?
                        <Link to={`/results/c/${nameField.value}`} className={Styles["link"]} >Search</Link>
                            :
                        <Link to='/plants' onClick={()=>alert("Please enter a value")} className={Styles["link"]} >Search</Link>
                    }
                
                </div>
            </div>
        </>
    )
}

export default withHeaderFooter(PlantsSearch, "plants");