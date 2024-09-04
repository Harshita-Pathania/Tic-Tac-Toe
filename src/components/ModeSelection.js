import React from 'react';
import './modeSelection.css';

const ModeSelection = ({ onSelectMode }) => {
    return (
        <div className="mode-selection">
            <h1>Select Game Mode</h1>
            <button onClick={() => onSelectMode(1)}>Single Player</button>
            <button onClick={() => onSelectMode(2)}>Two Players</button>
        </div>
    );
};

export default ModeSelection;
