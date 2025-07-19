# Viking Chess - Hnefatafl

A mobile implementation of the ancient Viking board game Hnefatafl, built with React Native and Expo.

## Game Overview

Hnefatafl is an asymmetric strategy board game that was popular among the Vikings. The game features:

- **Attackers (Orange pieces)**: Goal is to capture the King
- **Defenders (Blue pieces)**: Goal is to help the King escape to a corner
- **King (Purple piece)**: Must reach any corner to win

## Features

### 🎮 Game Modes

- **Player vs Player**: Local multiplayer on the same device
- **vs AI**: Play against computer opponents with 4 difficulty levels
  - Easy
  - Medium
  - Hard
  - Expert

### 🎯 Game Features

- **11x11 board** following traditional Hnefatafl rules
- **Drag and drop** piece movement
- **Visual indicators** for valid moves
- **Game state persistence** - your games are automatically saved
- **Move history** and statistics tracking
- **Full bleed design** with black background and white grid

### 🎨 Visual Design

- Black background with white grid lines
- Orange attacker pieces with sword symbols
- Blue defender pieces with shield symbols
- Purple king piece with crown symbol
- 320px maximum board width for optimal mobile experience

## Technical Stack

- **Framework**: React Native with Expo
- **Styling**: Tailwind CSS (NativeWind)
- **State Management**: React Hooks
- **Persistence**: AsyncStorage
- **Animations**: React Native Reanimated
- **Gestures**: React Native Gesture Handler

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Running the App

### Web

```bash
npm run web
```

### Android

```bash
npm run android
```

### iOS (macOS required)

```bash
npm run ios
```

## Game Rules

### Basic Movement

- All pieces move like rooks in chess (horizontally or vertically)
- Pieces cannot jump over other pieces
- Only the King can occupy corner squares (throne is a normal square)

### Capturing

- Pieces are captured by being surrounded on two opposite sides by enemy pieces or corners
- Corners act as hostile squares for capture purposes
- Captured pieces are immediately removed from the board

### Victory Conditions

- **Attackers win** by capturing the King
- **Defenders win** by getting the King to any corner square

### Special Squares

- **Corners**: Only the King can occupy these squares, and they act as hostile squares for captures

## AI Implementation

The AI uses a minimax algorithm with alpha-beta pruning and evaluates positions based on:

- Piece values and positioning
- King's distance to corners
- Control of center squares
- Mobility of pieces
- Capture opportunities

Difficulty levels adjust search depth and evaluation weights to provide varied gameplay experiences.

## File Structure

```
src/
├── components/          # Reusable UI components
│   ├── GameBoard.js    # Main game board display
│   ├── BoardSquare.js  # Individual board square
│   ├── GamePiece.js    # Game piece rendering
│   ├── GameStatus.js   # Game status display
│   └── GameControls.js # Game controls and settings
├── screens/
│   └── GameScreen.js   # Main game screen
├── hooks/
│   └── useGameState.js # Game state management
└── utils/
    ├── gameLogic.js    # Core game rules and logic
    └── aiLogic.js      # AI implementation
```

## Development

### Requirements

- Node.js v20.18.0
- npm v11.2.0
- Expo CLI

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Traditional Hnefatafl rules and gameplay
- Viking history and culture
- React Native and Expo communities
