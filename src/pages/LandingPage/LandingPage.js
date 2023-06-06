import Header from "../../components/Header/Header";
import USAMap from "react-usa-map";
import { Component } from "react";

class LandingPage extends Component {
	mapHandler = (event) => {
		alert(event.target.dataset.name);
	};

	render() {
		return (
			<div className="landing-page-container">
				<Header />
				<h1>Landing Page</h1>
				<h2>Map will go here</h2>
				<USAMap onClick={this.mapHandler} />
			</div>
		);
	}
}

export default LandingPage;
