const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

//************* Size of canvas ***************
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// ************ Scale blocks **************
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

