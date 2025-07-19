import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
import BoardSquare from "./BoardSquare";
import { BOARD_SIZE } from "../utils/gameLogic";

const GameBoard = ({
	board,
	selectedSquare,
	onSquarePress,
	isValidMoveDestination,
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
			<View
				style={{
					width: squareSize * BOARD_SIZE,
					height: squareSize * BOARD_SIZE,
					borderWidth: 2,
					borderColor: "#FFFFFF",
					backgroundColor: "#000000",
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
			</View>
		</ScrollView>
	);
};

export default GameBoard;
