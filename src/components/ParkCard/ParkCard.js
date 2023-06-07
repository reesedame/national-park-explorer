import "./ParkCard.css";

function ParkCard({ park, setCurrPark }) {
	return (
		<div className="park-card" onClick={() => setCurrPark(park)}>
			<h3>{park.fullName}</h3>
		</div>
	);
}

export default ParkCard;
