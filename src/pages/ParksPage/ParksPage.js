import Header from "../../components/Header/Header";
import ParkCard from "../../components/ParkCard/ParkCard";
import ParkDetails from "../../components/ParkDetails/ParkDetails";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function ParksPage() {
	const location = useLocation();
	const [parks, setParks] = useState([]);

	const fetchParks = async () => {
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
	};

	useEffect(() => {
		fetchParks();
	});

	return (
		<div className="parks-page-container">
			<Header />
			<h1>{location.state.stateName}</h1>
			{parks.map((park) => {
				return <h6>{park.fullName}</h6>;
			})}
			<ParkCard />
			<ParkDetails />
		</div>
	);
}

export default ParksPage;
