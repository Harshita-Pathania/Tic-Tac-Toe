# Tic-Tac-Toe Game

A simple Tic-Tac-Toe game built with React, allowing for both single-player and two-player modes. The game supports player name customization and includes a bot for single-player mode.

## Project Structure

The project is organized into several key components, each with its own stylesheet:

- `src/components/Board.js`: Manages the game board and game logic.
- `src/components/ModeSelection.js`: Allows players to select the game mode.
- `src/components/PlayerNames.js`: Collects player names and starts the game.
- `src/components/Popup.js`: Displays the game outcome in a popup.
- `src/components/board.css`: Styles the game board.
- `src/components/modeSelection.css`: Styles the mode selection screen.
- `src/components/playerNames.css`: Styles the player names input screen.
- `src/components/popup.css`: Styles the popup for game outcomes.
- `src/App.css`: Styles for the main application container.
- `src/index.css`: Global styles for the application.

## Components

### `Board.js`

The `Board` component is responsible for rendering the game board and handling the game logic.

- **State Management**:
  - `turn`: Tracks whose turn it is (0 for Player 1, 1 for Player 2 or Bot).
  - `data`: An array of size 9 representing the state of each cell on the board.
  - `isBotTurn`: Boolean flag to determine if it's the bot's turn.

- **Methods**:
  - `handleClick(index)`: Updates the board state when a cell is clicked, only if it's the player's turn.
  - `checkWin()`: Checks the board for any winning combinations.
  - `makeBotMove()`: Determines and executes the bot's move in single-player mode.

- **Effects**:
  - Runs the `checkWin()` function to check for a winner or tie after each move.
  - Executes the bot’s move if it’s the bot’s turn and the game is in single-player mode.

### `ModeSelection.js`

The `ModeSelection` component allows users to select between single-player and two-player modes.

- **Features**:
  - Buttons to choose the game mode.
  - Updates the game state based on user selection.

### `PlayerNames.js`

The `PlayerNames` component collects player names and starts the game.

- **Features**:
  - Input fields for entering player names.
  - A button to start the game once names are entered.

### `Popup.js`

The `Popup` component displays a popup message when the game ends.

- **Features**:
  - Shows the game outcome (win/tie).
  - Includes a button to close the popup and restart the game.

## Styling

- `board.css`: Styles the game board, including individual cells and turn indicators.
- `modeSelection.css`: Styles the mode selection screen with buttons.
- `playerNames.css`: Styles the player names input screen.
- `popup.css`: Styles the popup for game outcomes.
- `App.css`: Provides general styling for the app container.
- `index.css`: Contains global styles for the application.

## How to Run

1. Clone the Repository:
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe.git
   ```

2. Navigate to the Project Directory:
   ```bash
   cd tic-tac-toe
   ```

3. Install Dependencies:
   ```bash
   npm install
   ```

4. Start the Development Server:
   ```bash
   npm start
   ```

5. Open Your Browser:
   Visit [http://localhost:3000](http://localhost:3000) to play the game.
