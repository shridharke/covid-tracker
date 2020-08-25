import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import InfoBox from "./InfoBox";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import Map from "./Map";
import numeral from "numeral";
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SunLogo from "./sunlogo.png";
import MoonLogo from "./moon.svg";

function App() {

	const getInitialMode = () => {
		const savedMode = JSON.parse(localStorage.getItem('dark'));
		return savedMode || false;
	}

	const [darkMode, setDarkMode] = useState(getInitialMode());
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("worldwide");
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [mapCenter, setMapCenter] = useState({lat: 0, lng: 0});
	const [mapZoom, setMapZoom] = useState(2);
	const [mapCountries, setMapCountries] = useState([]);
	const [casesType, setCasesType] = useState("active");

	useEffect(() => {
		localStorage.setItem('dark', JSON.stringify(darkMode));
	},[darkMode]);

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

	const paletteType = darkMode ? "dark" : "light" ;

	const darkTheme = createMuiTheme({
		palette: {
			type: paletteType,
		}
	});

	const todayDate = new Date();

	return (
		<div className={`App ${ darkMode? "dark-mode" : "light-mode" }`}>
			<div className="home">
				<div className="app-theme">
					<button className="theme-button" onClick={() => setDarkMode(prevValue => !prevValue)}>{darkMode ? <img className="light-logo" src={SunLogo} height={25} width={25} color={"#ff073a"} alt="Light" /> : <img className="dark-logo" height={25} width={25} src={MoonLogo} alt="Dark" />}</button>
				</div>
				<div className="app-left">
					<div className="app-header">
						<div className="app-search">
							<h6>Select your Country</h6>
							<div className="line"></div>
							<ThemeProvider theme={darkTheme}>
								<FormControl className="app-dropdown">
									<Select className="app-select" variant="outlined" onChange={onCountryChange} value={country}>
										<MenuItem style={{backgroundColor: '#161625', color: '#bdbdbd'}} className="app-menutitem" value="worldwide">Worldwide</MenuItem>
										{countries.map(country =>(
											<MenuItem style={{backgroundColor: '#161625', color: '#bdbdbd'}} value={country.value}>{country.name}</MenuItem>
										))}
									</Select>
								</FormControl>
							</ThemeProvider>
						</div>
						<h5 className="app-date">{todayDate.toLocaleString('en-GB',{day:'numeric', month:'short', year:'numeric'})}</h5>
					</div>
					<div className="app-stats">
						<InfoBox className="infoitem confirmedBox" casesType={casesType} active={casesType === "cases"} onClick={e => setCasesType('cases')} title="Cases" cases={"+"+numeral(countryInfo.todayCases).format("0,0")} total={numeral(countryInfo.cases).format("0,0")} />
						<InfoBox className="infoitem activeBox" casesType={casesType} active={casesType === "active"} onClick={e => setCasesType('active')} title="Active" cases={"\n"} total={numeral(countryInfo.active).format("0,0")} />
						<InfoBox className="infoitem recoveredBox" casesType={casesType} active={casesType === "recovered"} onClick={e => setCasesType('recovered')} title="Recovered" cases={"+"+numeral(countryInfo.todayRecovered).format("0,0")} total={numeral(countryInfo.recovered).format("0,0")} />
						<InfoBox className="infoitem deathBox" casesType={casesType} active={casesType === "deaths"} onClick={e => setCasesType('deaths')} title="Deaths" cases={"+"+numeral(countryInfo.todayDeaths).format("0,0")} total={numeral(countryInfo.deaths).format("0,0")} />
					</div>
					<div className="app-mytable">
						<Table countries={tableData} />
					</div>
				</div>
				<div className="app-right">
					<div className="app-map">
						<div className="app-title">
							<h1>COVID 19</h1>
							{/* <input type="button" action="toggle" /> */}
						</div>
						<div className="geomap">
							<Map dark={darkMode} casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
						</div>
					</div>
					<div className="app-graph">
						<h4 className="linegraph-title">Confirmed</h4>
						<LineGraph casesType='cases' />
						<h4 className="linegraph-title">Recovered</h4>
						<LineGraph casesType='recovered' />
						<h4 className="linegraph-title">Deaths</h4>
						<LineGraph casesType='deaths' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
