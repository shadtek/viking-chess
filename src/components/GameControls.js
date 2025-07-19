import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { DIFFICULTY_LEVELS } from "../utils/gameLogic";

const GameControls = ({
	gameMode,
	aiDifficulty,
	onGameModeChange,
	onDifficultyChange,
	onResetGame,
	isGameActive,
}) => {
	const handleResetPress = () => {
		Alert.alert("Reset Game", "Are you sure you want to start a new game?", [
			{ text: "Cancel", style: "cancel" },
			{ text: "Reset", style: "destructive", onPress: onResetGame },
		]);
	};

	const getDifficultyColor = (difficulty) => {
		switch (difficulty) {
			case DIFFICULTY_LEVELS.EASY:
				return "#16A34A"; // green-600
			case DIFFICULTY_LEVELS.MEDIUM:
				return "#CA8A04"; // yellow-600
			case DIFFICULTY_LEVELS.HARD:
				return "#DC2626"; // red-600
			case DIFFICULTY_LEVELS.EXPERT:
				return "#9333EA"; // purple-600
			default:
				return "#4B5563"; // gray-600
		}
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

	const buttonRowStyle = {
		flexDirection: "row",
		gap: 8,
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

	const difficultyGridStyle = {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	};

	const difficultyButtonStyle = (difficulty) => ({
		width: "48%",
		padding: 12,
		borderRadius: 8,
		backgroundColor:
			aiDifficulty === difficulty ? getDifficultyColor(difficulty) : "#374151", // gray-700
	});

	return (
		<View style={containerStyle}>
			{/* Game Mode Selection */}
			<View style={sectionStyle}>
				<Text style={titleStyle}>Game Mode</Text>
				<View style={buttonRowStyle}>
					<TouchableOpacity
						style={getButtonStyle(gameMode === "pvp")}
						onPress={() => onGameModeChange("pvp")}
					>
						<Text style={buttonTextStyle}>Player vs Player</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={getButtonStyle(gameMode === "ai")}
						onPress={() => onGameModeChange("ai")}
					>
						<Text style={buttonTextStyle}>vs AI</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* AI Difficulty Selection */}
			{gameMode === "ai" && (
				<View style={sectionStyle}>
					<Text style={titleStyle}>AI Difficulty</Text>
					<View style={difficultyGridStyle}>
						{Object.values(DIFFICULTY_LEVELS).map((difficulty) => (
							<TouchableOpacity
								key={difficulty}
								style={difficultyButtonStyle(difficulty)}
								onPress={() => onDifficultyChange(difficulty)}
							>
								<Text
									style={{ ...buttonTextStyle, textTransform: "capitalize" }}
								>
									{difficulty}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>
			)}

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
					surrounding pieces{"\n"}• King needs 4 sides surrounded to capture
				</Text>
			</View>
		</View>
	);
};

export default GameControls;
