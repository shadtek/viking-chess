import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const CaptureAnimation = ({ row, col, squareSize, onComplete }) => {
	const [visible, setVisible] = useState(true);
	const [opacity, setOpacity] = useState(1);

	useEffect(() => {
		// Simple animation: just fade out after 1 second
		const timer = setTimeout(() => {
			setOpacity(0.2);
			setTimeout(() => {
				setOpacity(1);
				setTimeout(() => {
					setOpacity(0.2);
					setTimeout(() => {
						setOpacity(1);
						setTimeout(() => {
							setOpacity(0.2);
							setTimeout(() => {
								setVisible(false);
								onComplete();
							}, 150);
						}, 150);
					}, 150);
				}, 150);
			}, 150);
		}, 200);

		return () => clearTimeout(timer);
	}, [onComplete]);

	if (!visible) return null;

	const containerStyle = {
		position: "absolute",
		left: col * squareSize,
		top: row * squareSize,
		width: squareSize,
		height: squareSize,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 1000,
	};

	const textStyle = {
		fontSize: squareSize * 0.8,
		opacity: opacity,
	};

	return (
		<View style={containerStyle} pointerEvents="none">
			<Text style={textStyle}>💥</Text>
		</View>
	);
};

export default CaptureAnimation;
