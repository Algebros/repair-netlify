const canvas = document.getElementById('canvas');
canvas.width = 512;
canvas.height = 512;

const pixelWidth = 128;
const pixelHeight = 128;
let pixelColor = '#000000';
// const prevPixelColor = '';
let mouse = null;

const localSt = localStorage.getItem('currentState');
const arr = JSON.parse(localSt) || [];
localStorage.removeItem('currentState');
const cols = canvas.width / pixelWidth;
const rows = canvas.height / pixelHeight;
const ctx = canvas.getContext('2d');

const colorPicker = document.getElementById('colorPicker');
const pencil = document.getElementById('pencil');
const bucket = document.getElementById('bucket');
const chooseColor = document.getElementById('chooseColor');
const colorPalette = document.getElementById('colorPalette');

function grid(color = 'white') {
  for (let i = 0; i < rows; i += 1) {
    const arrRow = [];
    for (let z = 0; z < cols; z += 1) {
      arrRow.push(color);
    }
    arr.push(arrRow);
  }
}
grid();

function draw(arg) {
  const width = arg[0].length;
  const height = arg.length;
  for (let row = 0; row < height; row += 1) {
    for (let col = 0; col < width; col += 1) {
      ctx.fillStyle = arr[row][col];
      ctx.fillRect(col * pixelWidth, row * pixelWidth, pixelWidth, pixelWidth);
    }
  }
}
draw(arr);

function saveState(event) {
  if (event.key !== 'F5') {
    localStorage.removeItem('currentState');
    const json = JSON.stringify(arr);
    localStorage.setItem('currentState', json);
  }
}
canvas.addEventListener('mouseup', saveState);
canvas.addEventListener('keyup', saveState);

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////

function addColor() {
  draw(arr);
  if (mouse.y < rows && mouse.x < cols) {
    arr[mouse.y][mouse.x] = pixelColor;
  }
}

function startDrawing(event) {
  if (event.button === 0) {
    canvas.addEventListener('mousemove', addColor);

    canvas.addEventListener('mouseup', () => {
      canvas.removeEventListener('mousemove', addColor);
    });
  }
}

function fillBucket(event) {
  if (event.button === 0) {
    for (let i = 0; i < arr.length; i += 1) {
      for (let z = 0; z < arr.length; z += 1) {
        arr[i][z] = colorPicker.value;
      }
    }
    draw(arr);
  }
}

function rgbStringToHex(rgb) {
  const newArr = rgb.split(/\D+/);
  let hex = '';
  newArr.forEach((element) => {
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
  const prevColor = document.querySelector('.prev-color .color');
  prevColor.style.backgroundColor = pixelColor;

  const rect = canvas.getBoundingClientRect();
  const x = e.pageX - rect.x;
  const y = e.pageY - rect.y;
  const c = this.getContext('2d');
  const p = c.getImageData(x, y, 1, 1).data;
  const hex = rgbStringToHex(`(${p[0]}, ${p[1]}, ${p[2]})`);
  colorPicker.value = hex;
  pixelColor = hex;
}

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////

pencil.addEventListener('click', (event) => {
  canvas.removeEventListener('mousedown', fillBucket);
  canvas.removeEventListener('mousedown', palettePicker);
  const active = document.querySelector('.active');
  if (active !== null) active.classList.remove('active');
  event.target.classList.add('active');
  canvas.addEventListener('mousedown', startDrawing);
});

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
    colorPicker.value = rgbStringToHex(event.target.style.backgroundColor);
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

colorPicker.addEventListener('input', watchColorPicker);

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////

function getMousePos(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (Math.round((event.clientX - rect.left - (pixelWidth / 2)) / pixelWidth)),
    y: (Math.round((event.clientY - rect.top - (pixelHeight / 2)) / pixelHeight)),
  };
}

function recordMouseMovement(event) {
  mouse = getMousePos(event);
}

canvas.addEventListener('mousemove', recordMouseMovement);

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////
