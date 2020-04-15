class Piece {

    x;
    y;
    color;
    shape;
    ctx;

    constructor(ctx, index) {
	     this.ctx = ctx;
	     this.spawn(PIECES[index][0], PIECES[index][1]);
    }

    spawn(piece, color) {
      this.shape = piece;
	    this.color = color;

      this.tetrominoN = 0;
      this.tetromino = this.shape[this.tetrominoN];

	    this.x = 3;
	    this.y = -2;
    }

    fill(color) {
	     this.ctx.fillStyle = color;
	     this.tetromino.forEach((row, y) => {
	        row.forEach((value, x) => {
		          if (value > 0) {
		              this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
		          }
	        });
	     });
    }

    draw() {
	     this.fill(this.color);
    }

    delete() {
       this.fill(BKG_COLOR);
    }

    moveDown() {
      this.delete();
      this.y++;
      this.draw();
    }

    moveLeft() {
      this.delete();
      this.x--;
      this.draw();
    }

    moveRight() {
      this.delete();
      this.x++;
      this.draw();
    }

    rotate(kickX, kickY) {
      this.delete();
      this.x += kickX;
      this.y += kickY;
      this.tetrominoN = (this.tetrominoN + 1)%this.shape.length;
      this.tetromino = this.shape[this.tetrominoN];
      this.draw();
    }


}
