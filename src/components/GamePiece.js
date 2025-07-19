import React from "react";
import { View, Text } from "react-native";
import { PIECE_TYPES } from "../utils/gameLogic";

const GamePiece = ({ piece, isSelected, size = 24 }) => {
	if (piece === PIECE_TYPES.EMPTY) {
		return null;
	}

	const getPieceStyle = () => {
		let backgroundColor, borderColor;

		switch (piece) {
			case PIECE_TYPES.ATTACKER:
				backgroundColor = "#FF8C00"; // viking-orange
				borderColor = "#EA580C"; // orange-600
				break;
			case PIECE_TYPES.DEFENDER:
				backgroundColor = "#4169E1"; // viking-blue
				borderColor = "#2563EB"; // blue-600
				break;
			case PIECE_TYPES.KING:
				backgroundColor = "#8A2BE2"; // viking-purple
				borderColor = "#9333EA"; // purple-600
				break;
			default:
				backgroundColor = "#000000";
				borderColor = "#FFFFFF";
		}

		return {
			width: size,
			height: size,
			borderRadius: size / 2,
			borderWidth: isSelected ? 4 : 2,
			borderColor: isSelected ? "#FACC15" : borderColor, // yellow-400 when selected
			backgroundColor,
			alignItems: "center",
			justifyContent: "center",
		};
	};

	const getPieceSymbol = () => {
		switch (piece) {
			case PIECE_TYPES.ATTACKER:
				return "⚔";
			case PIECE_TYPES.DEFENDER:
				return "🛡";
			case PIECE_TYPES.KING:
				return "♔";
			default:
				return "";
		}
	};

	return (
		<View style={getPieceStyle()}>
			<Text
				style={{
					fontSize: size * 0.6,
					color: "#FFFFFF",
					fontWeight: "bold",
					textAlign: "center",
				}}
			>
				{getPieceSymbol()}
			</Text>
		</View>
	);
};

export default GamePiece;
