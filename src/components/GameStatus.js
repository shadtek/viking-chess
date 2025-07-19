import React from "react";
import { View, Text } from "react-native";

const GameStatus = ({
	currentPlayer,
	gameStatus,
	winner,
	moveHistory,
	isAiThinking,
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
			return winner === "attackers" ? "text-viking-orange" : "text-viking-blue";
		}

		if (isAiThinking) {
			return "text-yellow-400";
		}

		return currentPlayer === "attackers"
			? "text-viking-orange"
			: "text-viking-blue";
	};

	const getMoveCount = () => {
		return Math.ceil(moveHistory.length / 2);
	};

	const getCapturedPieces = () => {
		return moveHistory.reduce((total, move) => total + move.captured, 0);
	};

	return (
		<View className="bg-gray-900 p-4 mx-4 rounded-lg border border-gray-700">
			<Text
				className={`text-xl font-bold text-center mb-2 ${getCurrentPlayerColor()}`}
			>
				{getCurrentPlayerText()}
			</Text>

			<View className="flex-row justify-between items-center">
				<View className="items-center">
					<Text className="text-white text-sm">Moves</Text>
					<Text className="text-white font-bold text-lg">{getMoveCount()}</Text>
				</View>

				<View className="items-center">
					<Text className="text-white text-sm">Captures</Text>
					<Text className="text-white font-bold text-lg">
						{getCapturedPieces()}
					</Text>
				</View>

				<View className="items-center">
					<Text className="text-white text-sm">Status</Text>
					<Text className="text-green-400 font-bold text-lg">
						{gameStatus === "playing" ? "Active" : "Finished"}
					</Text>
				</View>
			</View>

			{gameStatus === "finished" && (
				<View className="mt-3 p-2 bg-gray-800 rounded">
					<Text className="text-center text-gray-300 text-sm">
						Game completed in {getMoveCount()} moves
					</Text>
				</View>
			)}
		</View>
	);
};

export default GameStatus;
