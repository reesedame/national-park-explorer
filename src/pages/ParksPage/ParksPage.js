import Header from "../../components/Header/Header";
import ParkCard from "../../components/ParkCard/ParkCard";
import ParkDetails from "../../components/ParkDetails/ParkDetails";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import "./ParksPage.css";
import ParkAmenities from "../../components/ParkAmenities/ParkAmenities";
import Select from "react-select";

function ParksPage() {
	const location = useLocation();
	const [parks, setParks] = useState([]);
	const [currPark, setCurrPark] = useState([]);
	const [stateAmenitiesFilterOptions, setStateAmenitiesFilterOptions] =
		useState([]);

	const fetchParks = useCallback(async () => {
		try {
			const apiKey = process.env.REACT_APP_KEY;
			const stateCode = location.state.stateCode;
			const requestURL = `https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&stateCode=${stateCode}`;
			const response = await fetch(requestURL);
			const parksDataObject = await response.json();
			const parksArray = parksDataObject.data;
			setParks(parksArray);
		} catch (error) {
			return <h1>Something went wrong!</h1>;
		}
	}, [location.state.stateCode]);

	const fetchStateAmenities = useCallback(async () => {
		try {
			const apiKey = process.env.REACT_APP_KEY;
			const stateCode = location.state.stateCode;
			if (localStorage.getItem(stateCode) === null) {
				const requestURL = `https://developer.nps.gov/api/v1/amenities/parksplaces?api_key=${apiKey}&stateCode=${stateCode}&limit=150`;
				const response = await fetch(requestURL);
				const stateAmenitiesObject = await response.json();
				const stateAmenitiesArray = stateAmenitiesObject.data;
				const amenityNames = stateAmenitiesArray.map((amenity) => {
					return amenity[0].name;
				});
				localStorage.setItem(stateCode, JSON.stringify(amenityNames));
			}
		} catch (error) {
			return <p>Cannot filter right now. Try again later!</p>;
		}
	}, [location.state.stateCode]);

	useEffect(() => {
		fetchParks();
	}, [fetchParks]);

	useEffect(() => {
		fetchStateAmenities();
		try {
			setTimeout(() => {
				const stateAmenities = JSON.parse(
					localStorage.getItem(location.state.stateCode)
				);
				setStateAmenitiesFilterOptions(
					stateAmenities.map((name) => {
						return {
							value: name,
							label: name,
						};
					})
				);
			}, 3000);
		} catch (error) {
			console.log(error);
		}
	}, [fetchStateAmenities, location.state.stateCode]);

	return (
		<div className="parks-page-container">
			<Header />
			<h1 className="state-name">
				{location.state.stateCode === "DC"
					? "Washington, D.C."
					: location.state.stateName}
			</h1>
			<Select options={stateAmenitiesFilterOptions} />
			<div className="park-cards-container">
				{parks.map((park) => {
					return (
						<ParkCard park={park} setCurrPark={setCurrPark} key={park.id} />
					);
				})}
			</div>
			{currPark.length === 0 ? (
				<div className="no-park-details">
					<h3>Click on a park to view its details!</h3>
				</div>
			) : (
				<>
					<div className="park-details-container">
						<ParkDetails park={currPark} />
					</div>
					<div className="park-amenities-container">
						<ParkAmenities park={currPark} />
					</div>
				</>
			)}
		</div>
	);
}

export default ParksPage;
