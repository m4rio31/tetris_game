class Board {

    ctx;
    grid;
    piece;

    constructor(ctx) {
      this.ctx = ctx;
      this.init();
    }

    init() {
      this.ctx.canvas.width = COLS * BLOCK_SIZE;
      this.ctx.canvas.height = ROWS * BLOCK_SIZE;

      this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    }

    reset() {
	     this.grid = this.EmptyBoard();
       this.piece = new Piece(this.ctx);
    }

    drawBoard() {
      this.grid.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value != 0) {
            this.ctx.fillStyle = value;
          } else if (value == 0) {
            this.ctx.fillStyle = BKG_COLOR;
          }
          this.ctx.fillRect(x, y, 1, 1);
        });
      });
    }

    draw() {
      this.piece.draw();
      this.drawBoard();
    }


    EmptyBoard() {
      return Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY_SQUARE));
    }

    outsideWalls(x) {
      return x < 0 || x >= COLS;
    }

    underFloor(y) {
      return y >= ROWS;
    }
}
