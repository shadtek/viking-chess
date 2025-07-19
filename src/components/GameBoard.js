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
			}}
			className="flex-1"
		>
			<View
				className="border-2 border-white bg-black"
				style={{
					width: squareSize * BOARD_SIZE,
					height: squareSize * BOARD_SIZE,
				}}
			>
				{board.map((row, rowIndex) => (
					<View key={rowIndex} className="flex-row">
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
