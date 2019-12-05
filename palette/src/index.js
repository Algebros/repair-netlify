const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 512;
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

const inputColorCurrent = document.getElementById('colorPicker');
const pencil = document.getElementById('pencil');
const bucket = document.getElementById('bucket');
const chooseColor = document.getElementById('chooseColor');
const colorPalette = document.getElementById('colorPalette');
const listSize = document.querySelector('.list-size');
const checked = document.querySelector('.list-size .item.checked');


let pixelWidth = checked.dataset.size;
let pixelHeight = checked.dataset.size;
let cols = canvas.width / pixelWidth;
let rows = canvas.height / pixelHeight;
let pixelColor = inputColorCurrent.value;
let mouse = [];

const dataURL = localStorage.getItem('canvasStorage');
if (dataURL !== null) {
  const img = new Image();
  img.src = dataURL;
  img.onload = () => {
    context.drawImage(img, 0, 0);
  };
}

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////

function getMousePos(event) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.round((event.clientX - rect.left - (pixelWidth / 2)) / pixelWidth);
  const y = Math.round((event.clientY - rect.top - (pixelHeight / 2)) / pixelHeight);
  const arr = [x, y];
  return arr;
}

function calcStraightLine(startCoordinates, endCoordinates) {
  const coordinatesArray = [];
  // Translate coordinates
  let x1 = startCoordinates[0];
  let y1 = startCoordinates[1];
  const x2 = endCoordinates[0];
  const y2 = endCoordinates[1];
  // Define differences and error check
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = (x1 < x2) ? 1 : -1;
  const sy = (y1 < y2) ? 1 : -1;
  let err = dx - dy;
  // Set first coordinates
  coordinatesArray.push([x1, y1]);
  // Main loop
  while (!((x1 === x2) && (y1 === y2))) {
    // const e2 = err << 1;
    const e2 = err * 2;
    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
    // Set coordinates
    coordinatesArray.push([x1, y1]);
  }
  // Return the result
  return coordinatesArray;
}

function render(event) {
  const current = getMousePos(event);
  if (current[0] < rows && current[1] < cols) {
    if (mouse.length === 0) mouse.push(current[0], current[1]);
    const arr = calcStraightLine([mouse[0], mouse[1]], current);
    for (let i = 0; i < arr.length; i += 1) {
      context.fillStyle = pixelColor;
      context.fillRect(arr[i][0] * pixelWidth, arr[i][1] * pixelHeight, pixelWidth, pixelHeight);
    }
    mouse = [current[0], current[1]];
  }
}

function startDrawing(event) {
  if (event.button === 0) {
    canvas.addEventListener('mousemove', render);

    canvas.addEventListener('mouseup', () => {
      canvas.removeEventListener('mousemove', render);
      mouse = [];
    });

    canvas.addEventListener('mouseout', () => {
      canvas.removeEventListener('mousemove', render);
      mouse = [];
    });
  }
}

function fillBucket(event) {
  if (event.button === 0) {
    context.fillStyle = pixelColor;
    context.fillRect(0, 0, 512, 512);
  }
}

function rgbStringToHex(rgb) {
  const arr = rgb.split(/\D+/);
  let hex = '';
  arr.forEach((element) => {
    if (element !== '') {
      if (+element < 10) {
        hex += `0${element}`;
      } else {
        hex += Number(element).toString(16);
      }
    }
  });
  return `#${hex}`;
}

function palettePicker(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.pageX - rect.x;
  const y = e.pageY - rect.y;
  const c = this.getContext('2d');
  const p = c.getImageData(x, y, 1, 1).data;
  const hex = rgbStringToHex(`(${p[0]}, ${p[1]}, ${p[2]})`);
  inputColorCurrent.value = hex;
  pixelColor = hex;
}

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////


function defaultPencil(event) {
  canvas.removeEventListener('mousedown', fillBucket);
  canvas.removeEventListener('mousedown', palettePicker);

  const active = document.querySelector('.active');
  if (active !== null) active.classList.remove('active');
  event.target.classList.add('active');

  canvas.addEventListener('mousedown', startDrawing);
}

pencil.addEventListener('click', defaultPencil);

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 80) {
    canvas.removeEventListener('mousedown', fillBucket);
    canvas.removeEventListener('mousedown', palettePicker);

    const active = document.querySelector('.active');
    if (active !== null) active.classList.remove('active');
    pencil.classList.add('active');

    canvas.addEventListener('mousedown', startDrawing);
  }
});

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////

bucket.addEventListener('click', (event) => {
  canvas.removeEventListener('mousedown', startDrawing);
  canvas.removeEventListener('mousedown', palettePicker);

  const active = document.querySelector('.active');
  if (active !== null) active.classList.remove('active');
  event.target.classList.add('active');

  canvas.addEventListener('mousedown', fillBucket);
});

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 66) {
    canvas.removeEventListener('mousedown', startDrawing);
    canvas.removeEventListener('mousedown', palettePicker);

    const active = document.querySelector('.active');
    if (active !== null) active.classList.remove('active');
    bucket.classList.add('active');

    canvas.addEventListener('mousedown', fillBucket);
  }
});

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////

chooseColor.addEventListener('click', (event) => {
  canvas.removeEventListener('mousedown', startDrawing);
  canvas.removeEventListener('mousedown', fillBucket);

  const active = document.querySelector('.active');
  if (active !== null) active.classList.remove('active');
  event.target.classList.add('active');

  canvas.addEventListener('mousedown', palettePicker);
});

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 67) {
    canvas.removeEventListener('mousedown', startDrawing);
    canvas.removeEventListener('mousedown', fillBucket);

    const active = document.querySelector('.active');
    if (active !== null) active.classList.remove('active');
    chooseColor.classList.add('active');

    canvas.addEventListener('mousedown', palettePicker);
  }
});

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////
function paletteColor(event) {
  if (event.target.classList.contains('color')) {
    inputColorCurrent.value = rgbStringToHex(event.target.style.backgroundColor);
    pixelColor = rgbStringToHex(event.target.style.backgroundColor);
  }
}

colorPalette.addEventListener('click', paletteColor);

// ///////////////////////////////////////////////////////

function watchColorPicker(event) {
  const prevColor = document.querySelector('.prev-color .color');
  prevColor.style.backgroundColor = pixelColor;
  pixelColor = event.target.value;
}

inputColorCurrent.addEventListener('input', watchColorPicker);

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////

listSize.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI' && !event.target.classList.contains('checked')) {
    const isCheck = document.querySelector('.checked');
    isCheck.classList.remove('checked');
    event.target.classList.add('checked');

    pixelWidth = event.target.dataset.size;
    pixelHeight = event.target.dataset.size;
    cols = canvas.width / event.target.dataset.size;
    rows = canvas.height / event.target.dataset.size;
  }
});

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////

document.addEventListener('click', () => {
  localStorage.setItem('canvasStorage', canvas.toDataURL());
});

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////

const chooseColorRed = document.querySelector('li.item[data-color="ff0000"]');
const chooseColorBlue = document.querySelector('li.item[data-color="00ff00"]');
let lastCol = inputColorCurrent.value;

document.addEventListener('click', (e) => {
  if (e.target.closest('li') === chooseColorRed || e.target.closest('li') === chooseColorBlue) {
    const prevColor = document.querySelector('.prev-color .color');
    const choseCol = e.target.closest('li').dataset.color;

    prevColor.style.backgroundColor = lastCol;

    inputColorCurrent.value = `#${choseCol}`;
    pixelColor = `#${choseCol}`;
    lastCol = `#${choseCol}`;
  }
});
