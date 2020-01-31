import React, { useState,useEffect } from 'react'
import AjaxService from '../AjaxService';

const LastTweet = () => {
    // Component to display last garden centre's tweet from api

    const [tweetData, setTweetData] = useState(false);

    // On component load, get the data
    useEffect(() => {
        AjaxService.GetLastTweet()
            .then((response) => {
                console.log(response.data)
                setTweetData(response.data)
            })
            .catch((err) => {
                console.log(err)
                setTweetData({error:true})
            })
    }, [])

    // Not yet loaded
    if (!tweetData) {
        return <div />
    }

    // Error - display relevant message
    if (tweetData.error) {
        return (
            <div>
                <span>
                    Unable to load last tweet
                </span>

            </div>
        )
    }
    // Generate a DD:MM:YY HH:MM format string 
    const date = new Date(tweetData.created_at);
    const created_atStr = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
    
    return (
        <div className="tweets">
            <h3>
                Latest from the Garden Centre's Twitter
            </h3>
            <span>
                {tweetData.text}
            </span>
            <br /><br />
            <span>
                Tweeted at: {created_atStr}
                </span>
        </div>
        )
}

export default LastTweet