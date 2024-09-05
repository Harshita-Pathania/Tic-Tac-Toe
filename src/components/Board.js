import React, { useState, useEffect } from 'react';
import './board.css';

const Board = ({ mode, playerNames, onGameEnd }) => {
    const [turn, setTurn] = useState(0); // 0 for Player 1, 1 for Player 2
    const [data, setData] = useState(Array(9).fill(""));
    const [isBotTurn, setIsBotTurn] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const [gameResult, setGameResult] = useState(""); // Track the game result message

    const handleClick = (index) => {
        if (data[index] === "" && !isBotTurn && !gameEnded) {
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
        if (winner && !gameEnded) {
            const resultMessage = winner === "X" ? `${playerNames[0]} Wins!` : `${playerNames[1]} Wins!`;
            setGameResult(resultMessage);
            setGameEnded(true);
            onGameEnd(resultMessage);
        } else if (data.every(cell => cell !== "") && !gameEnded) {
            const resultMessage = "It's a Tie!";
            setGameResult(resultMessage);
            setGameEnded(true);
            onGameEnd(resultMessage);
        }
    }, [data, turn, playerNames, onGameEnd, gameEnded]);

    useEffect(() => {
        if (mode === 1 && turn === 1 && !gameEnded) {
            setIsBotTurn(true);
            setTimeout(() => {
                makeBotMove();
                setIsBotTurn(false);
            }, 500);
        }
    }, [turn, mode, gameEnded]);

    const makeBotMove = () => {
        if (gameEnded) {
            console.log("Game has ended. Bot will not make a move.");
            return; // Exit if the game has ended
        }

        const checkWin = (board, marker) => {
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
            return winPatterns.some(pattern => {
                const [a, b, c] = pattern;
                return board[a] === marker && board[b] === marker && board[c] === marker;
            });
        };

        const availableMoves = data.map((cell, index) => (cell === "" ? index : null)).filter(index => index !== null);

        // 1. Check for a winning move for the bot
        for (let move of availableMoves) {
            const newData = [...data];
            newData[move] = "O";
            if (checkWin(newData, "O")) {
                handleClick(move);
                return;
            }
        }

        // 2. Block the user from winning
        for (let move of availableMoves) {
            const newData = [...data];
            newData[move] = "X";
            if (checkWin(newData, "X")) {
                handleClick(move);
                return;
            }
        }

        // 3. Take the center if available
        if (data[4] === "") {
            handleClick(4);
            return;
        }

        // 4. Take any available corner
        const corners = [0, 2, 6, 8];
        for (let corner of corners) {
            if (data[corner] === "") {
                handleClick(corner);
                return;
            }
        }

        // 5. Take any available side
        const sides = [1, 3, 5, 7];
        for (let side of sides) {
            if (data[side] === "") {
                handleClick(side);
                return;
            }
        }
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
                {gameResult ? gameResult : (mode === 1 ? `Current Turn: ${turn === 0 ? playerNames[0] : "Bot"}` : `Current Turn: ${turn === 0 ? playerNames[0] : playerNames[1]}`)}
            </div>
        </div>
    );
};

export default Board;
