const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const canvasNext = document.getElementById('next-piece');
const ctxNext = canvasNext.getContext('2d');

var sound = document.getElementById('sound');

let accountValues = {
  score: 0,
  level: 0,
  lines: 0
}

function updateAccount(key, value) {
  let element = document.getElementById(key);
  if (element) {
    element.textContent = value;
  }
}

let account = new Proxy(accountValues, {
  set: (target, key, value) => {
    target[key] = value;
    updateAccount(key, value);
    return true;
  }
});

let requestId;

let boardNext = new Board(ctxNext);

initNext();

function initNext() {
  // Calculate size of canvas from constants.
  ctxNext.canvas.width = 7 * BLOCK_SIZE;
  ctxNext.canvas.height = 4 * BLOCK_SIZE;
  ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
}

function getNextPiece() {
  nextPiece = new Piece(ctxNext);
  nextPiece.draw();
}

// ********** Random generator ***********
function randomPiece() {
  let r = randomN = Math.floor(Math.floor(Math.random() * PIECES.length));
  return new Piece(ctx, r);
}

let board = new Board(ctx);

// ************* Play button interaction *********
function play() { // FIX RESET BUTTON
    sound.play();
    board.reset();
    piece = board.piece;
    getNextPiece();
    addEventListener();
    //console.table(board.grid);
    drop();
}


// *********** Dropping *************
let dropStart = Date.now();
let gameOverAlert = false;
function drop() {
  let now = Date.now();
  let delta = now - dropStart;
  if (delta > LEVEL[account.level]){
    if (!collision(0, 1, piece.tetromino)) {
      piece.moveDown();
      dropStart = Date.now();
    } else {
      lock(piece);
      piece = new Piece(ctx);
    }
  }
  if (!gameOverAlert){
    requestId = requestAnimationFrame(drop);
  }
}

// ******* Declare movements for the piece ********
function addEventListener() {
  document.addEventListener('keydown', movements)
  function movements(evt) {
    evt.preventDefault();

    if (evt.keyCode == KEY.SPACEBAR) {
      pause();
    }

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
        account.score++;
        dropStart = Date.now();
      } else {
        lock(piece);
        piece = new Piece(ctx);
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
  let lines = 0;
  for (var r = 0; r < piece.tetromino.length; r++) {
    for (var c = 0; c < piece.tetromino.length; c++) {
      if (!piece.tetromino[r][c]) {
        continue;
      }
      if (piece.y + r < 0) {
        //alert("Game Over");
        gameOver();
        gameOverAlert = true;
        break;
      }
      board.grid[piece.y + r][piece.x + c] = piece.color;
    }
  }
  for (var r = 0; r < ROWS; r++) {
    let isRowFull = board.grid[r].every(elem => elem != 0);
    if (isRowFull) {
      for ( var y = r; y > 1; y--) {
        for (var c = 0; c < COLS; c++) {
          board.grid[y][c] = board.grid[y-1][c];
        }
      }
      for (c = 0; c < COLS; c++) {
        board.grid[0][c] = 0;
      }
      lines++;
      //console.table(board.grid)
      board.drawBoard();
    }
    //console.table(lines);
  }
  if (lines > 0) {
    console.table(lines);
    account.lines += lines;
    pointsPerLines(lines);
    if (account.lines == LINES_PER_LEVEL) {
      account.lines = 0;
      account.level++;
    }
  }
}

function pointsPerLines(lines) {
  if (lines == 1) {
    account.score += POINTS.SINGLE;
  }
  if (lines == 2) {
    account.score += POINTS.DOUBLE;
  }
  if (lines == 3) {
    account.score += POINTS.TRIPLE;
  }
  if (lines == 4) {
    account.score += POINTS.TETRIS;
  }
}

function gameOver() {
  cancelAnimationFrame(requestId);
  sound.pause();
  ctx.fillStyle = 'black';
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = '1px Arial';
  ctx.fillStyle = 'red';
  ctx.fillText('GAME OVER', 1.8, 4);
}

function pause() {
  if (!requestId) {
    ctx.clearRect(1, 3, 8, 1.2);
    board.drawBoard();
    sound.play();
    drop();
    return;
  }

  cancelAnimationFrame(requestId)
  sound.pause()
  requestId = null;
  ctx.fillStyle = 'black';
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = '1px Arial';
  ctx.fillStyle = 'yellow';
  ctx.fillText('PAUSED', 3, 4);
}
