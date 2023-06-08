import "./ParkDetails.css";
import { useState, useEffect } from "react";

function ParkDetails({ park }) {
	const [imageIdx, setImageIdx] = useState(0);
	let parkImages = park.images;

	useEffect(() => {
		setInterval(() => {
			setImageIdx((prevIdx) =>
				prevIdx === parkImages.length - 1 ? 0 : prevIdx + 1
			);
		}, 8000);
	}, []);

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
			<figure>
				<img
					src={parkImages[imageIdx].url}
					alt={parkImages[imageIdx].title}
					className="park-image"
					loading="lazy"
				/>
				<figcaption>
					<i>{parkImages[imageIdx].caption}</i>
				</figcaption>
			</figure>
		</div>
	);
}

export default ParkDetails;
