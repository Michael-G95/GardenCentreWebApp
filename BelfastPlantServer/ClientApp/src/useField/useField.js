import React, { useState } from 'react'
// Function to create a field object
// Optional parameter : function to check the validity of the state. By default  falsy value = invalid
export default function(checkValidity= (state)=>{return state? true:false}) {
    const [state,setState] = useState("");
    const [valid,setValidity] = useState(false);

    const onChangeEventHandler = (event)=>{
        // Update valid
        setState(event.target.value)

        //Check if the value is valid
        const validity = checkValidity(state);
        if(validity!=valid){
            setValidity(validity);
        }
    }




    return {
        value:state,
        onChangeEventHandler,
        valid
    }
}