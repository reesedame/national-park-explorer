import "./ParkDetails.css";
import { useState, useEffect } from "react";

function ParkDetails({ park }) {
	const [imageIdx, setImageIdx] = useState(0);
	const [amenities, setAmenities] = useState([]);
	let parkImages = park.images;

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

	useEffect(() => {
		setInterval(() => {
			setImageIdx((prevIdx) =>
				prevIdx === parkImages.length - 1 ? 0 : prevIdx + 1
			);
		}, 8000);
	}, []);

	return (
		<div className="park-details">
			<h1>{park.fullName}</h1>
			<p>
				<a
					href={park.url}
					target="_blank"
					rel="noopener noreferrer"
					className="official-site"
				>
					Official Site
				</a>
			</p>
			<p>{park.description}</p>
			<figure>
				<img
					src={parkImages[imageIdx].url}
					alt={parkImages[imageIdx].title}
					className="park-image"
					loading="lazy"
				/>
				<figcaption>
					<i>{parkImages[imageIdx].caption}</i>
				</figcaption>
			</figure>
			<ul>
				{amenities.map((amenity) => {
					return <li key={amenity[0].id}>{amenity[0].name}</li>;
				})}
			</ul>
		</div>
	);
}

export default ParkDetails;
