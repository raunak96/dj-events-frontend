import Image from "next/image";
import { useState, useEffect } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

const EventMap = ({ evt }) => {
	const [lat, setLat] = useState(null);
	const [lng, setLng] = useState(null);
	const [loading, setLoading] = useState(true); // dont want map to load before getting lat/lng

	const [viewport, setViewport] = useState({
		latitude: null,
		longitude: null,
		width: "100%",
		height: "500px",
		zoom: 12,
	});

	useEffect(() => {
		const getLatLang = async () => {
			const encodedAddress = encodeURI(
				evt.address.replace("#", "").replace(";", "")
			);
			try {
				const { data } = await axios.get(
					`${process.env.NEXT_PUBLIC_MAPBOX_URI}/${encodedAddress}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
				);
				const coords = data.features[0].center;
				setLat(coords[1]);
				setLng(coords[0]);
				setLoading(false);
			} catch (err) {
				setLoading(true);
			}
		};
		getLatLang();
	}, [evt.address]);

	useEffect(() => {
		setViewport(v => ({ ...v, latitude: lat, longitude: lng }));
	}, [lat, lng]);

	if (loading) return false;

	return (
		<ReactMapGl
			{...viewport}
			mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
			onViewportChange={vp => setViewport(vp)}>
			<Marker key={evt.id} latitude={lat} longitude={lng}>
				<Image
					src="/images/pin.svg"
					width={30}
					height={30}
					alt="Marker"
				/>
			</Marker>
		</ReactMapGl>
	);
};

export default EventMap;
