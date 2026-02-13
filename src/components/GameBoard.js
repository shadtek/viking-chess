import React, { useState, useEffect } from "react";
import { View, ScrollView, Dimensions, Text } from "react-native";
import BoardSquare from "./BoardSquare";
import CaptureAnimation from "./CaptureAnimation";
import { BOARD_SIZE } from "../utils/gameLogic";

const GameBoard = ({
	board,
	selectedSquare,
	onSquarePress,
	isValidMoveDestination,
	captureAnimations,
	onCaptureAnimationComplete,
	heightPercentage = 0.6, // Default to 60% of screen height
}) => {
	const [dimensions, setDimensions] = useState(Dimensions.get("window"));
	
	useEffect(() => {
		const subscription = Dimensions.addEventListener("change", ({ window }) => {
			setDimensions(window);
		});

		return () => subscription?.remove();
	}, []);
	
	// Calculate board size based on screen height percentage with 16px padding
	const availableWidth = dimensions.width - 32; // 16px padding on each side (handled by parent ScrollView)
	const targetBoardSize = dimensions.height * heightPercentage;
	const boardWidth = Math.min(targetBoardSize, availableWidth);
	const squareSize = Math.floor(boardWidth / BOARD_SIZE);
	const actualBoardSize = squareSize * BOARD_SIZE; // The actual board size after rounding

	console.log("Dimensions:", dimensions);
	console.log("Available width:", availableWidth);
	console.log("Target board size:", targetBoardSize);
	console.log("Calculated board width:", boardWidth);
	console.log("Square size:", squareSize);
	console.log("Actual board size:", actualBoardSize);

	const logDimensions = (event, id) => {
		const { width, height } = event.nativeEvent.layout;
		console.log(`[${id}] Layout - Width: ${width}, Height: ${height}`);
	};

	return (
		<View 
			style={{ 
				alignItems: "center",
				justifyContent: "center",
				width: actualBoardSize,
				height: actualBoardSize,
			}}
			nativeID="gameboard-outer"
			onLayout={(event) => logDimensions(event, "gameboard-outer")}
		>
			{/* Game board */}
			<View
				style={{
					width: actualBoardSize,
					height: actualBoardSize,
					borderColor: "#FFFFFF",
					backgroundColor: "#000000",
					position: "relative",
				}}
				nativeID="gameboard-inner"
				onLayout={(event) => logDimensions(event, "gameboard-inner")}
			>
						{board.map((row, rowIndex) => (
							<View key={rowIndex} style={{ flexDirection: "row" }}>
								{row.map((piece, colIndex) => (
									<BoardSquare
										key={`${rowIndex}-${colIndex}`}
										row={rowIndex}
										col={colIndex}
										piece={piece}
										isSelected={
											selectedSquare &&
											selectedSquare.row === rowIndex &&
											selectedSquare.col === colIndex
										}
										isValidMove={isValidMoveDestination(rowIndex, colIndex)}
										onPress={onSquarePress}
										size={squareSize}
									/>
								))}
							</View>
						))}

						{/* Render capture animations */}
						{captureAnimations &&
							captureAnimations.map((animation) => (
								<CaptureAnimation
									key={animation.id}
									row={animation.row}
									col={animation.col}
									squareSize={squareSize}
									onComplete={() => onCaptureAnimationComplete(animation.id)}
								/>
							))}
			</View>
		</View>
	);
};

export default GameBoard;
