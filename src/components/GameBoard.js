import React from "react";
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
	maxWidth = 320,
}) => {
	const screenWidth = Dimensions.get("window").width;
	const boardWidth = Math.min(maxWidth, screenWidth - 40);
	const squareSize = Math.floor(boardWidth / BOARD_SIZE);

	return (
		<ScrollView
			contentContainerStyle={{
				alignItems: "center",
				justifyContent: "center",
				paddingVertical: 20,
				flex: 1,
			}}
			style={{ flex: 1 }}
		>
			<View style={{ alignItems: "center" }}>
				{/* Column labels */}
				<View style={{ flexDirection: "row", marginBottom: 5 }}>
					<View style={{ width: 20 }} />
					{Array.from({ length: BOARD_SIZE }, (_, i) => (
						<Text
							key={i}
							style={{
								width: squareSize,
								textAlign: "center",
								color: "#000000",
								fontSize: 12,
								fontWeight: "bold",
							}}
						>
							{i}
						</Text>
					))}
				</View>

				<View style={{ flexDirection: "row" }}>
					{/* Row labels */}
					<View style={{ justifyContent: "space-around", marginRight: 5 }}>
						{Array.from({ length: BOARD_SIZE }, (_, i) => (
							<Text
								key={i}
								style={{
									height: squareSize,
									lineHeight: squareSize,
									textAlign: "center",
									color: "#000000",
									fontSize: 12,
									fontWeight: "bold",
									width: 20,
								}}
							>
								{i}
							</Text>
						))}
					</View>

					{/* Game board */}
					<View
						style={{
							width: squareSize * BOARD_SIZE,
							height: squareSize * BOARD_SIZE,
							borderWidth: 2,
							borderColor: "#FFFFFF",
							backgroundColor: "#000000",
							position: "relative",
						}}
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
			</View>
		</ScrollView>
	);
};

export default GameBoard;
