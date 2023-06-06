import Header from "../../components/Header/Header";
import ParkCard from "../../components/ParkCard/ParkCard";
import ParkDetails from "../../components/ParkDetails/ParkDetails";

function ParksPage() {
	return (
		<div className="parks-page-container">
			<Header />
			<h2>ParksPage</h2>
			<ParkCard />
			<ParkDetails />
		</div>
	);
}

export default ParksPage;
