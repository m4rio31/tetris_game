const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

//************* Size of canvas ***************
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// ************ Scale blocks **************
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// *********** Blocks moves ***************
moves = {
  [KEY.LEFT]: p => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: p => ({ ...p, x: p.x + 1 }),
  [KEY.DOWN]: p => ({ ...p, y: p.y + 1 })
  //[KEY.SPACE]: p => ({ ...p, y: p.y + 1 }),
  //[KEY.UP]: p => board.rotate(p)
};

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
  if (delta > 1000){
    piece.moveDown();
    dropStart = Date.now()
  }
  requestAnimationFrame(drop);
}

document.addEventListener('keydown', control)

function control(evt) {
  if (evt.keyCode == 37) {
    piece.moveLeft();
    dropStart = Date.now()
  }
  else if (evt.keyCode == 38) {
    piece.rotate();
    dropStart = Date.now()
  }
  else if (evt.keyCode == 39) {
    piece.moveRight();
    dropStart = Date.now()
  }
  else if (evt.keyCode == 40) {
    piece.moveDown();
    dropStart = Date.now()
  }
//    board.piece.move(p);
}

//event => {
//  if (moves[event.keyCode]) {
//    // Stop the event from bubbling.
//    event.preventDefault();

    // Get new state of piece
//    let p = moves[event.keyCode](board.piece);

//    if (board.valid(p)) {
      // If the move is valid, move the piece.
//      board.piece.move(p);

      // Clear old position before drawing.
//      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

//      board.piece.draw();
//    }
//  }
//});
