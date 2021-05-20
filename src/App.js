import React, {useEffect, useState} from "react";
import './App.css';
import {CircularProgress, ButtonGroup, Button} from '@material-ui/core';
import RestaurantDisplay from './RestaurantDisplay.js';
import sortResults from './Sort.js'


const API_KEY = process.env.REACT_APP_api_key;
function App() {
    const [search, setSearch] = useState(null);
    const [results, setResults] = useState(null);
    const [firstRun1, setFirstRun1] = useState(true);
    const firstType = "restaurant";
    const [type,setType] = useState(0);
    const [active,setActive] = useState(true);

    const performSearch = ((type)=>{
      const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?");
      url.searchParams.append("key", API_KEY);
      url.searchParams.append("radius", 6440);
      url.searchParams.append("type", type);
      url.searchParams.append("opennow",true);
      url.searchParams.append("location",[38.0293,-78.4767]);
      fetch(url)
        .then((resp) => {
          return resp.json();
        })
        .then((obj) => {
            setSearch(obj);
        })
        .then(()=>{
          setActive(true);
        })
      setFirstRun1(false);
    });


  useEffect(()=>{
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

  if(firstRun1===true){
    performSearch(firstType);
    setFirstRun1(false);
  }
  else if(results!==null){
  return (
    <div class="centered">
      <h1 style={{fontSize:50,margin:0,padding:15}}>Food Finder 🍽</h1>
        <ButtonGroup style={{paddingTop:0}} variant="contained" color="primary" aria-label="outlined primary button group">
          <Button onClick={()=>{performSearch("restaurant");}}>Restaurant</Button>
          <Button onClick={()=>{performSearch("bar");}}>Bar</Button>
          <Button onClick={()=>{performSearch("cafe");}}>Cafe</Button>
          <Button onClick={()=>{performSearch("bakery");}}>Bakery</Button>
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
