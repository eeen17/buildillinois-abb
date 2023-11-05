import React from "react";
import Webcam from "react-webcam";
import { useDropzone } from "react-dropzone";

const WebcamComponent = () => {
	const webcamRef = React.useRef(null);

	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		// send imageSrc to server
	}, [webcamRef]);

	return (
		<>
			<Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
			<button onClick={capture}>Capture photo</button>
		</>
	);
};

const UploadComponent = () => {
	const onDrop = React.useCallback((acceptedFiles) => {
		// send acceptedFiles[0] to server
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
			<WebcamComponent />
			<UploadComponent />
		</div>
	);
}
