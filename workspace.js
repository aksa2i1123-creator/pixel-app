let IS_CLICKED = false; // Untuk cek mouse
let FILL_MODE = false; // Untuk Fill

let CURRENT_COLOR = 'rgb(255, 102, 46)'
let DEFAULT_COLOR = 'rgb(62, 62, 62)'

let COLOR_MAP = {
  red: 'rgb(255, 0, 0)',
  green: 'rgb(0, 255, 0)',
  blue: 'rgb(0, 0, 255)'
}

// Monitor kondisi mouse
document.addEventListener('mousedown', function(){
  IS_CLICKED = true;
  console.log('Mouse ditekan', IS_CLICKED)
})

document.addEventListener('mouseup', function(){
  IS_CLICKED = false;
  console.log('Mouse dilepas', IS_CLICKED)
})

// membuat grid pixel
let field = document.querySelector('.field')
for (let i=0; i < 450; i += 1){
  let cell = document.createElement('div')
  cell.classList.add('cell')
  cell.setAttribute('id', `${i}`)
  field.appendChild(cell)
}

// Validasi jumlah grid yang ada
// console.log('Field:', field)
// console.log('Total cells:', field.children.length)
// console.log('Cell yang pertama', field.children[0])
// console.log('Cell yang terakhir', field.children[449])

let cells = document.querySelectorAll('.cell');

// for (let i = 0; i < cells.length; i++){
//   let cell = cells[i];

//   // Warnai tiap cell
//   cell.addEventListener('click', function(){
//     cell.style.backgroundColor = CURRENT_COLOR
//   });

//   // Warnai sambil drag
//   cell.addEventListener('mouseover', function(){
//     if (IS_CLICKED){
//       cell.style.backgroundColor = CURRENT_COLOR
//     }
//   })

//   // 
//   cell.addEventListener('mousedown', function(){

//     // Cancel Fill
//     cells.forEach(targetCell => {
//       targetCell.getAnimations().forEach(animation => {
//         animation.cancel();
//       });
//     });

//     if(FILL_MODE) {
//       let cell_id = parseInt(cell.getAttribute('id'));
//       let gridCols = 30;
//       let startRow = Math.floor(cell_id / gridCols);
//       let startCol = cell_id % gridCols;

//       cells.forEach((targetCell, index) => {
//         let targetRow = Math.floor(index / gridCols);
//         let targetCol = index % gridCols;

//         let rowDist = Math.abs(targetRow - startRow);
//         let colDist = Math.abs(targetCol - startCol);
//         let distance = rowDist + colDist;

//         let delay = distance * 30;

//         targetCell.animate([
//           {
//             backgroundColor: CURRENT_COLOR
//           }
//         ], {
//           duration: 300,
//           easing: 'ease-in-out',
//           delay: delay,
//           fill: 'forwards'
//         });
//       });
//       setTimeout(() => {
//         for (let j = 0; j < cells.length; j++) {
//           cells[j].style.backgroundColor = CURRENT_COLOR;
//         }
//       }, 1000)
//     } else {
//       cell.style.backgroundColor = CURRENT_COLOR;
//     }
//   })
// }

const GRID_COLS = 30;
const GRID_ROWS = 15;

function getCellColor(cell) {
  return getComputedStyle(cell).backgroundColor;
}

function floodFill(startIndex, newColor) {
  const startCell = cells[startIndex];
  if (!startCell) return;

  const targetColor = getCellColor(startCell);

  if (targetColor === newColor) return;

  const stack = [startIndex];
  const visited = new Set();

  while (stack.length > 0) {
    const index = stack.pop();

    if (visited.has(index)) continue;
    visited.add(index);

    const cell = cells[index];

    if (getCellColor(cell) !== targetColor) continue;

    cell.style.backgroundColor = newColor;

    const row = Math.floor(index / GRID_COLS);
    const col = index % GRID_COLS;

    if (row > 0) stack.push(index - GRID_COLS);
    if (row < GRID_ROWS - 1) stack.push(index + GRID_COLS);
    if (col > 0) stack.push(index - 1);
    if (col < GRID_COLS - 1) stack.push(index + 1);
  }
}


cells.forEach((cell, index) => {
  cell.addEventListener('click', function () {
    if (FILL_MODE) {
      floodFill(index, CURRENT_COLOR);
    } else {
      cell.style.backgroundColor = CURRENT_COLOR;
    }
  });

  cell.addEventListener('mouseover', function () {
    if (IS_CLICKED && !FILL_MODE) {
      cell.style.backgroundColor = CURRENT_COLOR;
    }
  });
});


// Mekanisme klik warna
let color_cells = document.querySelectorAll('.color-cell');
for (let i = 0; i < color_cells.length; i++){
  let color_cell = color_cells[i];

  color_cell.addEventListener('click', function(){
    let colorClass = '';

    if (color_cell.classList.contains('red')){
      colorClass = 'red';
    } else if (color_cell.classList.contains('green')){
      colorClass = 'green';
    } else if (color_cell.classList.contains('blue')){
      colorClass = 'blue'
    }

    // Ini untuk set warna yang dipilih
    CURRENT_COLOR = COLOR_MAP[colorClass];

    // Matikan mode Fill
    FILL_MODE = false;


    document.querySelector('.selected')?.classList.remove('selected');
    this.classList.add('selected')


    console.log('Warna aktif:', CURRENT_COLOR)
  })
}

let eraser = document.querySelector('.eraser')
eraser.addEventListener('click', function(){
  CURRENT_COLOR = DEFAULT_COLOR
  FILL_MODE = false

  document.querySelector('.selected').classList.remove('selected')
  this.classList.add('selected')

  console.log('Eraser aktif:', CURRENT_COLOR)
})


let fill_tool = document.querySelector('.fill-tool')
fill_tool.addEventListener('click', function(){
  FILL_MODE = true;

  document.querySelector('.selected').classList.remove('selected')
  this.classList.add('selected')
})