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
	const [stateAmenities, setStateAmenities] = useState([]);
	const [stateAmenitiesFilterOptions, setStateAmenitiesFilterOptions] =
		useState([]);
	const [allParks, setAllParks] = useState([]);

	const fetchParks = useCallback(async () => {
		try {
			const apiKey = process.env.REACT_APP_KEY;
			const stateCode = location.state.stateCode;
			const requestURL = `https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&stateCode=${stateCode}`;
			const response = await fetch(requestURL);
			const parksDataObject = await response.json();
			const parksArray = parksDataObject.data;
			setParks(parksArray);
			setAllParks(parksArray);
		} catch (error) {
			return <h1>Something went wrong!</h1>;
		}
	}, [location.state.stateCode]);

	const fetchStateAmenities = useCallback(async () => {
		try {
			const apiKey = process.env.REACT_APP_KEY;
			const requestURL = `https://developer.nps.gov/api/v1/amenities/parksplaces?api_key=${apiKey}&limit=150`;
			const response = await fetch(requestURL);
			const stateAmenitiesObject = await response.json();
			const stateAmenitiesArray = stateAmenitiesObject.data;
			setStateAmenities(stateAmenitiesArray);
		} catch (error) {
			return <p>Cannot filter right now. Try again later!</p>;
		}
	}, []);

	const updateFilterOptions = useCallback(() => {
		setStateAmenitiesFilterOptions(
			stateAmenities.map((amenity) => {
				return {
					value: amenity[0].name,
					label: amenity[0].name,
				};
			})
		);
	}, [stateAmenities]);

	const fetchParkAmenities = async (park) => {
		try {
			const apiKey = process.env.REACT_APP_KEY;
			const parkCode = park.parkCode;
			const requestURL = `https://developer.nps.gov/api/v1/amenities/parksplaces?api_key=${apiKey}&parkCode=${parkCode}`;
			const response = await fetch(requestURL);
			const amenitiesDataObject = await response.json();
			const parkAmenitiesArray = amenitiesDataObject.data;
			const amenityNames = parkAmenitiesArray.map((amenity) => {
				return amenity[0].name;
			});
			localStorage.setItem(parkCode, JSON.stringify(amenityNames));
		} catch (error) {
			return null;
		}
	};

	const setLocalStorageForParkAmenities = useCallback(() => {
		parks.forEach((park) => {
			fetchParkAmenities(park);
		});
	}, [parks]);

	useEffect(() => {
		fetchParks();
	}, [fetchParks]);

	useEffect(() => {
		fetchStateAmenities();
	}, [fetchStateAmenities]);

	useEffect(() => {
		updateFilterOptions();
	}, [updateFilterOptions]);

	useEffect(() => {
		setLocalStorageForParkAmenities();
	}, [setLocalStorageForParkAmenities]);

	function handleFilter(selectedAmenities) {
		let filteredParks = [];
		allParks.forEach((park) => {
			let parkAmenities = JSON.parse(localStorage.getItem(park.parkCode));
			if (
				selectedAmenities.every((selectedAmenity) =>
					parkAmenities.includes(selectedAmenity.value)
				)
			) {
				filteredParks.push(park);
			}
		});
		setParks(filteredParks);
	}

	return (
		<div className="parks-page-container">
			<Header />
			<h1 className="state-name">
				{location.state.stateCode === "DC"
					? "Washington, D.C."
					: location.state.stateName}
			</h1>
			<Select
				options={stateAmenitiesFilterOptions}
				onChange={handleFilter}
				isMulti
			/>
			<div className="park-cards-container">
				{parks.length === 0 ? (
					<h3 className="no-parks">
						None of the current state's sites contain all of the selected
						amenities.
					</h3>
				) : (
					<>
						{parks.map((park) => {
							return (
								<ParkCard park={park} setCurrPark={setCurrPark} key={park.id} />
							);
						})}
					</>
				)}
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
