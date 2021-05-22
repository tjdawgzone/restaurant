import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import {Link} from '@material-ui/core';
function MapDisplay(props) {

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
      return (
          <Link href={url}>Directions</Link>
      )
    })

    return (
        <div id="mapid" style={{margin:"auto"}}>
        <MapContainer center={props.coordinates} zoom={14} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        {props.search.results.map((result) => {
            return (
            <Marker position={[result.geometry.location.lat,result.geometry.location.lng]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
                <span>
                {result.name}<br/>
                {priceDisplay(result.price_level)}<br/>
                {ratingDisplay(result.rating)}<br/>
                {directionsGenerator(result)}
                </span>
            </Popup>
            </Marker>)
        })}
      </MapContainer>
    </div>
    )
}

export default MapDisplay;