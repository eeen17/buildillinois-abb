import React from "react";
import Webcam from "react-webcam";
import { useDropzone } from "react-dropzone";
import "./App.css";

function UploadImage(file) {
	const formData = new FormData();
	formData.append("file", file);

	fetch("http://127.0.0.1:5000/api/upload", {
		method: "POST",
		body: formData,
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

const WebcamComponent = () => {
	const webcamRef = React.useRef(null);
	const [imageSrc, setImageSrc] = React.useState(null);

	const capture = React.useCallback(() => {
		const imgSrc = webcamRef.current.getScreenshot();
		setImageSrc(imgSrc);
	}, [webcamRef, setImageSrc]);

	return (
		<>
			<Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
			<button onClick={capture}>Capture photo</button>
			{imageSrc && (
				<a href={imageSrc} download="webcam_image.jpeg">
					Download photo
				</a>
			)}
		</>
	);
};

const UploadComponent = () => {
	const onDrop = React.useCallback((acceptedFiles) => {
		UploadImage(acceptedFiles[0])
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			<p>Drag 'n' drop some files here, or click to select files</p>
		</div>
	);
};

export default function App() {
	return (
		<div>
			<div className="banner">ABB</div>
			<WebcamComponent />
			<UploadComponent />
		</div>
	);
}
