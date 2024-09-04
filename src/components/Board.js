import React, { useState, useEffect } from 'react';
import './board.css';

const Board = ({ mode, playerNames, onGameEnd }) => {
    const [turn, setTurn] = useState(0); // 0 for Player 1, 1 for Player 2
    const [data, setData] = useState(Array(9).fill(""));
    const [isBotTurn, setIsBotTurn] = useState(false);

    const handleClick = (index) => {
        if (data[index] === "" && !isBotTurn) {
            const newData = [...data];
            newData[index] = turn === 0 ? "X" : "O";
            setData(newData);
            setTurn(turn === 0 ? 1 : 0);
        }
    };

    useEffect(() => {
        const checkWin = () => {
            const winPatterns = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
            for (let pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                    return data[a];
                }
            }
            return null;
        };

        const winner = checkWin();
        if (winner) {
            onGameEnd(winner === "X" ? `${playerNames[0]} Wins!` : `${playerNames[1]} Wins!`);
        } else if (data.every(cell => cell !== "")) {
            onGameEnd("It's a Tie!");
        }
    }, [data, turn, playerNames, onGameEnd]);

    useEffect(() => {
        if (mode === 1 && turn === 1) {
            setIsBotTurn(true);
            setTimeout(() => {
                makeBotMove();
                setIsBotTurn(false);
            }, 500);
        }
    }, [turn, mode]);

    const makeBotMove = () => {
        const emptyCells = data.map((cell, index) => (cell === "" ? index : null)).filter(index => index !== null);
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        handleClick(randomIndex);
    };

    return (
        <div className="board">
            {data.map((cell, index) => (
                <div
                    key={index}
                    className={`square ${cell.toLowerCase()}`}
                    onClick={() => handleClick(index)}
                >
                    {cell}
                </div>
            ))}
            <div className="turn-indicator">
                {mode === 1 ? `Current Turn: ${turn === 0 ? playerNames[0] : "Bot"}` : `Current Turn: ${turn === 0 ? playerNames[0] : playerNames[1]}`}
            </div>
        </div>
    );
};

export default Board;
