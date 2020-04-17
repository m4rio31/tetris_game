const COLS = 10;
const ROWS = 20;
const BKG_COLOR =  "rgb(228,228,228)"; // Color of an empty square
const EMPTY_SQUARE = 0;
const BLOCK_SIZE = 30;
const LINES_PER_LEVEL = 10;

const PIECES = [
  [Z, "red"],
  [S, "green"],
  [T, "yellow"],
  [O, "blue"],
  [L, "purple"],
  [I, "cyan"],
  [J, "orange"]
];
Object.freeze(PIECES);

const KEY = {
  SPACEBAR: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};
Object.freeze(KEY);

const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800
}
Object.freeze(POINTS);

const LEVEL = {
  0: 800,
  1: 720,
  2: 630,
  3: 550,
  4: 470,
  5: 380,
  6: 300,
  7: 220,
  8: 130,
  9: 100,
  10: 80,
  11: 80,
  12: 80,
  13: 70,
  14: 70,
  15: 70,
  16: 50,
  17: 50,
  18: 50,
  19: 30,
  20: 30,
  // 29+ is 20ms
};
Object.freeze(LEVEL);
