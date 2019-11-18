const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 512;

const inputColorCurrent = document.getElementById('colorPicker');
const pencil = document.getElementById('pencil');
const bucket = document.getElementById('bucket');
const chooseColor = document.getElementById('chooseColor');
const colorPalette = document.getElementById('colorPalette');
const blackWhite = document.getElementById('blackWhite');
const uploaderRequest = document.getElementById('uploaderRequest');
const uploaderButton = document.getElementById('uploaderButton');
const listSize = document.querySelector('.list-size');
const checked = document.querySelector('.list-size .item.checked');

let pixelWidth = checked.dataset.size;
let pixelHeight = checked.dataset.size;
let cols = canvas.width / pixelWidth;
let rows = canvas.height / pixelHeight;
let pixelColor = inputColorCurrent.value;
let mouse = null;

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////

function addColor() {
  if (mouse.y < rows && mouse.x < cols) {
    context.fillStyle = pixelColor;
    context.fillRect(mouse.x * pixelWidth, mouse.y * pixelWidth, pixelWidth, pixelWidth);
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


function defaultPencil() {
  canvas.removeEventListener('mousedown', fillBucket);
  canvas.removeEventListener('mousedown', palettePicker);

  canvas.addEventListener('mousedown', startDrawing);
}
// defaultPencil();
pencil.addEventListener('click', defaultPencil);

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 80) {
    canvas.removeEventListener('mousedown', fillBucket);
    canvas.removeEventListener('mousedown', palettePicker);

    canvas.addEventListener('mousedown', startDrawing);
  }
});

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////

bucket.addEventListener('click', () => {
  canvas.removeEventListener('mousedown', startDrawing);
  canvas.removeEventListener('mousedown', palettePicker);

  canvas.addEventListener('mousedown', fillBucket);
});

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 66) {
    canvas.removeEventListener('mousedown', startDrawing);
    canvas.removeEventListener('mousedown', palettePicker);

    canvas.addEventListener('mousedown', fillBucket);
  }
});

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////

chooseColor.addEventListener('click', () => {
  canvas.removeEventListener('mousedown', startDrawing);
  canvas.removeEventListener('mousedown', fillBucket);

  canvas.addEventListener('mousedown', palettePicker);
});

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 67) {
    canvas.removeEventListener('mousedown', startDrawing);
    canvas.removeEventListener('mousedown', fillBucket);

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
