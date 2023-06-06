import Header from "../../components/Header/Header";
import ParkCard from "../../components/ParkCard/ParkCard";
import ParkDetails from "../../components/ParkDetails/ParkDetails";
import { useLocation } from "react-router-dom";

function ParksPage() {
	const location = useLocation();

	return (
		<div className="parks-page-container">
			<Header />
			<h1>{location.state.stateName}</h1>
			<ParkCard />
			<ParkDetails />
		</div>
	);
}

export default ParksPage;
