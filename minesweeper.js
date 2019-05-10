document.addEventListener('DOMContentLoaded', startGame)

var board = {
  cells: [
    {row: 1,  col: 1, isMine: false,  isMarked: false, hidden: true}, 
    {row: 1,  col: 2, isMine: false,  isMarked: false, hidden: true},
    {row: 1,  col: 3, isMine: false,  isMarked: false, hidden: true},
    {row: 1,  col: 4, isMine: false,  isMarked: false, hidden: true},
    {row: 1,  col: 5, isMine: false,  isMarked: false, hidden: true},
    {row: 2,  col: 1, isMine: false,  isMarked: false, hidden: true},
    {row: 2,  col: 2, isMine: false,  isMarked: false, hidden: true},
    {row: 2,  col: 3, isMine: false,  isMarked: false, hidden: true},
    {row: 2,  col: 4, isMine: false,  isMarked: false, hidden: true},
    {row: 2,  col: 5, isMine: false,  isMarked: false, hidden: true}, 
    {row: 3,  col: 1, isMine: false,  isMarked: false, hidden: true},
    {row: 3,  col: 2, isMine: false,  isMarked: false, hidden: true},
    {row: 3,  col: 3, isMine: false,  isMarked: false, hidden: true},
    {row: 3,  col: 4, isMine: false,  isMarked: false, hidden: true},
    {row: 3,  col: 5, isMine: false,  isMarked: false, hidden: true},
    {row: 4,  col: 1, isMine: false,  isMarked: false, hidden: true},
    {row: 4,  col: 2, isMine: false,  isMarked: false, hidden: true},
    {row: 4,  col: 3, isMine: false,  isMarked: false, hidden: true},
    {row: 4,  col: 4, isMine: false,  isMarked: false, hidden: true},
    {row: 4,  col: 5, isMine: false,  isMarked: false, hidden: true},
    {row: 5,  col: 1, isMine: false,  isMarked: false, hidden: true},
    {row: 5,  col: 2, isMine: false,  isMarked: false, hidden: true},
    {row: 5,  col: 3, isMine: false,  isMarked: false, hidden: true},
    {row: 5,  col: 4, isMine: false,  isMarked: false, hidden: true},
    {row: 5,  col: 5, isMine: false,  isMarked: false, hidden: true}
  ]
};



function startGame () {

  createBoard();

  mines = 0;
  remaining = mines;
  revealed = 0;

  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);

  for (i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  };
  // Don't remove this function call: it makes the game work!
  lib.initBoard();
};




function createBoard() {
  
  var mines = 6;
  var minesPlaced = 0;
  var randomCell = Math.floor(Math.random() * board.cells.length);

  while (minesPlaced < mines) {

    if (board.cells[randomCell].isMine != true) {
      board.cells[randomCell].isMine = true;
      minesPlaced++;
    }

    randomCell = Math.floor(Math.random() * board.cells.length);
  };
}






function checkForWin () {

  var winning = 0;
  var winningSound = new Audio('audio/chimes.wav');

  for (var i = 0; i < board.cells.length; i++) {
    
    if (board.cells[i].isMine) {
      if (board.cells[i].isMarked) {
        winning++;
      }
    } else if (board.cells[i].isMine === false) {
      if (board.cells[i].hidden === false) {
        winning++;
      }
    };

    if (winning === board.cells.length) {
      winningSound.play();
      lib.displayMessage('YOU WIN!');
    };
  };

};
     


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

