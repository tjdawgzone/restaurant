import React, {useEffect, useState} from "react";
import './App.css';
import {CircularProgress, ButtonGroup, Button, TextField, Grid} from '@material-ui/core';
import RestaurantDisplay from './RestaurantDisplay.js';
import sortResults from './Sort.js'
import { useStateWithCallbackLazy } from 'use-state-with-callback';


const API_KEY = process.env.REACT_APP_api_key;
function App() {
    const [search, setSearch] = useStateWithCallbackLazy(null);
    const [results, setResults] = useState(null);
    const [address, setAddress] = useState(null);
    const [location, setLocation] = useState(null);
    const [firstRun1, setFirstRun1] = useState(true);
    const [type,setType] = useState(0);
    const [active,setActive] = useState(true);
    const [coordinates,setCoordinates] = useStateWithCallbackLazy(null);
    const [error,setError] = useState("");
    const firstType = "restaurant";
    const defaultCoordinates= [38.0293,-78.4767];

    const performSearch = ((type,coordinates)=>{
      const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?");
      url.searchParams.append("key", API_KEY);
      url.searchParams.append("radius", 6440);
      url.searchParams.append("type", type);
      url.searchParams.append("opennow",true);
      url.searchParams.append("location",coordinates);
      fetch(url)
        .then((resp) => {
          return resp.json();
        })
        .then((obj) => {
            setSearch(obj,()=>{setFirstRun1(false)});
        })
        .then(()=>{
          setActive(true);
        })
    });


  useEffect(()=>{
    if(firstRun1===true&&location!==null){
      try{
      setCoordinates([location.results[0].geometry.location.lat,location.results[0].geometry.location.lng]);
      performSearch(firstType,coordinates);
      }
      catch{
        setError("Invalid Address. Please format your address like this: Street, City, State.")
      }
    }
    try{
      if(type===1){
        setResults(sortResults(results,"rating1"));
        setType(0);
      }
      else if(type===2){
        setResults(sortResults(results,"rating2"));
        setType(0);
      }
      else if(type===3){
        setResults(sortResults(results,"price1"));
        setType(0);
      }
      else if(type===4){
        setResults(sortResults(results,"price2"));
        setType(0);
      }
      else if(type===5){
        setResults(sortResults(results,"name1"));
        setType(0);
      }
      else if(type===6){
        setResults(sortResults(results,"name2"));
        setType(0);
      }
      else{
        if(active===true){
        setResults(search.results);
        setActive(false);
        }
      }
    }
    catch{
      console.log("Waiting for results to be updated.")
    }
  });

  if(results===null){
    return (
      <div class="center">
        <h1>Where are we eating today?</h1>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <TextField id="standard-basic" label="Address" style={{display:'flex', justifyContent:'center'}} onChange={evt=>setAddress(evt.target.value)}/>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={()=>{
            const url = new URL("https://maps.googleapis.com/maps/api/geocode/json?");
            url.searchParams.append("key", API_KEY);
            url.searchParams.append("address", address);
            fetch(url)
              .then((resp) => {
                return resp.json();
              })
              .then((obj) => {
                  setLocation(obj);
              })
          }}>Search</Button>
          </Grid>
        </Grid>
        <p>{error}</p>
      </div>
    );
  }
  else if(results!==null){
  return (
    <div class="centered">
      <h1 style={{fontSize:50,margin:0,padding:15}}>Food Finder 🍽</h1>
        <ButtonGroup style={{paddingTop:0}} variant="contained" color="primary" aria-label="outlined primary button group">
          <Button onClick={()=>{performSearch("restaurant",coordinates);}}>Restaurant</Button>
          <Button onClick={()=>{performSearch("bar",coordinates);}}>Bar</Button>
          <Button onClick={()=>{performSearch("cafe",coordinates);}}>Cafe</Button>
          <Button onClick={()=>{performSearch("bakery",coordinates);}}>Bakery</Button>
        </ButtonGroup>
        <br></br>
        <ButtonGroup style={{paddingTop:15}} size="small" variant="text" color="secondary" aria-label="text primary button group">
          <Button onClick={()=>{setType(1);}}>Ratings (high-low)</Button>
          <Button onClick={()=>{setType(2);}}>Ratings (low-high) </Button>
          <Button onClick={()=>{setType(3);}}>Price (high-low)</Button>
          <Button onClick={()=>{setType(4);}}>Price (low-high)</Button>
          <Button onClick={()=>{setType(5);}}>Name (A-Z)</Button>
          <Button onClick={()=>{setType(6);}}>Name (Z-A)</Button>
        </ButtonGroup>
      <RestaurantDisplay results={results}/>
    </div>
  );
  }
  else{
    return (
    <div class="center">
    <CircularProgress color="secondary"/>
    </div>
    );
  }
}

export default App;
