import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

const GameControls = ({ onResetGame, isGameActive }) => {
	const handleResetPress = () => {
		// For debugging, let's call reset directly first
		console.log("Reset button pressed");
		onResetGame();
	};

	const containerStyle = {
		padding: 16,
		gap: 16,
	};

	const sectionStyle = {
		backgroundColor: "#111827", // gray-900
		padding: 16,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#374151", // gray-700
		marginBottom: 16,
	};

	const titleStyle = {
		color: "#FFFFFF",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 12,
		textAlign: "center",
	};

	const getButtonStyle = (isSelected, customColor = null) => ({
		flex: 1,
		padding: 12,
		borderRadius: 8,
		backgroundColor: isSelected
			? customColor || "#2563EB" // blue-600
			: "#374151", // gray-700
	});

	const buttonTextStyle = {
		color: "#FFFFFF",
		textAlign: "center",
		fontWeight: "600",
	};

	return (
		<View style={containerStyle}>
			{/* Game Actions */}
			<View style={sectionStyle}>
				<Text style={titleStyle}>Game Actions</Text>
				<TouchableOpacity
					style={{
						backgroundColor: "#DC2626", // red-600
						padding: 12,
						borderRadius: 8,
					}}
					onPress={handleResetPress}
				>
					<Text style={buttonTextStyle}>New Game</Text>
				</TouchableOpacity>
			</View>

			{/* Game Rules Summary */}
			<View style={sectionStyle}>
				<Text style={titleStyle}>Quick Rules</Text>
				<Text
					style={{
						color: "#D1D5DB", // gray-300
						fontSize: 14,
						lineHeight: 20,
					}}
				>
					• <Text style={{ color: "#FF8C00" }}>Attackers (Orange)</Text>:
					Capture the king{"\n"}•{" "}
					<Text style={{ color: "#4169E1" }}>Defenders (Blue)</Text>: Get king
					to corner{"\n"}• Pieces move like rooks in chess{"\n"}• Capture by
					surrounding pieces on opposite sides
				</Text>
			</View>
		</View>
	);
};

export default GameControls;
