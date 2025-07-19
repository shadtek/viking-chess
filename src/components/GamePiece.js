import React from "react";
import { View, Text } from "react-native";
import { PIECE_TYPES } from "../utils/gameLogic";

const GamePiece = ({ piece, isSelected, size = 24 }) => {
	if (piece === PIECE_TYPES.EMPTY) {
		return null;
	}

	const getPieceStyle = () => {
		const baseStyle = `w-${size} h-${size} rounded-full border-2 items-center justify-center`;

		switch (piece) {
			case PIECE_TYPES.ATTACKER:
				return `${baseStyle} bg-viking-orange border-orange-600`;
			case PIECE_TYPES.DEFENDER:
				return `${baseStyle} bg-viking-blue border-blue-600`;
			case PIECE_TYPES.KING:
				return `${baseStyle} bg-viking-purple border-purple-600`;
			default:
				return baseStyle;
		}
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

	const selectedStyle = isSelected ? "border-yellow-400 border-4" : "";

	return (
		<View className={`${getPieceStyle()} ${selectedStyle}`}>
			<Text
				className="text-white font-bold text-center"
				style={{ fontSize: size * 0.6 }}
			>
				{getPieceSymbol()}
			</Text>
		</View>
	);
};

export default GamePiece;
