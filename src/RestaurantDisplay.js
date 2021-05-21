import React, {useEffect, useState} from "react";
import Card from '@material-ui/core/Card';

function RestaurantDisplay({results}) {

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
            <div style={{padding:10, display:'flex', justifyContent:'center'}}>
            <Card elevation={3} style={{width: '40vw',height: '13vw'}}>
            <h3 style={{padding:3}}>{result.name}</h3>
            <p>{priceDisplay(result.price_level)}</p>
            <p>{ratingDisplay(result.rating)}</p>
            </Card>
            </div>
            );
    });
    return (
        <div>
        <h2>Here's what's open right now...</h2>
        {results.map((result) => (displayResult(result)))}
        </div>
    )
}

export default RestaurantDisplay;