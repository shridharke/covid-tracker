import React from 'react';
import { Map, GeoJSON } from "react-leaflet";
import mapData from "./countries.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import { showDataOnMap } from "./util";

function MyMap({ casesType, countries, center, zoom }) {

    const countryStyle = {
        fillColor: "red",
        color: "red",
        weight: 1,
    }

    return (
        <div>
            <h1>GeoJSON Map</h1>
            <Map style={{ height: "80vh", width: "90vw", alignContent: "center" }} zoom={zoom} center={center}>
                <GeoJSON style={countryStyle} data={mapData.features} />
                {showDataOnMap(countries,casesType)}
            </Map>
        </div>
    )
}

export default MyMap
