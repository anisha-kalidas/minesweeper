document.addEventListener('DOMContentLoaded', startGame)

var board = {
  cells: []
};


function createBoard(size) {
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      board.cells.push({row: i, col: j, hidden: true, isMarked: false, isMine: false})
    }
  }
};

function startGame () {
  createBoard(5);
  placeMines();

  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);

  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  };
  // Don't remove this function call: it makes the game work!
  lib.initBoard();
};


function displayNumber (msg, id) {
  document.getElementById(id || 'subtext').innerHTML = '<span>' + msg + '</span>'
}


function placeMines() {
  var mines = Math.ceil(Math.random() * 5) + 1;
  var minesPlaced = 0;
  var randomCell = Math.floor(Math.random() * board.cells.length);

  displayNumber('POKEMON HIDING: ' + mines);

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
  }

  if (winning === board.cells.length) {
    winningSound.play();
    lib.displayMessage('YOU WIN!');
    lib.removeListeners();
    return;
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

