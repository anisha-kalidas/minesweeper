document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [
    {row: 1,  col: 1, isMine: false, hidden: true}, 
    {row: 1,  col: 2, isMine: true,  hidden: true},
    {row: 1,  col: 3, isMine: false, hidden: true},
    {row: 2,  col: 1, isMine: false, hidden: true},
    {row: 2,  col: 2, isMine: true,  hidden: true},
    {row: 2,  col: 3, isMine: true,  hidden: true},
    {row: 3,  col: 1, isMine: false, hidden: true},
    {row: 3,  col: 2, isMine: true,  hidden: true},
    {row: 3,  col: 3, isMine: false, hidden: true
  }]
};



function startGame () {

  for (i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  };

  // Don't remove this function call: it makes the game work!
  

  lib.initBoard();
};

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}


function countSurroundingMines(cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);

  var mineNumber = 0;

  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine) {
      mineNumber++;
    }; 
  };

  return mineNumber;
};

