class Board {
    grid;

    reset() {
	     this.grid = this.EmptyBoard();
    }

// *********** Return a matrix of the canvas dimensions, filled with zeros************
    EmptyBoard() {
	     return Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }

    outsideWalls(x) {
      return x < 0 || x >= COLS;
    }

    underFloor(y) {
      return y > ROWS;
    }
}
