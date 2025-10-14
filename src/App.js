import { useState } from "react";

function Scuare({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xInNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xInNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Ganador: " + winner;
  } else {
    status = "Siguiente jugador: " + (xInNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status} </div>
      <div className="board-row">
        <Scuare value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Scuare value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Scuare value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Scuare value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Scuare value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Scuare value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Scuare value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Scuare value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Scuare value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [xInNext, setXInNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXInNext(!xInNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xInNext={xInNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/**TODO*/}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
