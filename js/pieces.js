class Piece {

    x;
    y;
    color;
    shape;
    ctx;

    constructor(ctx) {
	     this.ctx = ctx;
	     this.spawn();
    }

    spawn() {
	     this.color = PIECES[4][1];
	     this.shape = PIECES[4][0];

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

    rotate() {
      this.delete();
      this.tetrominoN = (this.tetrominoN + 1)%this.shape.length;
      this.tetromino = this.shape[this.tetrominoN];
      this.draw();
    }

}
