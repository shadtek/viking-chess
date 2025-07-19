import React from "react";
import { View, Text } from "react-native";

const GameStatus = ({
	currentPlayer,
	gameStatus,
	winner,
	moveHistory,
	isAiThinking,
	gameMode,
	aiDifficulty,
}) => {
	const getCurrentPlayerText = () => {
		if (gameStatus === "finished") {
			return winner === "attackers" ? "Attackers Win!" : "Defenders Win!";
		}

		if (isAiThinking) {
			return "AI is thinking...";
		}

		return currentPlayer === "attackers"
			? "Attackers' Turn"
			: "Defenders' Turn";
	};

	const getCurrentPlayerColor = () => {
		if (gameStatus === "finished") {
			return winner === "attackers" ? "#FF8C00" : "#4169E1"; // viking-orange : viking-blue
		}

		if (isAiThinking) {
			return "#FACC15"; // yellow-400
		}

		return currentPlayer === "attackers"
			? "#FF8C00" // viking-orange
			: "#4169E1"; // viking-blue
	};

	const getMoveCount = () => {
		return Math.ceil(moveHistory.length / 2);
	};

	const getCapturedPieces = () => {
		return moveHistory.reduce((total, move) => total + move.captured, 0);
	};

	const getGameModeText = () => {
		if (gameMode === "ai") {
			return `vs AI (${
				aiDifficulty.charAt(0).toUpperCase() + aiDifficulty.slice(1)
			})`;
		}
		return "Player vs Player";
	};

	const containerStyle = {
		backgroundColor: "#111827", // gray-900
		padding: 16,
		marginHorizontal: 16,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#374151", // gray-700
	};

	const mainTextStyle = {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 8,
		color: getCurrentPlayerColor(),
	};

	const gameModeStyle = {
		textAlign: "center",
		marginBottom: 16,
		color: "#9CA3AF", // gray-400
		fontSize: 14,
		fontWeight: "600",
	};

	const statsRowStyle = {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	};

	const statItemStyle = {
		alignItems: "center",
	};

	const statLabelStyle = {
		color: "#FFFFFF",
		fontSize: 12,
	};

	const statValueStyle = {
		color: "#FFFFFF",
		fontWeight: "bold",
		fontSize: 18,
	};

	const statusValueStyle = {
		color: "#10B981", // green-400
		fontWeight: "bold",
		fontSize: 18,
	};

	const finishedContainerStyle = {
		marginTop: 12,
		padding: 8,
		backgroundColor: "#1F2937", // gray-800
		borderRadius: 6,
	};

	const finishedTextStyle = {
		textAlign: "center",
		color: "#D1D5DB", // gray-300
		fontSize: 12,
	};

	return (
		<View style={containerStyle}>
			<Text style={mainTextStyle}>{getCurrentPlayerText()}</Text>

			<Text style={gameModeStyle}>{getGameModeText()}</Text>

			<View style={statsRowStyle}>
				<View style={statItemStyle}>
					<Text style={statLabelStyle}>Moves</Text>
					<Text style={statValueStyle}>{getMoveCount()}</Text>
				</View>

				<View style={statItemStyle}>
					<Text style={statLabelStyle}>Captures</Text>
					<Text style={statValueStyle}>{getCapturedPieces()}</Text>
				</View>

				<View style={statItemStyle}>
					<Text style={statLabelStyle}>Status</Text>
					<Text style={statusValueStyle}>
						{gameStatus === "playing" ? "Active" : "Finished"}
					</Text>
				</View>
			</View>

			{gameStatus === "finished" && (
				<View style={finishedContainerStyle}>
					<Text style={finishedTextStyle}>
						Game completed in {getMoveCount()} moves
					</Text>
				</View>
			)}
		</View>
	);
};

export default GameStatus;
