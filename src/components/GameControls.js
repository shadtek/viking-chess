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
				return "bg-green-600";
			case DIFFICULTY_LEVELS.MEDIUM:
				return "bg-yellow-600";
			case DIFFICULTY_LEVELS.HARD:
				return "bg-red-600";
			case DIFFICULTY_LEVELS.EXPERT:
				return "bg-purple-600";
			default:
				return "bg-gray-600";
		}
	};

	return (
		<View className="p-4 space-y-4">
			{/* Game Mode Selection */}
			<View className="bg-gray-900 p-4 rounded-lg border border-gray-700">
				<Text className="text-white text-lg font-bold mb-3 text-center">
					Game Mode
				</Text>
				<View className="flex-row space-x-2">
					<TouchableOpacity
						className={`flex-1 p-3 rounded-lg ${
							gameMode === "pvp" ? "bg-blue-600" : "bg-gray-700"
						}`}
						onPress={() => onGameModeChange("pvp")}
					>
						<Text className="text-white text-center font-semibold">
							Player vs Player
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						className={`flex-1 p-3 rounded-lg ${
							gameMode === "ai" ? "bg-blue-600" : "bg-gray-700"
						}`}
						onPress={() => onGameModeChange("ai")}
					>
						<Text className="text-white text-center font-semibold">vs AI</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* AI Difficulty Selection */}
			{gameMode === "ai" && (
				<View className="bg-gray-900 p-4 rounded-lg border border-gray-700">
					<Text className="text-white text-lg font-bold mb-3 text-center">
						AI Difficulty
					</Text>
					<View className="grid grid-cols-2 gap-2">
						{Object.values(DIFFICULTY_LEVELS).map((difficulty) => (
							<TouchableOpacity
								key={difficulty}
								className={`p-3 rounded-lg ${
									aiDifficulty === difficulty
										? getDifficultyColor(difficulty)
										: "bg-gray-700"
								}`}
								onPress={() => onDifficultyChange(difficulty)}
							>
								<Text className="text-white text-center font-semibold capitalize">
									{difficulty}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>
			)}

			{/* Game Actions */}
			<View className="bg-gray-900 p-4 rounded-lg border border-gray-700">
				<Text className="text-white text-lg font-bold mb-3 text-center">
					Game Actions
				</Text>
				<TouchableOpacity
					className="bg-red-600 p-3 rounded-lg"
					onPress={handleResetPress}
				>
					<Text className="text-white text-center font-semibold">New Game</Text>
				</TouchableOpacity>
			</View>

			{/* Game Rules Summary */}
			<View className="bg-gray-900 p-4 rounded-lg border border-gray-700">
				<Text className="text-white text-lg font-bold mb-2 text-center">
					Quick Rules
				</Text>
				<Text className="text-gray-300 text-sm leading-5">
					• <Text className="text-viking-orange">Attackers (Orange)</Text>:
					Capture the king{"\n"}•{" "}
					<Text className="text-viking-blue">Defenders (Blue)</Text>: Get king
					to corner{"\n"}• Pieces move like rooks in chess{"\n"}• Capture by
					surrounding pieces{"\n"}• King needs 4 sides surrounded to capture
				</Text>
			</View>
		</View>
	);
};

export default GameControls;
