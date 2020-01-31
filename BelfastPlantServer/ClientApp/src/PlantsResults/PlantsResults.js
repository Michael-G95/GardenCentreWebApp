import React, { useEffect, useState } from 'react'
import { useParams, Redirect, Link, withRouter } from 'react-router-dom'
import AjaxService from '../AjaxService';
import Styles from './PlantsResults.module.css'
import withHeaderFooter from '../WithHeaderFooter';
const PlantsResults = ({ history }) => {
    // Component to display search results 

    // Import the URL parameters
    const { mode, term } = useParams();
    const [results, setResults] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        AjaxService.SearchPlantByName(term)
            .then((result) => {
                console.log(result);
                setResults(result)
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            })
    }, [])

    // Awaiting response
    if (!results) {
        return <><p>Loading...</p></>
    }

    // Error, return to homepage
    if (error) {
        console.log(error)
        return <Redirect to="/" />
    }

    // Result got OK but no results
    if (results.length === 0) {
        return (
            <div className={Styles["error-root"]}>
                <h2 className={Styles["error-header"]}>
                    No Results for '{term}'
                </h2>
                <div className={Styles["back-link"]}>
                    <Link to='/plants'>Back To Plants Search</Link>
                </div>

            </div>
        )
    }
    // Map the data to rows of results
    const resultsViews = results.data.map((result) => {
        return (
            <div key={result.id} className={Styles['result']} onClick={() => history.push(`/plants/id/${result.id}`)}>
                <span className={Styles['title']}>
                    {result.common_name}
                </span>
                <span className={Styles['secondary']}>
                    {result.scientific_name}
                </span>
                <div className={Styles['button']}>
                    <span>Go</span>
                </div>
            </div>

        )
    })

    // Render result list
    return (
        <>
            <div className={Styles["root"]}>
                <div className={Styles['results-root']}>
                    {resultsViews}
                </div>
                <div className={Styles["back-link"]}>
                    <Link to='/plants'>Back To Plants Search</Link>
                </div>
            </div>

        </>
    )
}

export default withRouter(withHeaderFooter(PlantsResults, ''));