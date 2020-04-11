class Board {
    grid;

    reset() {
	     this.grid = this.EmptyBoard();
    }

// *********** Return a matrix of the canvas dimensions, filled with zeros************
    EmptyBoard() {
	     return Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }
}
