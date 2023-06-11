function ParkAmenities({ park }) {
	const amenities = JSON.parse(localStorage.getItem(park.parkCode));

	return (
		<div>
			<h2>Amenities</h2>
			{amenities.length === 0 ? (
				<h4>Amenity information is not available for this location.</h4>
			) : (
				<ul>
					{amenities.map((amenity) => {
						return <li key={amenity}>{amenity}</li>;
					})}
				</ul>
			)}
		</div>
	);
}

export default ParkAmenities;
