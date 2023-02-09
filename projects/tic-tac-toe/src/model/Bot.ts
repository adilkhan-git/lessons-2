import Player from "./Player";
import { PIECE } from "./types";


class Bot extends Player {
  constructor(name: string, avatarUrl: string) {
    super(name, avatarUrl);
  }

  move(board: PIECE[]) {
    // The maximum depth the search will go
    const searchDepth = 10;

    // Minimax function that returns the best move for the computer
    function minimax(board: PIECE[], depth: number, isMaximizing: boolean): number {
      const result = checkForWinner(board);
      if (result !== 0) {
        return result * (searchDepth - depth);
      }

      if (depth === searchDepth) {
        return 0;
      }

      let bestValue = isMaximizing ? -Infinity : Infinity;
      let bestMove = -1;

      for (let i = 0; i < 9; i++) {
        if (board[i] === 0) {
          const newBoard = [...board];
          newBoard[i] = isMaximizing ? 1 : -1;

          const value = minimax(newBoard, depth + 1, !isMaximizing);

          if (isMaximizing) {
            if (value > bestValue) {
              bestValue = value;
              bestMove = i;
            }
          } else {
            if (value < bestValue) {
              bestValue = value;
              bestMove = i;
            }
          }
        }
      }

      return bestMove;
    }

    // Function that checks if there is a winner on the board
   
    function checkForWinner(board: PIECE[]) {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      for (const combination of winningCombinations) {
        if (Math.abs(board[combination[0]] + board[combination[1]] + board[combination[2]]) === 3) {
          return board[combination[0]];
        }
      }

      return 0;
    }

    // Use the minimax function to find the best move
    return minimax(board, 0, true);
  }
}

export default Bot;