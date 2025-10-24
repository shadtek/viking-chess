import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, StatusBar, Dimensions } from "react-native";
import { useGameState } from "../hooks/useGameState";
import GameBoard from "../components/GameBoard";
import GameStatus from "../components/GameStatus";
import GameControls from "../components/GameControls";
import BuiltBySpencer from "../components/BuiltBySpencer";

const GameScreen = () => {
	const [dimensions, setDimensions] = useState(Dimensions.get("window"));
	
	useEffect(() => {
		const subscription = Dimensions.addEventListener("change", ({ window }) => {
			setDimensions(window);
		});

		return () => subscription?.remove();
	}, []);

	const {
		board,
		currentPlayer,
		selectedSquare,
		gameStatus,
		winner,
		moveHistory,
		captureAnimations,
		handleSquarePress,
		resetGame,
		removeCaptureAnimation,
		isValidMoveDestination,
	} = useGameState();

	const logDimensions = (event, id) => {
		const { width, height } = event.nativeEvent.layout;
		console.log(`[${id}] Layout - Width: ${width}, Height: ${height}`);
	};

	console.log("GameScreen dimensions:", dimensions);

	// Calculate the same board width as GameBoard component for consistent alignment
	const availableWidth = dimensions.width - 32; // 16px padding on each side
	const targetBoardSize = dimensions.height * 0.6; // Same heightPercentage as GameBoard
	const boardWidth = Math.min(targetBoardSize, availableWidth);
	const squareSize = Math.floor(boardWidth / 11); // BOARD_SIZE is 11
	const actualBoardSize = squareSize * 11;

	return (
		<SafeAreaView 
			className="flex-1 bg-black"
			style={{ 
				width: dimensions.width,
				maxWidth: dimensions.width 
			}} // Explicitly constrain to screen width
			nativeID="safe-area"
			onLayout={(event) => logDimensions(event, "safe-area")}
		>
			<StatusBar barStyle="light-content" backgroundColor="#000000" />

			<ScrollView
				className="flex-1"
				style={{ width: dimensions.width }} // Constrain ScrollView to screen width
				contentContainerStyle={{ 
					flexGrow: 1,
					paddingHorizontal: 16, // Add the 16px padding here instead
				}}
				showsVerticalScrollIndicator={false}
				nativeID="main-scroll"
				onLayout={(event) => logDimensions(event, "main-scroll")}
			>
				{/* Game Status */}
				<View 
					className="pt-4"
					style={{ 
						width: actualBoardSize,
						alignSelf: 'center' 
					}}
					nativeID="game-status-container"
					onLayout={(event) => logDimensions(event, "game-status-container")}
				>
					<GameStatus
						currentPlayer={currentPlayer}
						gameStatus={gameStatus}
						winner={winner}
						moveHistory={moveHistory}
					/>
				</View>

				{/* Game Board */}
				<View 
					className="justify-center items-center" 
					style={{ alignSelf: 'center' }}
					nativeID="game-board-container"
					onLayout={(event) => logDimensions(event, "game-board-container")}
				>
					<GameBoard
						board={board}
						selectedSquare={selectedSquare}
						onSquarePress={handleSquarePress}
						isValidMoveDestination={isValidMoveDestination}
						heightPercentage={0.6} // 60% of screen height - adjust this value to dial in the size
						captureAnimations={captureAnimations}
						onCaptureAnimationComplete={removeCaptureAnimation}
					/>
				</View>

				{/* Game Controls */}
				<View 
					style={{ 
						width: actualBoardSize,
						alignSelf: 'center' 
					}}
					nativeID="game-controls-container"
					onLayout={(event) => logDimensions(event, "game-controls-container")}
				>
					<GameControls
						onResetGame={resetGame}
						isGameActive={gameStatus === "playing"}
					/>
				</View>
				
				<View 
					style={{ 
						width: actualBoardSize,
						alignSelf: 'center' 
					}}
					nativeID="built-by-spencer-container"
					onLayout={(event) => logDimensions(event, "built-by-spencer-container")}
				>
					<BuiltBySpencer />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default GameScreen;
