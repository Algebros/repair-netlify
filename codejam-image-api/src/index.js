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
const blackWhite = document.getElementById('blackWhite');
const uploaderRequest = document.getElementById('uploaderRequest');
const uploaderButton = document.getElementById('uploaderButton');
const cleanerCC = document.getElementById('cleanerCC');
const listSize = document.querySelector('.list-size');
const palleteList = document.querySelector('.pallete-list');
const checked = document.querySelector('.list-size .item.checked');


let pixelWidth = checked.dataset.size;
let pixelHeight = checked.dataset.size;
let cols = canvas.width / pixelWidth;
let rows = canvas.height / pixelHeight;
let pixelColor = inputColorCurrent.value;
let coordsLastImage = null;
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


function defaultPencil() {
  canvas.removeEventListener('mousedown', fillBucket);
  canvas.removeEventListener('mousedown', palettePicker);

  canvas.addEventListener('mousedown', startDrawing);
}
defaultPencil();
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


// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////

async function getLinkToImage() {
  const request = uploaderRequest.value;
  const accessKey = '1f886df6fc660436f9482cbb84261db63a5d25eb846e869c59ae1ba074b5b60f';
  const url = `https://api.unsplash.com/photos/random?query=${request}&client_id=${accessKey}`;

  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = data.urls.small;
    if(coordsLastImage !== null) {
      context.clearRect(coordsLastImage[0], coordsLastImage[1], coordsLastImage[2], coordsLastImage[3]);
    }    
    img.onload = (e) => {
      let coordsX;
      let coordsY;
      let width;
      let height;
      if (img.width === img.height) {
        context.drawImage(img, (canvas.width - img.width) / 2, (canvas.width - img.height) / 2);
        coordsX = (canvas.width - img.width) / 2;
        coordsY = (canvas.width - img.height) / 2
        width = img.width;
        height = img.height;
      } else if (img.width > img.height) {
        context.drawImage(img, 0, (canvas.width - img.height) / 2, canvas.width, img.height);
        coordsX = 0;
        coordsY = (canvas.width - img.height) / 2;
        width = canvas.width;
        height = img.height;
      } else if (img.width < img.height) {
        context.drawImage(img, (canvas.width - img.width) / 2, 0, img.width, canvas.height);
        coordsX = (canvas.width - img.width) / 2;
        coordsY = 0;
        width = img.width;
        height = canvas.height;
      }
      coordsLastImage = [coordsX, coordsY, width, height];
      localStorage.setItem('canvasStorage', canvas.toDataURL());
    };
  } catch (e) {
    throw new TypeError(e);
  }
}

function grayScale() {
  const imgData = context.getImageData(0, 0, canvas.width, canvas.height);

  const px = imgData.data;
  for (let i = 0, n = px.length; i < n; i += 4) {
    const arr = px[i] * 0.3 + px[i + 1] * 0.59 + px[i + 2] * 0.11;
    px[i] = arr;
    px[i + 1] = arr;
    px[i + 2] = arr;
  }
  context.putImageData(imgData, 0, 0);
}

blackWhite.addEventListener('click', grayScale);

uploaderButton.addEventListener('click', getLinkToImage);

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


cleanerCC.addEventListener('click', () => {
  localStorage.removeItem('canvasStorage');
  context.clearRect(0, 0, canvas.width, canvas.height);
});

palleteList.addEventListener('mousedown', (e) => {
  colorPicker.value = "#" + e.target.dataset.color;
  pixelColor = "#" + e.target.dataset.color;
});
