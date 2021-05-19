import React, {useEffect, useState} from "react";
import Card from '@material-ui/core/Card';

function RestaurantDisplay({search}) {

    const displayResult = ((result) => {
            return(
            <div style={{padding:10}}>
            <Card elevation={3} style={{display: 'block'}}>
            <h3 style={{padding:10}}>{result.name}</h3>
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