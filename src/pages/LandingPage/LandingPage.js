import USAMap from "react-usa-map";
import { Component } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
	const navigate = useNavigate();
	class Map extends Component {
		mapHandler = (event) => {
			let stateName = event.target.innerHTML
				.replace("<title>", "")
				.replace("</title>", "");
			navigate("/parks", {
				state: { stateName: stateName, stateCode: event.target.dataset.name },
			});
		};

		render() {
			return <USAMap onClick={this.mapHandler} defaultFill="#588157" />;
		}
	}

	return (
		<div className="landing-page-container">
			<h1>Click on a state to view its national parks!</h1>
			<Map />
		</div>
	);
}

export default LandingPage;
