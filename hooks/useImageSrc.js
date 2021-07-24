import { useEffect, useState } from "react";

const useImageSrc = file => {
	const [imageSrc, setImageSrc] = useState(undefined);

	useEffect(() => {
		if (!file) {
			setImageSrc(undefined);
			return;
		}
		var reader = new FileReader();
		reader.onload = function () {
			setImageSrc(reader.result);
		};
		reader.readAsDataURL(file);
	}, [file]);

	return imageSrc;
};

export default useImageSrc;
