import React from "react";
import Webcam from "react-webcam";
import { useDropzone } from "react-dropzone";
import "./App.css";
import html2canvas from "html2canvas";

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

async function getFileFromURL(url) {
	let response = await fetch(url);
	let data = await response.blob();
	let metadata = {
		type: "image/jpeg",
	};
	let file = new File([data], "test.jpg", metadata);
	return file;
}

const WebcamComponent = () => {
	const webcamRef = React.useRef(null);
	const [imageSrc, setImageSrc] = React.useState(null);

	const capture = React.useCallback(() => {
		// Capture the webcam frame
		html2canvas(webcamRef.current.video, { useCORS: true }).then((canvas) => {
			// Convert the captured frame to a PNG file
			const imgSrc = canvas.toDataURL("image/png");

			UploadImage(getFileFromURL(imgSrc));
		});
	}, [webcamRef]);

	return (
		<>
			<Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
			<button onClick={capture}>Capture photo</button>
		</>
	);
};

const UploadComponent = () => {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

	const files = acceptedFiles.map((file) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	return (
		<section className="container">
			<div {...getRootProps({ className: "dropzone" })}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
			</div>
			<aside>
				<h4>Files</h4>
				<ul>{files}</ul>
			</aside>
		</section>
	);
	// const onDrop = React.useCallback((acceptedFiles) => {
	// 	UploadImage(acceptedFiles[0]);
	// }, []);

	// const { getRootProps, getInputProps } = useDropzone({ onDrop });

	// return (
	// 	<div {...getRootProps()}>
	// 		<input {...getInputProps()} />
	// 		<p>Drag 'n' drop some files here, or click to select files</p>
	// 	</div>
	// );
};

// Create a banner component
const Banner = () => {
	// Import an image for the logo
	const logo = require("./Logo.png");

	// Define the style for the logo
	const logoStyle = {
		width: "100px",
		height: "100px",
		background: `url(${logo})`,
		backgroundSize: "cover",
		marginLeft: "10px",
	};

	// Define the style for the text
	const textStyle = {
		fontSize: "36px",
		marginRight: "10px",
	};

	// Return the JSX element for the banner
	return (
		<div className="banner">
			{/* Render the logo */}
			<div style={logoStyle}></div>
			{/* Render the text */}
			<div style={textStyle}>Automated Botany Bioclassifier</div>
		</div>
	);
};

export default function App() {
	return (
		<div>
			{/* Render the banner component */}
			<Banner />
			<UploadComponent />
			<div class="sprite-container">
				<div class="sprite-element"></div>
			</div>
		</div>
	);
}
