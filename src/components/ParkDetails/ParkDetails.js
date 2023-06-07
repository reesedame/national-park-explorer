import "./ParkDetails.css";

function ParkDetails({ park }) {
	if (Object.keys(park).length !== 0) {
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
				<img
					src={park.images[0].url}
					alt="View of park"
					className="park-image"
				/>
			</div>
		);
	} else {
		return (
			<div className="no-park-details">
				<h1>Click on a park to view its details!</h1>
			</div>
		);
	}
}

export default ParkDetails;
