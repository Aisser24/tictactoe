import React, { useEffect, useState } from "react";
import Cell from "./components/cell";
import { nanoid } from "nanoid";

function App() {
    const [board, setBoard] = useState(initializeBoard());
    const [activePlayer, setActivePlayer] = useState(true)
    const [gameActive, setGameActive] = useState(true)

    useEffect(() => {
        setGameActive(checkWinner())
    }, [board])

    function checkWinner() {
        for (let i = 0; i < 3; i++) {
            if (
              board[i * 3].isLocked &&
              board[i * 3].value === board[i * 3 + 1].value &&
              board[i * 3].value === board[i * 3 + 2].value
            ) {
              return board[i * 3].value; // Return the winning value
            }
          }
        
          // Check columns
          for (let i = 0; i < 3; i++) {
            if (
              board[i].isLocked &&
              board[i].value === board[i + 3].value &&
              board[i].value === board[i + 6].value
            ) {
              return board[i].value; // Return the winning value
            }
          }
        
          // Check diagonals
          if (
            board[0].isLocked &&
            board[0].value === board[4].value &&
            board[0].value === board[8].value
          ) {
            return board[0].value; // Return the winning value
          }
        
          if (
            board[2].isLocked &&
            board[2].value === board[4].value &&
            board[2].value === board[6].value
          ) {
            return board[2].value; // Return the winning value
          }
        
          // If no winner found, return null
          return null;
    }

    function initializeBoard() {
        let arr = []
        for (let i = 0; i < 9; i++) {
            arr[i] = {
                value: "",
                id: nanoid(),
                isLocked: false
            };
        }
        return arr
    }

    function clickSquare(squareId) {
        setBoard(prevBoard => {
            return prevBoard.map(prevCell => {
                if (prevCell.id === squareId && prevCell.isLocked === false) {
                    setActivePlayer(!activePlayer)
                    return {
                        ...prevCell,
                        value: activePlayer?"X" : "O",
                        isLocked: true
                    }
                } else {
                    return prevCell
                }
            })
        })
    }
 
    return (
        <main>
            <div className="contentWrapper">
                <h1>{!gameActive ? "Tic-Tac-Toe" : `${!activePlayer ? "X" : "O"} Won!`}</h1>
                <div className="wrapper">
                    {
                        board.map(cell => {
                            return <Cell value={cell.value} key={cell.id} handleClick={() => clickSquare(cell.id)}/>
                        })
                    }
                </div>
            </div>
        </main>
    )
}

export default App;