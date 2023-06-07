function ParkDetails({ park }) {
	return (
		<div className="park-details">
			<h3>{park.fullName} Details:</h3>
			<p>
				<a href={park.url}>Official Site</a>
			</p>
			<p>{park.description}</p>
		</div>
	);
}

export default ParkDetails;
