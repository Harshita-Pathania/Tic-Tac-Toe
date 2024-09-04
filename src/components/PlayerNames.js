import React, { useEffect } from 'react';
import './playerNames.css';

const PlayerNames = ({ playerNames, setPlayerNames, onStartGame, mode }) => {
    const handleNameChange = (index, event) => {
        const newNames = [...playerNames];
        newNames[index] = event.target.value;
        setPlayerNames(newNames);
    };

    useEffect(() => {
        if (mode === 1) {
            setPlayerNames([playerNames[0], "Bot"]);
        }
    }, [mode, setPlayerNames]);

    return (
        <div className="player-names">
            <h1>Enter Player Names</h1>
            <input
                type="text"
                value={playerNames[0]}
                onChange={(e) => handleNameChange(0, e)}
                placeholder="Player 1 Name"
            />
            <input
                type="text"
                value={playerNames[1]}
                onChange={(e) => handleNameChange(1, e)}
                placeholder="Player 2 Name"
                disabled={mode === 1}
            />
            <button onClick={onStartGame}>Start Game</button>
        </div>
    );
}

export default PlayerNames;
