import { useState } from "react";
import "./Board.css";
const calculateWinner = (board) => {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
  return null;
};
export default function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [state, setState] = useState(true);

  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] !== null || winner) return;
    const newBoard = [...board];
    newBoard[index] = state ? "X" : "O";
    setBoard(newBoard);
    setState(!state);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setState(true);
  };
  return (
    <div className="board">
      <h1>Tic Tac Toe</h1>
      {winner ? (
        <p>Winner: {winner}</p>
      ) : board.every((cell) => cell !== null) ? (
        <p>It is a draw</p>
      ) : (
        <p>Next Player: {state ? "X" : "O"}</p>
      )}
      <div className="board-row">
        {board.map((value, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <button onClick={handleReset} id="reset">
        Reset Button
      </button>
    </div>
  );
}
