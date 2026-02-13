// Hnefatafl Game Constants and Logic
// Helper to check if a piece is an attacker
export const isAttacker = (piece) => piece === PIECE_TYPES.ATTACKER;

// Helper to check if a piece is a defender (includes king)
export const isDefender = (piece) =>
  piece === PIECE_TYPES.DEFENDER || piece === PIECE_TYPES.KING;

// Helper to check if two pieces are on the same team
export const isSameTeam = (piece1, piece2) => {
  if (piece1 === PIECE_TYPES.EMPTY || piece2 === PIECE_TYPES.EMPTY)
    return false;
  return (
    (isAttacker(piece1) && isAttacker(piece2)) ||
    (isDefender(piece1) && isDefender(piece2))
  );
};
export const BOARD_SIZE = 11;
export const PIECE_TYPES = {
  ATTACKER: "attacker",
  DEFENDER: "defender",
  KING: "king",
  EMPTY: "empty",
};

// Initial board setup for 11x11 Hnefatafl
export const createInitialBoard = () => {
  const board = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(PIECE_TYPES.EMPTY));

  // Place attackers (orange pieces)
  // Top row
  for (let i = 3; i <= 7; i++) {
    board[0][i] = PIECE_TYPES.ATTACKER;
  }
  // Left column
  for (let i = 3; i <= 7; i++) {
    board[i][0] = PIECE_TYPES.ATTACKER;
  }
  // Right column
  for (let i = 3; i <= 7; i++) {
    board[i][10] = PIECE_TYPES.ATTACKER;
  }
  // Bottom row
  for (let i = 3; i <= 7; i++) {
    board[10][i] = PIECE_TYPES.ATTACKER;
  }

  // Additional attackers
  board[1][5] = PIECE_TYPES.ATTACKER;
  board[9][5] = PIECE_TYPES.ATTACKER;
  board[5][1] = PIECE_TYPES.ATTACKER;
  board[5][9] = PIECE_TYPES.ATTACKER;

  // Place defenders (blue pieces) in cross formation around king
  const defenderPositions = [
    [3, 5],
    [4, 4],
    [4, 5],
    [4, 6],
    [5, 3],
    [5, 4],
    [5, 6],
    [5, 7],
    [6, 4],
    [6, 5],
    [6, 6],
    [7, 5],
  ];

  defenderPositions.forEach(([row, col]) => {
    board[row][col] = PIECE_TYPES.DEFENDER;
  });

  // Place king (purple piece) in center
  board[5][5] = PIECE_TYPES.KING;

  return board;
};

// Check if a position is a corner (throne or fortress)
export const isCorner = (row, col) => {
  return (
    (row === 0 && col === 0) ||
    (row === 0 && col === BOARD_SIZE - 1) ||
    (row === BOARD_SIZE - 1 && col === 0) ||
    (row === BOARD_SIZE - 1 && col === BOARD_SIZE - 1)
  );
};

// Check if a position is the throne (center)
export const isThrone = (row, col) => {
  const center = Math.floor(BOARD_SIZE / 2);
  return row === center && col === center;
};

// Check if a move is valid
export const isValidMove = (board, fromRow, fromCol, toRow, toCol) => {
  // Check bounds
  if (toRow < 0 || toRow >= BOARD_SIZE || toCol < 0 || toCol >= BOARD_SIZE) {
    console.log("Move rejected: out of bounds");
    return false;
  }

  // Check if destination is empty
  if (board[toRow][toCol] !== PIECE_TYPES.EMPTY) {
    console.log("Move rejected: destination not empty");
    return false;
  }

  // Check if moving in straight line (horizontal or vertical)
  if (fromRow !== toRow && fromCol !== toCol) {
    console.log("Move rejected: not straight line");
    return false;
  }

  // Check if path is clear
  const stepRow = fromRow === toRow ? 0 : toRow > fromRow ? 1 : -1;
  const stepCol = fromCol === toCol ? 0 : toCol > fromCol ? 1 : -1;

  let currentRow = fromRow + stepRow;
  let currentCol = fromCol + stepCol;

  while (currentRow !== toRow || currentCol !== toCol) {
    if (board[currentRow][currentCol] !== PIECE_TYPES.EMPTY) {
      console.log("Move rejected: path blocked");
      return false;
    }
    currentRow += stepRow;
    currentCol += stepCol;
  }

  // Only king can occupy corners (not throne - throne is normal square)
  const piece = board[fromRow][fromCol];
  if (isCorner(toRow, toCol) && piece !== PIECE_TYPES.KING) {
    console.log("Move rejected: only king can occupy corner");
    return false;
  }

  console.log("Move accepted:", { fromRow, fromCol, toRow, toCol, piece });
  return true;
};

// Get pieces that should be captured after a move
export const getCapturedPieces = (board, moveToRow, moveToCol, piece) => {
  const captured = [];
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]; // up, down, left, right

  console.log(
    `Checking captures for ${piece} moving to (${moveToRow}, ${moveToCol})`,
  );

  directions.forEach(([dRow, dCol]) => {
    const targetRow = moveToRow + dRow;
    const targetCol = moveToCol + dCol;

    if (
      targetRow < 0 ||
      targetRow >= BOARD_SIZE ||
      targetCol < 0 ||
      targetCol >= BOARD_SIZE
    ) {
      return;
    }

    const targetPiece = board[targetRow][targetCol];

    // Can't capture empty squares or same team pieces
    if (targetPiece === PIECE_TYPES.EMPTY || isSameTeam(targetPiece, piece)) {
      return;
    }

    console.log(
      `Checking potential capture of ${targetPiece} at (${targetRow}, ${targetCol})`,
    );

    // Check for capture by looking for ally on opposite side
    const oppositeRow = targetRow + dRow;
    const oppositeCol = targetCol + dCol;

    let captureCondition = false;

    // Regular capture: piece sandwiched between two allies
    if (
      oppositeRow >= 0 &&
      oppositeRow < BOARD_SIZE &&
      oppositeCol >= 0 &&
      oppositeCol < BOARD_SIZE
    ) {
      const oppositePiece = board[oppositeRow][oppositeCol];

      console.log(
        `Opposite square (${oppositeRow}, ${oppositeCol}) has: ${oppositePiece}`,
      );
      console.log(`Is corner: ${isCorner(oppositeRow, oppositeCol)}`);
      console.log(`Is throne: ${isThrone(oppositeRow, oppositeCol)}`);

      if (
        isSameTeam(oppositePiece, piece) ||
        isCorner(oppositeRow, oppositeCol)
      ) {
        captureCondition = true;
        console.log(
          `Capture condition TRUE for ${targetPiece} at (${targetRow}, ${targetCol})`,
        );
      }
    } else if (isCorner(moveToRow, moveToCol)) {
      // Can capture against board edge if moving piece is on corner
      captureCondition = true;
      console.log(`Edge capture condition TRUE`);
    }

    // King can only be captured by attackers
    if (targetPiece === PIECE_TYPES.KING) {
      // Defenders can move to sandwich the king, but only attackers can capture
      if (captureCondition && isAttacker(piece)) {
        captured.push({ row: targetRow, col: targetCol });
        console.log(`CAPTURED: ${targetPiece} at (${targetRow}, ${targetCol})`);
      } // else: defenders sandwiching king does nothing
    } else {
      // King and other pieces can capture normally (not targeting the king)
      if (captureCondition) {
        captured.push({ row: targetRow, col: targetCol });
        console.log(`CAPTURED: ${targetPiece} at (${targetRow}, ${targetCol})`);
      }
    }
  });

  console.log(`Total captures: ${captured.length}`);
  return captured;
};

// Check win conditions
export const checkWinCondition = (board) => {
  let kingPosition = null;
  // eslint-disable-next-line no-unused-vars
  let hasDefenders = false;
  let hasAttackers = false;

  // Find king and check for defenders
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === PIECE_TYPES.KING) {
        kingPosition = { row, col };
      } else if (board[row][col] === PIECE_TYPES.DEFENDER) {
        hasDefenders = true;
      } else if (board[row][col] === PIECE_TYPES.ATTACKER) {
        hasAttackers = true;
      }
    }
  }

  // Attackers win if king is captured
  if (!kingPosition) {
    return { winner: "attackers", reason: "King captured" };
  }

  // Defenders win if king reaches corner
  if (isCorner(kingPosition.row, kingPosition.col)) {
    return { winner: "defenders", reason: "King escaped" };
  }

  // Defenders win if all attackers are eliminated
  if (!hasAttackers) {
    return { winner: "defenders", reason: "All attackers eliminated" };
  }

  // Check if king can move (basic stalemate detection)
  const { row: kingRow, col: kingCol } = kingPosition;
  let kingCanMove = false;

  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      if (dRow === 0 && dCol === 0) continue;
      if (dRow !== 0 && dCol !== 0) continue; // Only orthogonal moves

      const newRow = kingRow + dRow;
      const newCol = kingCol + dCol;

      if (isValidMove(board, kingRow, kingCol, newRow, newCol)) {
        kingCanMove = true;
        break;
      }
    }
    if (kingCanMove) break;
  }

  // Additional stalemate conditions could be added here

  return { winner: null, reason: null };
};
