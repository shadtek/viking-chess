# Copilot Instructions for Viking Chess (Hnefatafl)

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a React Native Expo project for creating a Hnefatafl (Viking Chess) game with the following specifications:

## Project Overview

- **Game**: Hnefatafl (Viking Chess)
- **Platform**: React Native with Expo
- **Styling**: Tailwind CSS (NativeWind)
- **Node**: v20.18.0
- **NPM**: v11.2.0

## Visual Design Requirements

- Full bleed black background
- White grid (11x11 squares)
- Orange attackers pieces
- Blue defenders pieces
- Purple king piece
- 320px max-width game board

## Game Features

- Drag and drop functionality for pieces
- Online player matching system
- AI opponents with difficulty levels: Easy, Medium, Hard, Expert
- Turn-based gameplay following traditional Hnefatafl rules

## Technical Stack

- React Native with Expo
- NativeWind (Tailwind CSS for React Native)
- React Native Gesture Handler for drag and drop
- React Native Reanimated for animations
- AsyncStorage for game state persistence
- React Native Vector Icons

## Code Style Guidelines

- Use functional components with hooks
- Implement proper TypeScript types where applicable
- Follow React Native best practices
- Use Tailwind utility classes for styling
- Implement proper state management for game logic
- Create reusable components for game pieces and board squares
