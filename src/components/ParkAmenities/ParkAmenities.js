import { useState, useEffect } from "react";

function ParkAmenities({ park }) {
	const [amenities, setAmenities] = useState([]);

	const fetchAmenities = async () => {
		try {
			const apiKey = process.env.REACT_APP_KEY;
			const parkCode = park.parkCode;
			const requestURL = `https://developer.nps.gov/api/v1/amenities/parksplaces?api_key=${apiKey}&parkCode=${parkCode}`;
			const response = await fetch(requestURL);
			const amenitiesDataObject = await response.json();
			const amenitiesArray = amenitiesDataObject.data;
			setAmenities(amenitiesArray);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAmenities();
	}, []);

	return (
		<div className="amenities-container">
			<ul>
				{amenities.map((amenity) => {
					return <li key={amenity[0].id}>{amenity[0].name}</li>;
				})}
			</ul>
		</div>
	);
}

export default ParkAmenities;
