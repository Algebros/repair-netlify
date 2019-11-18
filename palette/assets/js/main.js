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

function startDrawing(event) {
  if (event.button === 0) {
    function addColor() {
      draw(arr);
      if (mouse.y < rows && mouse.x < cols) {
        arr[mouse.y][mouse.x] = pixelColor;
      }
    }
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

function palettePicker(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.pageX - rect.x;
  const y = e.pageY - rect.y;
  const c = this.getContext('2d');
  const p = c.getImageData(x, y, 1, 1).data;
  const hex = `#${(`000000${rgbToHex(p[0], p[1], p[2])}`).slice(-6)}`;
  colorPicker.value = hex;
  pixelColor = hex;

  function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) throw 'Invalid color component';
    return ((r << 16) | (g << 8) | b).toString(16);
  }
}

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////

pencil.addEventListener('click', () => {
  canvas.removeEventListener('mousedown', fillBucket);
  canvas.removeEventListener('mousedown', palettePicker);

  canvas.addEventListener('mousedown', startDrawing);
});

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
  // console.log(getComputedStyle(event.target))
  if (event.target.classList.contains('color')) {
    // colorPalette.setAttribute('value', rgbStringToHex(event.target.style.backgroundColor));
    colorPicker.value = rgbStringToHex(event.target.style.backgroundColor);
    pixelColor = rgbStringToHex(event.target.style.backgroundColor);
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