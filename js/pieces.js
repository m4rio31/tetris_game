class Piece {

    x;
    y;
    color;
    shape;
    ctx;

    constructor(ctx, r) {
	     this.ctx = ctx;
	     this.spawn(PIECES[r][0], PIECES[r][1]);
    }

    spawn(piece, color) {
	     this.color = color;
	     this.shape = piece;

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

    rotate() {  // FIX FLOOR COLLISIONS
      let nextPattern = this.shape[(this.tetrominoN + 1)%this.shape.length];
      let kickX = 0;
      let kickY = 0;

      if(this.collision(0, 0, nextPattern)){
        if(this.x > COLS/2){
            // it's the right wall
            kickX = -1; // we need to move the piece to the left
        }else{
            // it's the left wall
            kickX = 1; // we need to move the piece to the right
        }
        if (this.y > ROWS/2) {
          kickY = -1;
        }
      }

      if(!this.collision(kickX, kickY, nextPattern)) {
        this.delete();
        this.x += kickX;
        this.y += kickY
        this.tetrominoN = (this.tetrominoN + 1)%this.shape.length;
        this.tetromino = this.shape[this.tetrominoN];
        this.draw();
      }
    }

    collision(x, y, piece) {
      this.board = new Board();
      for (var r = 0; r < piece.length; r++) {
        for (var c = 0; c < piece.length; c++) {
          if (!piece[r][c]) {
            continue;
          }

          let newX = this.x + c + x;
          let newY = this.y + c + y;

          if (this.board.outsideWalls(newX) || this.board.underFloor(newY)) {
            return true;
          }
          if (newY < 0) {
            continue;
          }
        }
      }
      return false;
    }

}
