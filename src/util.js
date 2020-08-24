import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
      hex: "#ff073a",
      multiplier: 800,
    },
    active: {
        hex: "#007bff",
        multiplier: 1000,
    },
    recovered: {
      hex: "#28a745",
      multiplier: 1200,
    },
    deaths: {
      hex: "#6c757d",
      multiplier: 2000,
    },
};

export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1));
}

export const prettyPrintStat = (stat) => stat? `${numeral(stat).format("0.0a")}`: "0";

export const showDataOnMap = (data, casesType) => {
    return data.map(country => {
        return <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        weight={1}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
            <Popup>
                <div className="info-container">
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="info-active">Active: {numeral(country.active).format("0,0")}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    });
}