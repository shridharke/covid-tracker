import React from 'react';
import { Map as LeafletMap, GeoJSON } from "react-leaflet";
import mapData from "./countries.json";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { showDataOnMap } from "./util";

function Map({ casesType, countries, center, zoom, dark }) {

    // const mapColors = {
    //     cases: {
    //         hex: "#ff073a"
    //     },
    //     active: {
    //         hex: "#007bff"
    //     },
    //     recovered: {
    //         hex: "#28a745"
    //     },
    //     deaths: {
    //         hex: "#6c757d"
    //     }
    // }

    // const [ mapColor, setMapColor] = useState( mapColors[casesType] );
    // // const [countryStyle, setcountryStyle] = useState({ fillColor: "transparent", color: "#ff073a", weight: 0.5, });

    // useEffect(() => {
    //     const changeMapColor = () => {
    //         setMapColor(mapColors[casesType]);
    //     }
    //     changeMapColor();
    // },[casesType, mapColors]);

    // const mapColor = dark ? "#bdbdbd" : "#111";

    const countryStyle = { fillColor: "transparent", color: "#919191", weight: 0.5, }

    return (
        <div>
            <LeafletMap className="mymap" zoom={zoom} center={center}>
                <GeoJSON
                style={countryStyle}
                data={mapData.features} />
                {showDataOnMap(countries,casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map
