class Board {
    grid;

    reset() {
	     this.EmptyBoard();
    }

// *********** Return a matrix of the canvas dimensions, filled with zeros************
    EmptyBoard() {
	    for (var r = 0; r < ROWS; r++) {
        board[r] = [];
        for (var c = 0; c < COLS; c++) {
          board[r][c] = BKG_COLOR;
        }
      }
      return this.grid = board;
    }

    outsideWalls(x) {
      return x < 0 || x >= COLS;
    }

    underFloor(y) {
      return y >= ROWS;
    }
}
