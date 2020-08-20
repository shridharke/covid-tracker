import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import './App.css';
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import MyMap from "./MyMap";
import numeral from "numeral";

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("worldwide");
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
	const [mapZoom, setMapZoom] = useState(3);
	const [mapCountries, setMapCountries] = useState([]);
	const [casesType, setCasesType] = useState("cases");

	useEffect(()=>{
		fetch("https://disease.sh/v3/covid-19/all")
		.then(response => response.json())
		.then(data => {
			setCountryInfo(data);
		})
	}, []);

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
			.then(response => response.json())
			.then(data => {
				const countries = data.map(country => ({
					name: country.country,
					value: country.countryInfo.iso2
				}));
				const sortedData = sortData(data)
				setTableData(sortedData);
				setMapCountries(data);
				setCountries(countries);
			});
		}
		getCountriesData();
	},[]);

	const onCountryChange = async (event) => {
		const countryCode = event.target.value;
		const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
		await fetch(url)
		.then(response => response.json())
		.then(data => {
			const [lat,lng] = countryCode === "worldwide" ? [ 34.80746, -40.4796] : [data.countryInfo.lat, data.countryInfo.long];
			setCountry(countryCode);
			setCountryInfo(data);
			setMapCenter([lat,lng]);
			setMapZoom(4);
		});
	}

	return (
		<div>
			<div className="app">
				<div>
					<div className="app-header">
						<h1>COVID 19 Stats</h1>
						<FormControl className="app-dropdown">
							<Select variant="outlined" onChange={onCountryChange} value={country}>
								<MenuItem value="worldwide">Worldwide</MenuItem>
								{countries.map(country =>(
									<MenuItem value={country.value}>{country.name}</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="app-stats">
						<InfoBox active={casesType === "cases"} onClick={e => setCasesType('cases')} title="Cases" cases={"+" + numeral(countryInfo.todayCases).format("0,0")} total={numeral(countryInfo.cases).format("0,0")} />
						<InfoBox active={casesType === "active"} onClick={e => setCasesType('active')} title="Active" cases={"+" + numeral(countryInfo.active).format("0,0")} total={numeral(countryInfo.active).format("0,0")} />
						<InfoBox active={casesType === "recovered"} onClick={e => setCasesType('recovered')} title="Recovered" cases={"+" + numeral(countryInfo.todayRecovered).format("0,0")} total={numeral(countryInfo.recovered).format("0,0")} />
						<InfoBox active={casesType === "deaths"} onClick={e => setCasesType('deaths')} title="Deaths" cases={"+" + numeral(countryInfo.todayDeaths).format("0,0")} total={numeral(countryInfo.deaths).format("0,0")} />
					</div>
					<MyMap casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
				</div>
			</div>
			<div>
				<Card>
					<CardContent>
						<h3>Live Cases Table</h3>
						<Table countries={tableData} />
						<h3>Worldwide new Cases</h3>
						<LineGraph casesType={casesType} />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default App;
