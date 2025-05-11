# Ayoayo Game Implementation

A text-based implementation of the traditional Ayoayo board game in JavaScript.

## Table of Contents
- [Overview](#overview)
- [Rules](#rules)
- [Implementation Details](#implementation-details)
- [How to Run](#how-to-run)
- [Testing](#testing)
- [Reflection](#reflection)

## Overview
This project implements a two-player Ayoayo game where players take turns sowing seeds from their pits according to the game's rules. The implementation focuses on the core game logic without a graphical interface, using text-based input/output.

## Rules
1. **Setup**: Each player starts with 4 seeds in each of their 6 pits.
2. **Sowing**: On a turn, a player picks all seeds from a pit and distributes them counter-clockwise, placing one seed in each subsequent pit. The player's store is included in the sowing path, but the opponent's store is skipped.
3. **Special Rules**:
   - *Extra Turn*: If the last seed lands in the player's store, they get another turn.
   - *Capture*: If the last seed lands in an empty pit on the player's side, they capture that seed and the seeds from the opponent's opposite pit.
4. **Game End**: The game ends when one player has no seeds left in their pits. The remaining seeds on the opponent's side are added to their store, and the player with the most seeds wins.

## Implementation Details
- **Classes**:
  - `Player`: Manages a player's pits and store.
  - `Ayoayo`: Handles game logic, including sowing, captures, and turn management.
- **Key Methods**:
  - `playGame(playerIndex, pitIndex)`: Executes a player's move.
  - `sowingOrder(startIdx, currentPlayer)`: Generator function for counter-clockwise seed distribution.
  - `printBoard()`: Outputs the current board state.
  - `returnWinner()`: Determines the game's outcome.

## How to Run
1. **Install Node.js**: Ensure Node.js is installed on your system.
2. **Run the Game**:
   ```bash
   node ayoayo.js
   ```
3. **Example Usage**:
   ```javascript
   const game = new Ayoayo();
   const player1 = game.createPlayer("Alice");
   const player2 = game.createPlayer("Bob");

   console.log(game.playGame(1, 3)); // Player 1 sows from pit 3
   game.printBoard();
   console.log(game.returnWinner());
   ```

## Testing
The implementation includes checks for:
- Invalid pit indices.
- Empty pit moves.
- Correct application of special rules (extra turns and captures).
- Proper game termination and winner determination.

Test cases can be added to verify edge cases and ensure robust behavior.

## Reflection
See [reflection.txt](reflection.txt) for a detailed discussion of the thought process, challenges, and key takeaways from this project.
