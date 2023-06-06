import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import ParksPage from "../ParksPage/ParksPage";

function App() {
	return (
		<main className="App">
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/parks" element={<ParksPage />} />
			</Routes>
		</main>
	);
}

export default App;
