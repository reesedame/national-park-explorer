import { Link } from "react-router-dom";

function Header() {
	return (
		<nav>
			<Link to="/">Back to State Selector</Link>
			<Link to="/parks">ParksPage</Link>
		</nav>
	);
}

export default Header;
