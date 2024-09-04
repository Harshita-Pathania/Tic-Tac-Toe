import React, { useState } from 'react';
import ModeSelection from './components/ModeSelection';
import PlayerNames from './components/PlayerNames';
import Board from './components/Board';
import Popup from './components/Popup';
import './App.css';

const App = () => {
    const [mode, setMode] = useState(null);
    const [playerNames, setPlayerNames] = useState(["Player 1", "Player 2"]);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const [gameMessage, setGameMessage] = useState("");
    const [resetKey, setResetKey] = useState(0);

    const handleModeSelect = (selectedMode) => {
        setMode(selectedMode);
        setGameStarted(false);
    };

    const handleStartGame = () => {
        setGameStarted(true);
    };

    const handleGameEnd = (message) => {
        setGameMessage(message);
        setGameEnded(true);
    };

    const handleNewGame = () => {
        setGameStarted(true);
        setGameEnded(false);
        setResetKey(prevKey => prevKey + 1); // Increment reset key to force board reset
    };

    const handleBackToMainMenu = () => {
        setGameStarted(false);
        setGameEnded(false);
        setPlayerNames(["Player 1", "Player 2"]); // Reset player names to default
        setMode(null); // Go back to mode selection
    };

    return (
        <div className="App">
            {!mode && <ModeSelection onSelectMode={handleModeSelect} />}
            {mode && !gameStarted && (
                <PlayerNames 
                    playerNames={playerNames} 
                    setPlayerNames={setPlayerNames} 
                    onStartGame={handleStartGame}
                    mode={mode}
                />
            )}
            {mode && gameStarted && (
                <>
                    <Board 
                        key={resetKey} // Use reset key to force re-render
                        mode={mode} 
                        playerNames={playerNames} 
                        onGameEnd={handleGameEnd}
                    />
                    {gameEnded && (
                        <Popup 
                            message={gameMessage} 
                            onNewGame={handleNewGame} 
                            onBackToMainMenu={handleBackToMainMenu}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default App;
