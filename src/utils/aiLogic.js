import {
	BOARD_SIZE,
	PIECE_TYPES,
	DIFFICULTY_LEVELS,
	isValidMove,
	getCapturedPieces,
	checkWinCondition,
	isCorner,
	isThrone,
} from "./gameLogic";

// AI evaluation weights for different factors
const EVALUATION_WEIGHTS = {
	[DIFFICULTY_LEVELS.EASY]: {
		pieceValue: {
			[PIECE_TYPES.KING]: 100,
			[PIECE_TYPES.DEFENDER]: 3,
			[PIECE_TYPES.ATTACKER]: 1,
		},
		kingToCornerDistance: 5,
		centerControl: 1,
		mobility: 0.5,
		captures: 2,
	},
	[DIFFICULTY_LEVELS.MEDIUM]: {
		pieceValue: {
			[PIECE_TYPES.KING]: 150,
			[PIECE_TYPES.DEFENDER]: 4,
			[PIECE_TYPES.ATTACKER]: 1,
		},
		kingToCornerDistance: 8,
		centerControl: 2,
		mobility: 1,
		captures: 3,
	},
	[DIFFICULTY_LEVELS.HARD]: {
		pieceValue: {
			[PIECE_TYPES.KING]: 200,
			[PIECE_TYPES.DEFENDER]: 5,
			[PIECE_TYPES.ATTACKER]: 1,
		},
		kingToCornerDistance: 12,
		centerControl: 3,
		mobility: 2,
		captures: 4,
	},
	[DIFFICULTY_LEVELS.EXPERT]: {
		pieceValue: {
			[PIECE_TYPES.KING]: 250,
			[PIECE_TYPES.DEFENDER]: 6,
			[PIECE_TYPES.ATTACKER]: 1,
		},
		kingToCornerDistance: 15,
		centerControl: 4,
		mobility: 3,
		captures: 5,
	},
};

// Get search depth based on difficulty
const getSearchDepth = (difficulty) => {
	switch (difficulty) {
		case DIFFICULTY_LEVELS.EASY:
			return 2;
		case DIFFICULTY_LEVELS.MEDIUM:
			return 3;
		case DIFFICULTY_LEVELS.HARD:
			return 4;
		case DIFFICULTY_LEVELS.EXPERT:
			return 5;
		default:
			return 2;
	}
};

// Evaluate board position from perspective of current player
const evaluateBoard = (board, isAttackerTurn, difficulty) => {
	const weights = EVALUATION_WEIGHTS[difficulty];
	let score = 0;

	let kingPosition = null;
	let attackerCount = 0;
	let defenderCount = 0;

	// Count pieces and find king
	for (let row = 0; row < BOARD_SIZE; row++) {
		for (let col = 0; col < BOARD_SIZE; col++) {
			const piece = board[row][col];
			if (piece === PIECE_TYPES.KING) {
				kingPosition = { row, col };
				score += weights.pieceValue[PIECE_TYPES.KING];
			} else if (piece === PIECE_TYPES.ATTACKER) {
				attackerCount++;
				score += isAttackerTurn
					? weights.pieceValue[PIECE_TYPES.ATTACKER]
					: -weights.pieceValue[PIECE_TYPES.ATTACKER];
			} else if (piece === PIECE_TYPES.DEFENDER) {
				defenderCount++;
				score += isAttackerTurn
					? -weights.pieceValue[PIECE_TYPES.DEFENDER]
					: weights.pieceValue[PIECE_TYPES.DEFENDER];
			}
		}
	}

	// King distance to nearest corner (lower is better for defenders)
	if (kingPosition) {
		const corners = [
			[0, 0],
			[0, BOARD_SIZE - 1],
			[BOARD_SIZE - 1, 0],
			[BOARD_SIZE - 1, BOARD_SIZE - 1],
		];
		const minDistance = Math.min(
			...corners.map(
				([cornerRow, cornerCol]) =>
					Math.abs(kingPosition.row - cornerRow) +
					Math.abs(kingPosition.col - cornerCol)
			)
		);

		const distanceScore =
			weights.kingToCornerDistance * (BOARD_SIZE - minDistance);
		score += isAttackerTurn ? -distanceScore : distanceScore;
	}

	// Center control bonus
	const center = Math.floor(BOARD_SIZE / 2);
	const centerArea = [];
	for (let row = center - 1; row <= center + 1; row++) {
		for (let col = center - 1; col <= center + 1; col++) {
			if (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE) {
				centerArea.push(board[row][col]);
			}
		}
	}

	const attackerCenterControl = centerArea.filter(
		(piece) => piece === PIECE_TYPES.ATTACKER
	).length;
	const defenderCenterControl = centerArea.filter(
		(piece) => piece === PIECE_TYPES.DEFENDER || piece === PIECE_TYPES.KING
	).length;

	const centerControlScore =
		weights.centerControl * (attackerCenterControl - defenderCenterControl);
	score += isAttackerTurn ? centerControlScore : -centerControlScore;

	return score;
};

// Get all possible moves for a player
const getAllMoves = (board, isAttackerTurn) => {
	const moves = [];
	const pieceTypes = isAttackerTurn
		? [PIECE_TYPES.ATTACKER]
		: [PIECE_TYPES.DEFENDER, PIECE_TYPES.KING];

	for (let fromRow = 0; fromRow < BOARD_SIZE; fromRow++) {
		for (let fromCol = 0; fromCol < BOARD_SIZE; fromCol++) {
			const piece = board[fromRow][fromCol];

			if (pieceTypes.includes(piece)) {
				// Check all possible destinations
				for (let toRow = 0; toRow < BOARD_SIZE; toRow++) {
					for (let toCol = 0; toCol < BOARD_SIZE; toCol++) {
						if (isValidMove(board, fromRow, fromCol, toRow, toCol)) {
							moves.push({
								from: { row: fromRow, col: fromCol },
								to: { row: toRow, col: toCol },
								piece,
							});
						}
					}
				}
			}
		}
	}

	return moves;
};

// Apply move to board and return new board state
const applyMove = (board, move) => {
	const newBoard = board.map((row) => [...row]);
	const { from, to, piece } = move;

	// Move piece
	newBoard[from.row][from.col] = PIECE_TYPES.EMPTY;
	newBoard[to.row][to.col] = piece;

	// Handle captures
	const captured = getCapturedPieces(newBoard, to.row, to.col, piece);
	captured.forEach(({ row, col }) => {
		newBoard[row][col] = PIECE_TYPES.EMPTY;
	});

	return newBoard;
};

// Minimax algorithm with alpha-beta pruning
const minimax = (
	board,
	depth,
	isMaximizing,
	isAttackerTurn,
	difficulty,
	alpha = -Infinity,
	beta = Infinity
) => {
	// Check for terminal states
	const winCondition = checkWinCondition(board);
	if (winCondition.winner) {
		if (winCondition.winner === "attackers") {
			return isAttackerTurn ? 10000 : -10000;
		} else {
			return isAttackerTurn ? -10000 : 10000;
		}
	}

	if (depth === 0) {
		return evaluateBoard(board, isAttackerTurn, difficulty);
	}

	const moves = getAllMoves(board, isMaximizing === isAttackerTurn);

	if (moves.length === 0) {
		return evaluateBoard(board, isAttackerTurn, difficulty);
	}

	if (isMaximizing) {
		let maxEval = -Infinity;
		for (const move of moves) {
			const newBoard = applyMove(board, move);
			const eval_ = minimax(
				newBoard,
				depth - 1,
				false,
				isAttackerTurn,
				difficulty,
				alpha,
				beta
			);
			maxEval = Math.max(maxEval, eval_);
			alpha = Math.max(alpha, eval_);
			if (beta <= alpha) break; // Alpha-beta pruning
		}
		return maxEval;
	} else {
		let minEval = Infinity;
		for (const move of moves) {
			const newBoard = applyMove(board, move);
			const eval_ = minimax(
				newBoard,
				depth - 1,
				true,
				isAttackerTurn,
				difficulty,
				alpha,
				beta
			);
			minEval = Math.min(minEval, eval_);
			beta = Math.min(beta, eval_);
			if (beta <= alpha) break; // Alpha-beta pruning
		}
		return minEval;
	}
};

// Get best move for AI
export const getAIMove = (
	board,
	isAttackerTurn,
	difficulty = DIFFICULTY_LEVELS.MEDIUM
) => {
	const depth = getSearchDepth(difficulty);
	const moves = getAllMoves(board, isAttackerTurn);

	if (moves.length === 0) {
		return null;
	}

	// Add some randomness for lower difficulties
	let randomFactor = 0;
	switch (difficulty) {
		case DIFFICULTY_LEVELS.EASY:
			randomFactor = 0.3;
			break;
		case DIFFICULTY_LEVELS.MEDIUM:
			randomFactor = 0.15;
			break;
		case DIFFICULTY_LEVELS.HARD:
			randomFactor = 0.05;
			break;
		case DIFFICULTY_LEVELS.EXPERT:
			randomFactor = 0;
			break;
	}

	let bestMove = null;
	let bestScore = -Infinity;

	// Evaluate each move
	const moveScores = moves.map((move) => {
		const newBoard = applyMove(board, move);
		let score = minimax(newBoard, depth - 1, false, isAttackerTurn, difficulty);

		// Add randomness
		if (randomFactor > 0) {
			score += (Math.random() - 0.5) * randomFactor * 1000;
		}

		return { move, score };
	});

	// Sort by score and pick the best
	moveScores.sort((a, b) => b.score - a.score);
	bestMove = moveScores[0].move;

	return bestMove;
};

// Get move hint for player
export const getMoveHint = (
	board,
	isAttackerTurn,
	difficulty = DIFFICULTY_LEVELS.MEDIUM
) => {
	return getAIMove(board, isAttackerTurn, difficulty);
};
