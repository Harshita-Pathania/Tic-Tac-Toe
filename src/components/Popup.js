import React from 'react';
import './popup.css';

const Popup = ({ message, onNewGame, onBackToMainMenu }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p>{message}</p>
                <button onClick={onNewGame}>Restart Game</button>
                <button onClick={onBackToMainMenu}>Back to Main Menu</button>
            </div>
        </div>
    );
}

export default Popup;
