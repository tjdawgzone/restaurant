import React, {useEffect, useState} from "react";
import './App.css';
import {CircularProgress} from '@material-ui/core';
import RestaurantDisplay from './RestaurantDisplay.js';


const API_KEY = process.env.REACT_APP_api_key;
function App() {
  const [search, setSearch] = useState(null);
  useEffect(() => {
    const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.0293,-78.4767");
    url.searchParams.append("key", API_KEY);
    url.searchParams.append("radius", 1500);
    url.searchParams.append("type", "restaurant");
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
          setSearch(obj);
      });
  }, []);
  if(search!==null&&search!==false){
  return (
    <div class="centered">
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
