const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

//************* Size of canvas ***************
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// ************ Scale blocks **************
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);


let board = new Board();
let piece = new Piece(ctx);
function play() {
    board.EmptyBoard();
    piece.draw();
    drop();
    //board.piece = piece;
}

let dropStart = Date.now();
function drop() {
  let now = Date.now();
  let delta = now - dropStart;
  if (delta > 500){
    piece.moveDown();
    dropStart = Date.now()
  }
  requestAnimationFrame(drop);
}

// ******* Declare movements for the piece ********
document.addEventListener('keydown', movements)

function movements(evt) {
  if (evt.keyCode == KEY.LEFT) {
    piece.moveLeft();
    dropStart = Date.now()
  }
  else if (evt.keyCode == KEY.UP) {
    piece.rotate();
    dropStart = Date.now()
  }
  else if (evt.keyCode == KEY.RIGHT) {
    piece.moveRight();
    dropStart = Date.now()
  }
  else if (evt.keyCode == KEY.DOWN) {
    piece.moveDown();
    dropStart = Date.now()
  }
}

// ********** Collisions ***********
