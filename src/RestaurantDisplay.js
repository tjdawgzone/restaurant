import React, {useEffect, useState} from "react";

function RestaurantDisplay({search}) {

    const displayResult = ((result) => {
        console.log(JSON.stringify(result));
        try{
        if(result.opening_hours.open_now){
            return(<li>{result.name}</li>);
        }
    }
    catch{
        console.log("No opening hours provided.")
    }
    });
    return (
        <div >
        <h1>Here are some open restaraunts and bars in Charlottesville...</h1>
        {search.results.map((result) => (displayResult(result)))}
        </div>
    )
}

export default RestaurantDisplay;