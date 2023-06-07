import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
	return (
		<nav>
			<div className="header-link-container">
				<Link to="/" className="header-link">
					Back to State Selector
				</Link>
			</div>
		</nav>
	);
}

export default Header;
