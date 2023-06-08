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
			return <p>Unable to display amenities. Please try again later!</p>;
		}
	};

	useEffect(() => {
		fetchAmenities();
		console.log("useEffect ran");
	}, [park]);

	return (
		<div>
			<h2>Amenities</h2>
			<ul>
				{amenities.map((amenity) => {
					return <li key={amenity[0].id}>{amenity[0].name}</li>;
				})}
			</ul>
		</div>
	);
}

export default ParkAmenities;
