import "./ParkDetails.css";
import { useState, useEffect } from "react";

function ParkDetails({ park }) {
	const [imageIdx, setImageIdx] = useState(0);
	let parkImages = park.images;

	// This function iterates through the images provided by the API & displays each for 8s
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
			{parkImages[imageIdx] === undefined ? (
				<p>Image not available.</p>
			) : (
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
			)}
		</div>
	);
}

export default ParkDetails;
