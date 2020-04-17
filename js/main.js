const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

let accountValues = {
  score: 0,
  level: 0,
  lines: 0
}

// ********** Random generator ***********
function randomPiece() {
  let r = randomN = Math.floor(Math.floor(Math.random() * PIECES.length));
  return new Piece(ctx, r);
}

let board = new Board(ctx);

// ************* Play button interaction *********
function play() { // FIX RESET BUTTON
    board.reset();
    piece = board.piece;
    addEventListener();
    console.table(board.grid);
    drop();
}


// *********** Dropping *************
let dropStart = Date.now();
let gameOver = false;
function drop() {
  let now = Date.now();
  let delta = now - dropStart;
  if (delta > 500){
    if (!collision(0, 1, piece.tetromino)) {
      piece.moveDown();
      dropStart = Date.now();
    } else {
      lock(piece);
      piece = new Piece(ctx);
    }
  }
  if (!gameOver){
    requestAnimationFrame(drop);
  }
}

// ******* Declare movements for the piece ********
function addEventListener() {
  document.addEventListener('keydown', movements)
  function movements(evt) {
    if (evt.keyCode == KEY.LEFT) {
      if (!collision(-1, 0, piece.tetromino)) {
        piece.moveLeft();
        dropStart = Date.now();
      }
    }
    else if (evt.keyCode == KEY.UP) {
      let nextPattern = piece.shape[(piece.tetrominoN+1)%piece.shape.length]
      let kickX = 0;
      let kickY = 0;

      if (collision(0, 0, nextPattern)) {
          if (piece.x > COLS/2) { // Right wall
              kickX = -1;
          } else { // Left wall
              kickX = 1;
          }
          if (piece.y > ROWS/2) {
            kickY = 1;
          }
        }
      if (!collision(kickX, kickY, nextPattern)) {
        piece.rotate(kickX, kickY);
        dropStart = Date.now()
      }
    }
    else if (evt.keyCode == KEY.RIGHT) {
      if (!collision(1, 0, piece.tetromino)) {
        piece.moveRight();
        dropStart = Date.now();
      }
    }
    else if (evt.keyCode == KEY.DOWN) {
      if (!collision(0, 1, piece.tetromino)) {
        piece.moveDown();
        dropStart = Date.now();
      } else {
        lock(piece);
        piece = randomPiece();
      }
    }
  }
}

function collision(x, y, selectedPiece) {
  for (var r = 0; r < selectedPiece.length; r++) {
    for (var c = 0; c < selectedPiece.length; c++) {
      if (!selectedPiece[r][c]) {
        continue;
      }

      let newX = piece.x + c + x;
      let newY = piece.y + r + y;

      if (board.outsideWalls(newX) || board.underFloor(newY)) {
        return true;
      }
      if (newY < 0) {
        continue;
      }
      if (board.grid[newY][newX] != 0) {
        return true;
      }
    }
  }
  return false;
}

let score = 0;
function lock(piece) {
  for (var r = 0; r < piece.tetromino.length; r++) {
    for (var c = 0; c < piece.tetromino.length; c++) {
      if (!piece.tetromino[r][c]) {
        continue;
      }
      if (piece.y + r < 0) {
        alert("Game Over");
        gameOver = true;
        break;
      }
      board.grid[piece.y + r][piece.x + c] = piece.color;
    }
  }
  for (var r = 0; r < ROWS; r++) {
    let isRowFull = board.grid[r].every(elem => elem != 0);
    console.table(isRowFull);
    if (isRowFull) {
      console.table(isRowFull);
      for ( var y = r; y > 1; y--) {
        for (var c = 0; c < COLS; c++) {
          board.grid[y][c] = board.grid[y-1][c];
        }
      }
      for (c = 0; c < COLS; c++) {
        board.grid[0][c] = 0;
      }
      score += 10;
      console.table(board.grid)
      board.drawBoard();
    }
    //console.table(board.grid);
  }
}
