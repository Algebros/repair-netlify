const canvas = document.getElementById("canvas");
canvas.width = 512;
canvas.height = 512;

let pixelWidth = 128;
let pixelHeight = 128;
let pixelColor = "";
let arr = [];
// let drawPos = [];

let cols = canvas.width / pixelWidth;
let rows = canvas.height / pixelHeight;
const ctx = canvas.getContext('2d');

for (let i = 0; i < rows; i++) {
    let arrRow = [];
    for (let z = 0; z < cols; z++) {
        arrRow.push("");
    }
    arr.push(arrRow);
}

function draw(arg, context, scale) {
    let width = arg[0].length;
    let height = arg.length;  
    for (var row = 0; row < height; row++) {
      for (var col = 0; col < width; col++) {
        context.fillStyle = "red";
        context.fillRect(col * scale, row * scale, scale, scale);
      }
    }
  }
draw(arr, ctx, pixelWidth);
console.log(arr)

canvas.addEventListener('mousemove', recordMouseMovement);
// canvas.addEventListener('mousemove', drawImage);
// canvas.addEventListener('mousedown', startDrawing);
// canvas.addEventListener('mouseup', stopDrawing);
// colorPicker.addEventListener("input", watchColorPicker);

function getMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    // console.log(`x || ${(Math.round((event.clientX - rect.left - (pixelWidth / 2)) / pixelWidth))}`)
    // console.log(`y || ${(Math.round((event.clientY - rect.top - (pixelHeight / 2)) / pixelHeight))}`)
    return {
        x: (Math.round((event.clientX - rect.left - (pixelWidth / 2)) / pixelWidth)),
        y: (Math.round((event.clientY - rect.top - (pixelHeight / 2)) / pixelHeight))
    };
    // return {
    //     x: (Math.round((event.clientX - rect.left - (pixelWidth / 2)) / pixelWidth) * pixelWidth),
    //     y: (Math.round((event.clientY - rect.top - (pixelHeight / 2)) / pixelHeight) * pixelHeight)
    // };
}

function recordMouseMovement(event) {
    mouse = getMousePos(event);
    console.log(mouse.y)
    arr[mouse.y][mouse.x] = "1";
    console.log(arr)
}

// function startDrawing(event) {
//     if (event.button == 0) {
//         mark = setInterval(function () {
//             var pos = mouse;
//             if (drawPos.length > 1 && drawPos.slice(-1)[0].x == pos.x && drawPos.slice(-1)[0].y == pos.y) { }
//             else {
//                 pos['color'] = pixelColor;
//                 drawPos.push(pos);
//             }
//         }, 10);
//     }
// }

// function drawImage() {
//     var p = 0;
//     while (p < drawPos.length) {
//         ctx.fillStyle = drawPos[p].color || pixelColor;
//         ctx.fillRect(drawPos[p].x, drawPos[p].y, pixelWidth, pixelHeight);
//         p++;
//     }
// }

// function stopDrawing(event) {
//     clearInterval(mark);
// }

// function watchColorPicker(event) {
//     pixelColor = event.target.value;
// }


//////////////////////////// STAROE


const canvas = document.getElementById("canvas");
canvas.width = 512;
canvas.height = 512;

const ctx = canvas.getContext('2d');

let pixelWidth = 128;
let pixelHeight = 128;
let pixelColor = "black";
let drawPos = [];

canvas.addEventListener('mousemove', recordMouseMovement);
canvas.addEventListener('mousemove', drawImage);
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
colorPicker.addEventListener("input", watchColorPicker);

function getMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    // console.log(`x || ${(Math.round((event.clientX - rect.left - (pixelWidth / 2)) / pixelWidth))}`)
    // console.log(`y || ${(Math.round((event.clientY - rect.top - (pixelHeight / 2)) / pixelHeight))}`)
    return {
        x: (Math.round((event.clientX - rect.left - (pixelWidth / 2)) / pixelWidth) * pixelWidth),
        y: (Math.round((event.clientY - rect.top - (pixelHeight / 2)) / pixelHeight) * pixelHeight)
    };
}

function startDrawing(event) {
    if (event.button == 0) {
        mark = setInterval(function () {
            var pos = mouse;
            pos['color'] = pixelColor;
            drawPos.push(pos);
        }, 10);
    }
    console.log(drawPos)
}

function drawImage() {
    var p = 0;
    while (p < drawPos.length) {
        ctx.fillStyle = drawPos[p].color || pixelColor;
        ctx.fillRect(drawPos[p].x, drawPos[p].y, pixelWidth, pixelHeight);
        p++;
    }
}

function recordMouseMovement(event) {
    mouse = getMousePos(event);
}

function stopDrawing(event) {
    clearInterval(mark);
}

function watchColorPicker(event) {
    pixelColor = event.target.value;
}

canvas.addEventListener("mousedown", function (e) {
    let rect = canvas.getBoundingClientRect();
    let x = e.pageX - rect.x;
    let y = e.pageY - rect.y;
    let c = this.getContext('2d');
    let p = c.getImageData(x, y, 1, 1).data;
    let hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    console.log(hex)
});

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}