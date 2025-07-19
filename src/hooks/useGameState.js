import { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	createInitialBoard,
	isValidMove,
	getCapturedPieces,
	checkWinCondition,
	PIECE_TYPES,
	DIFFICULTY_LEVELS,
} from "../utils/gameLogic";
import { getAIMove } from "../utils/aiLogic";

const STORAGE_KEY = "hnefatafl_game_state";

export const useGameState = () => {
	const [board, setBoard] = useState(createInitialBoard());
	const [currentPlayer, setCurrentPlayer] = useState("defenders"); // 'attackers' or 'defenders'
	const [selectedSquare, setSelectedSquare] = useState(null);
	const [gameMode, setGameMode] = useState("ai"); // 'pvp', 'ai'
	const [aiDifficulty, setAiDifficulty] = useState(DIFFICULTY_LEVELS.EASY);
	const [gameStatus, setGameStatus] = useState("playing"); // 'playing', 'finished'
	const [winner, setWinner] = useState(null);
	const [moveHistory, setMoveHistory] = useState([]);
	const [isAiThinking, setIsAiThinking] = useState(false);
	const [captureAnimations, setCaptureAnimations] = useState([]); // Track active capture animations

	// Save game state to AsyncStorage
	const saveGameState = useCallback(async (gameState) => {
		try {
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
		} catch (error) {
			console.error("Error saving game state:", error);
		}
	}, []);

	// Load game state from AsyncStorage
	const loadGameState = useCallback(async () => {
		try {
			const savedState = await AsyncStorage.getItem(STORAGE_KEY);
			if (savedState) {
				const gameState = JSON.parse(savedState);
				setBoard(gameState.board || createInitialBoard());
				setCurrentPlayer(gameState.currentPlayer || "defenders");
				setGameMode(gameState.gameMode || "ai");
				setAiDifficulty(gameState.aiDifficulty || DIFFICULTY_LEVELS.EASY);
				setGameStatus(gameState.gameStatus || "playing");
				setWinner(gameState.winner || null);
				setMoveHistory(gameState.moveHistory || []);
			}
		} catch (error) {
			console.error("Error loading game state:", error);
		}
	}, []);

	// Reset game to initial state
	const resetGame = useCallback(() => {
		console.log("resetGame function called");
		const newBoard = createInitialBoard();
		setBoard(newBoard);
		setCurrentPlayer("defenders");
		setSelectedSquare(null);
		setGameStatus("playing");
		setWinner(null);
		setMoveHistory([]);
		setIsAiThinking(false);
		setCaptureAnimations([]); // Clear any active animations

		const newGameState = {
			board: newBoard,
			currentPlayer: "defenders",
			gameMode,
			aiDifficulty,
			gameStatus: "playing",
			winner: null,
			moveHistory: [],
		};
		saveGameState(newGameState);
		console.log("Game reset completed");
	}, [gameMode, aiDifficulty, saveGameState]);

	// Remove completed capture animation
	const removeCaptureAnimation = useCallback((animationId) => {
		setCaptureAnimations((prev) =>
			prev.filter((anim) => anim.id !== animationId)
		);
	}, []);

	// Handle square selection
	const handleSquarePress = useCallback(
		(row, col) => {
			if (gameStatus !== "playing") return;
			if (isAiThinking) return;
			if (gameMode === "ai" && currentPlayer === "attackers") return; // AI turn

			const piece = board[row][col];

			if (selectedSquare) {
				const { row: fromRow, col: fromCol } = selectedSquare;

				// If clicking the same square, deselect
				if (fromRow === row && fromCol === col) {
					setSelectedSquare(null);
					return;
				}

				// Try to make a move
				if (isValidMove(board, fromRow, fromCol, row, col)) {
					makeMove(fromRow, fromCol, row, col);
				} else {
					// Select new piece if it belongs to current player
					const isPlayerPiece =
						(currentPlayer === "attackers" && piece === PIECE_TYPES.ATTACKER) ||
						(currentPlayer === "defenders" &&
							(piece === PIECE_TYPES.DEFENDER || piece === PIECE_TYPES.KING));

					if (isPlayerPiece) {
						setSelectedSquare({ row, col });
					} else {
						setSelectedSquare(null);
					}
				}
			} else {
				// Select piece if it belongs to current player
				const isPlayerPiece =
					(currentPlayer === "attackers" && piece === PIECE_TYPES.ATTACKER) ||
					(currentPlayer === "defenders" &&
						(piece === PIECE_TYPES.DEFENDER || piece === PIECE_TYPES.KING));

				if (isPlayerPiece) {
					setSelectedSquare({ row, col });
				}
			}
		},
		[board, selectedSquare, currentPlayer, gameStatus, gameMode, isAiThinking]
	);

	// Make a move
	const makeMove = useCallback(
		(fromRow, fromCol, toRow, toCol) => {
			const newBoard = board.map((row) => [...row]);
			const piece = newBoard[fromRow][fromCol];

			// Move the piece
			newBoard[fromRow][fromCol] = PIECE_TYPES.EMPTY;
			newBoard[toRow][toCol] = piece;

			// Handle captures
			const captured = getCapturedPieces(newBoard, toRow, toCol, piece);

			// Trigger capture animations if there are captures
			if (captured.length > 0) {
				const newAnimations = captured.map(({ row, col }, index) => ({
					id: Date.now() + index, // Unique ID for each animation
					row,
					col,
				}));
				setCaptureAnimations((prev) => [...prev, ...newAnimations]);
			}

			captured.forEach(({ row, col }) => {
				newBoard[row][col] = PIECE_TYPES.EMPTY;
			});

			// Record move
			const move = {
				from: { row: fromRow, col: fromCol },
				to: { row: toRow, col: toCol },
				piece,
				captured: captured.length,
				player: currentPlayer,
			};

			const newMoveHistory = [...moveHistory, move];
			const newCurrentPlayer =
				currentPlayer === "attackers" ? "defenders" : "attackers";

			// Check win condition
			const winCondition = checkWinCondition(newBoard);

			setBoard(newBoard);
			setMoveHistory(newMoveHistory);
			setSelectedSquare(null);

			if (winCondition.winner) {
				setGameStatus("finished");
				setWinner(winCondition.winner);
			} else {
				setCurrentPlayer(newCurrentPlayer);
			}

			// Save game state
			const newGameState = {
				board: newBoard,
				currentPlayer: winCondition.winner ? currentPlayer : newCurrentPlayer,
				gameMode,
				aiDifficulty,
				gameStatus: winCondition.winner ? "finished" : "playing",
				winner: winCondition.winner,
				moveHistory: newMoveHistory,
			};
			saveGameState(newGameState);
		},
		[board, currentPlayer, moveHistory, gameMode, aiDifficulty, saveGameState]
	);

	// AI move execution
	const executeAIMove = useCallback(async () => {
		if (
			gameMode !== "ai" ||
			currentPlayer !== "attackers" ||
			gameStatus !== "playing"
		) {
			return;
		}

		setIsAiThinking(true);

		// Add delay to show AI is thinking, but use shorter delay for expert to prevent long waits
		const thinkingDelay =
			aiDifficulty === DIFFICULTY_LEVELS.EXPERT
				? 500
				: 1000 + Math.random() * 2000;

		setTimeout(() => {
			try {
				console.log("AI calculating move with difficulty:", aiDifficulty);
				const aiMove = getAIMove(board, true, aiDifficulty);

				if (aiMove) {
					console.log("AI move found:", aiMove);
					makeMove(
						aiMove.from.row,
						aiMove.from.col,
						aiMove.to.row,
						aiMove.to.col
					);
				} else {
					console.warn("AI could not find a valid move");
				}
			} catch (error) {
				console.error("Error in AI move calculation:", error);
			} finally {
				setIsAiThinking(false);
			}
		}, thinkingDelay);
	}, [board, currentPlayer, gameMode, gameStatus, aiDifficulty, makeMove]);

	// Effect to trigger AI moves
	useEffect(() => {
		if (
			gameMode === "ai" &&
			currentPlayer === "attackers" &&
			gameStatus === "playing"
		) {
			executeAIMove();
		}
	}, [currentPlayer, gameMode, gameStatus, executeAIMove]);

	// Load saved game on component mount
	useEffect(() => {
		loadGameState();
	}, [loadGameState]);

	// Get valid moves for selected piece
	const getValidMoves = useCallback(
		(fromRow, fromCol) => {
			if (!selectedSquare) return [];

			const validMoves = [];
			for (let row = 0; row < board.length; row++) {
				for (let col = 0; col < board[0].length; col++) {
					if (isValidMove(board, fromRow, fromCol, row, col)) {
						validMoves.push({ row, col });
					}
				}
			}
			return validMoves;
		},
		[board, selectedSquare]
	);

	// Check if a square is a valid move destination
	const isValidMoveDestination = useCallback(
		(row, col) => {
			if (!selectedSquare) return false;
			return isValidMove(
				board,
				selectedSquare.row,
				selectedSquare.col,
				row,
				col
			);
		},
		[board, selectedSquare]
	);

	return {
		// Game state
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

		// Actions
		handleSquarePress,
		resetGame,
		setGameMode,
		setAiDifficulty,
		removeCaptureAnimation,

		// Utilities
		getValidMoves,
		isValidMoveDestination,

		// Save/Load
		saveGameState,
		loadGameState,
	};
};
