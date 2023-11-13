import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  const renderSquare = (i) => (
    <Square value={squares[i]} onSquareClick={() => handleClick(i)} />
  );

  const renderRow = (rIndex) => { // kako for i=0; i<rindex; i++
    const squaresInRow = Array(3).fill(null).map((_, colIndex) => { // kako j=0; j<3;j++
      console.log(rIndex)
      console.log(colIndex)
      const squareIndex = rIndex * 3 + colIndex;
      console.log(squareIndex)
      return renderSquare(squareIndex);
    });

    return (
      <div key={rIndex} className="board-row">
        {squaresInRow}
      </div>
    );
  };
  const boardRows = Array(3).fill(null).map((_, rIndex) => renderRow(rIndex));
// In this case, the callback function has two parameters: the current element of the array
// (represented by the underscore _, which is a convention
// to indicate that the parameter is not used) and the index of the current element, which is rowIndex in this case.
return (
  <>
        <div className="status">{status}</div>
        <div>{boardRows}</div>;
        </>
  );
  
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  

  function handlePlay(nextSquares) {
   
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

 

  const moves = history.map((squares, move) => {
    let description;
   
   
    if (move > 0) {
      description = 'You are at move #' + move;
    } else {
      description = 'You are at game start';
    }
    return (
      <div>
      <li key={move}>
        <div>
        {description}
        <button onClick={() => jumpTo(move)} style={{ display: "none"}}></button>
        </div>
      </li>
      </div>
    );
  });

  return (
    <div className="game">
      <div className="game-board"> {/* koj e sleden, izgled na tabla kako prop i onPlay za da moze board-ot da ja izvesti game koga ima napraveno
      nekoj move koj treba da se zapise vo history */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} /> 
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      
      </div>
    </div>
  );
}

function addColor(element)
{
  element.className = 'red'
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
