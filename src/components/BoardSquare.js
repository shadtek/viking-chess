import React from "react";
import { TouchableOpacity, View } from "react-native";
import { isCorner, isThrone } from "../utils/gameLogic";
import GamePiece from "./GamePiece";

const BoardSquare = ({
	row,
	col,
	piece,
	isSelected,
	isValidMove,
	onPress,
	size = 28,
}) => {
	const getSquareStyle = () => {
		let baseStyle = `w-${size} h-${size} border border-white items-center justify-center`;

		// Special squares styling
		if (isThrone(row, col)) {
			baseStyle += " bg-gray-700";
		} else if (isCorner(row, col)) {
			baseStyle += " bg-gray-600";
		} else {
			baseStyle += " bg-black";
		}

		// Highlight valid moves
		if (isValidMove) {
			baseStyle += " bg-green-400 bg-opacity-50";
		}

		return baseStyle;
	};

	return (
		<TouchableOpacity
			className={getSquareStyle()}
			onPress={() => onPress(row, col)}
			activeOpacity={0.7}
		>
			<View className="absolute inset-0 items-center justify-center">
				<GamePiece
					piece={piece}
					isSelected={isSelected}
					size={Math.floor(size * 0.8)}
				/>
			</View>

			{/* Valid move indicator */}
			{isValidMove && (
				<View className="absolute inset-0 items-center justify-center">
					<View className="w-2 h-2 bg-green-500 rounded-full" />
				</View>
			)}
		</TouchableOpacity>
	);
};

export default BoardSquare;
