const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const BKG_COLOR = "rgb(228,228,228)"; // Color of an empty square

const PIECES = [
  [Z, "red"],
  [S, "green"],
  [T, "yellow"],
  [O, "blue"],
  [L, "purple"],
  [I, "cyan"],
  [J, "orange"]
];

const KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}
Object.freeze(KEY)
