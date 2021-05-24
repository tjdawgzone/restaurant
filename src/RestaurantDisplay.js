import {Card, Link, Grid} from '@material-ui/core';

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
    
    const directionsGenerator = ((result)=>{
        const url = new URL("https://www.google.com/maps/search/?api=1");
        url.searchParams.append("query", [result.geometry.location.lat,result.geometry.location.lng]);
        url.searchParams.append("query_place_id", result.place_id);
        return url;
    })

    const displayResult = ((result) => {
            return(
            <Grid container item xs={4} spacing={3}>
            <div style={{padding:12}}>
            <Card elevation={5} style={{width: '30vw',height: '15vw'}}>
            <h3 style={{paddingTop:"5%"}}>{result.name}</h3>
            <p>{priceDisplay(result.price_level)}</p>
            <p>{ratingDisplay(result.rating)}</p>
            <Link href={directionsGenerator(result)} target="_blank" rel="noopener noreferrer">Directions</Link>
            </Card>
            </div>
            </Grid>
            );
    });
    return (
        <div>
        <h2>Here's what's open right now...</h2>
        <Grid container spacing={1} style={{justifyContent:"center"}}>
        {results.map((result) => (displayResult(result)))}
        </Grid>
        </div>
    )
}

export default RestaurantDisplay;