const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

//************* Size of canvas ***************
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// ************ Scale blocks **************
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// ********** Random generator ***********
function randomPiece() {
  let r = randomN = Math.floor(Math.floor(Math.random() * PIECES.length));
  return new Piece(ctx, r);
}

let board = new Board();
let piece = randomPiece();


function play() {
    board.EmptyBoard();
    piece.draw();
    drop();
}

// *********** Dropping *************
let dropStart = Date.now();
function drop() {
  if (!piece.collision(0, 1, piece.tetromino)) {
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 500){
      piece.moveDown();
      dropStart = Date.now();
    }
  } else {
    piece = randomPiece();
  }
  requestAnimationFrame(drop);
}

// ******* Declare movements for the piece ********
document.addEventListener('keydown', movements)

function movements(evt) {
  if (evt.keyCode == KEY.LEFT) {
    if(!piece.collision(-1, 0, piece.tetromino)) {
      piece.moveLeft();
      dropStart = Date.now();
    }
  }
  else if (evt.keyCode == KEY.UP) {
    piece.rotate();
    dropStart = Date.now()
  }
  else if (evt.keyCode == KEY.RIGHT) {
    if(!piece.collision(1, 0, piece.tetromino)) {
      piece.moveRight();
      dropStart = Date.now();
    }
  }
  else if (evt.keyCode == KEY.DOWN) {
    if(!piece.collision(0, 1, piece.tetromino)) {
      piece.moveDown();
      dropStart = Date.now();
    } else {
      piece = randomPiece();
    }
  }
}
