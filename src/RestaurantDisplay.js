import React, {useEffect, useState} from "react";
import Card from '@material-ui/core/Card';

function RestaurantDisplay({search}) {

    const priceDisplay = ((input)=>{
        if(input!=null){
        let x = "Price: ";
        let i = 0;
        for(i=0;i<input;i++){
            x=x+"💲";
        }
        return x;
    }
    else{
        return "No price level provided.";
    }
    })

    const ratingDisplay = ((input)=>{
        if(input!=null){
        const roundedInput=Math.round(input);
        let x = "Rating: ";
        let i = 0;
        for(i=0;i<roundedInput;i++){
            x=x+"⭐️";
        }
        x=x+" ("+input+")";
        return x;
    }
    else{
        return "No rating available.";
    }
    })

    const displayResult = ((result) => {
            return(
            <div style={{padding:10}}>
            <Card elevation={3} style={{display: 'block'}}>
            <h3 style={{padding:3}}>{result.name}</h3>
            <p>{priceDisplay(result.price_level)}</p>
            <p>{ratingDisplay(result.rating)}</p>
            </Card>
            </div>
            );
    });
    return (
        <div >
        <h2>Here's what's open in Charlottesville...</h2>
        {search.results.map((result) => (displayResult(result)))}
        </div>
    )
}

export default RestaurantDisplay;