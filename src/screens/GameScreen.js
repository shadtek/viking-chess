import React from "react";
import { View, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { useGameState } from "../hooks/useGameState";
import GameBoard from "../components/GameBoard";
import GameStatus from "../components/GameStatus";
import GameControls from "../components/GameControls";

const GameScreen = () => {
	const {
		board,
		currentPlayer,
		selectedSquare,
		gameMode,
		aiDifficulty,
		gameStatus,
		winner,
		moveHistory,
		isAiThinking,
		captureAnimations,
		handleSquarePress,
		resetGame,
		setGameMode,
		setAiDifficulty,
		removeCaptureAnimation,
		isValidMoveDestination,
	} = useGameState();

	const handleGameModeChange = (newMode) => {
		setGameMode(newMode);
		resetGame();
	};

	const handleDifficultyChange = (newDifficulty) => {
		setAiDifficulty(newDifficulty);
		if (gameMode === "ai") {
			resetGame();
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-black">
			<StatusBar barStyle="light-content" backgroundColor="#000000" />

			<ScrollView
				className="flex-1"
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
			>
				{/* Game Status */}
				<View className="pt-4">
					<GameStatus
						currentPlayer={currentPlayer}
						gameStatus={gameStatus}
						winner={winner}
						moveHistory={moveHistory}
						isAiThinking={isAiThinking}
						gameMode={gameMode}
						aiDifficulty={aiDifficulty}
					/>
				</View>

				{/* Game Board */}
				<View className="flex-1 justify-center">
					<GameBoard
						board={board}
						selectedSquare={selectedSquare}
						onSquarePress={handleSquarePress}
						isValidMoveDestination={isValidMoveDestination}
						maxWidth={320}
						captureAnimations={captureAnimations}
						onCaptureAnimationComplete={removeCaptureAnimation}
					/>
				</View>

				{/* Game Controls */}
				<GameControls
					gameMode={gameMode}
					aiDifficulty={aiDifficulty}
					onGameModeChange={handleGameModeChange}
					onDifficultyChange={handleDifficultyChange}
					onResetGame={resetGame}
					isGameActive={gameStatus === "playing"}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default GameScreen;
