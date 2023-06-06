import Header from "../../components/Header/Header";
import USAMap from "react-usa-map";
import { Component } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
	const navigate = useNavigate();
	class Map extends Component {
		mapHandler = (event) => {
			navigate("/parks");
		};

		render() {
			return <USAMap onClick={this.mapHandler} defaultFill="#588157" />;
		}
	}

	return (
		<div className="landing-page-container">
			<Header />
			<h1>Landing Page</h1>
			<Map />
		</div>
	);
}

export default LandingPage;
