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
		let backgroundColor = "#000000"; // black

		// Special squares styling
		if (isThrone(row, col)) {
			backgroundColor = "#374151"; // gray-700
		} else if (isCorner(row, col)) {
			backgroundColor = "#4B5563"; // gray-600
		}

		// Highlight valid moves
		if (isValidMove) {
			backgroundColor = "#34D399"; // green-400 with opacity
		}

		return {
			width: size,
			height: size,
			backgroundColor,
			borderWidth: 1,
			borderColor: "#FFFFFF",
			alignItems: "center",
			justifyContent: "center",
		};
	};

	return (
		<TouchableOpacity
			style={getSquareStyle()}
			onPress={() => onPress(row, col)}
			activeOpacity={0.7}
		>
			<View
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<GamePiece
					piece={piece}
					isSelected={isSelected}
					size={Math.floor(size * 0.8)}
				/>
			</View>

			{/* Valid move indicator */}
			{isValidMove && (
				<View
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<View
						style={{
							width: 8,
							height: 8,
							backgroundColor: "#10B981",
							borderRadius: 4,
						}}
					/>
				</View>
			)}
		</TouchableOpacity>
	);
};

export default BoardSquare;
