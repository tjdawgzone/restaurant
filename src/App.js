import React, {useEffect, useState} from "react";
import './App.css';
import {CircularProgress, ButtonGroup, Button} from '@material-ui/core';
import RestaurantDisplay from './RestaurantDisplay.js';


const API_KEY = process.env.REACT_APP_api_key;
function App() {
    const [search, setSearch] = useState(null);
    const [firstRun, setFirstRun] = useState(true);
    const firstType = "restaurant";

    const performSearch = ((type)=>{
      const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.0293,-78.4767");
      url.searchParams.append("key", API_KEY);
      url.searchParams.append("radius", 6440);
      url.searchParams.append("type", type);
      url.searchParams.append("opennow",true);
      fetch(url)
        .then((resp) => {
          return resp.json();
        })
        .then((obj) => {
            setSearch(obj);
        });
      setFirstRun(false);
    });

  if(firstRun===true){
    performSearch(firstType);
    setFirstRun(false);
  }
  else if(search!==null&&search!==false){
  return (
    <div class="centered">
      <h1>Food Finder 🍽</h1>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button onClick={()=>{performSearch("restaurant")}}>Restaurant</Button>
        <Button onClick={()=>{performSearch("bar")}}>Bar</Button>
        <Button onClick={()=>{performSearch("cafe")}}>Cafe</Button>
        <Button onClick={()=>{performSearch("bakery")}}>Bakery</Button>
      </ButtonGroup>
      <RestaurantDisplay search={search}/>
    </div>
  );
  }
  else{
    return (
    <div class="center">
    <CircularProgress color="secondary" />
    </div>
    );
  }
}

export default App;
