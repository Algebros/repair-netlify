let dataA = [];
let dataB = [];

fetch('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json')
  .then(response => response.json())
  .then(result => dataA.push(result));

fetch('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json')
  .then(response => response.json())
  .then(result => dataB.push(result));

let mapping = document.querySelector(".size-map");
mapping.addEventListener("click", (e) => {
  if (e.target.nodeName === "LI") {
    let checked = document.querySelector(".checked");
    checked.classList.remove("checked");
    e.target.classList.add("checked");

    if (e.target.dataset.size == 4) {
      draw(dataA[0], cvs, context, size);
    } else if (e.target.dataset.size == 32) {
      draw(dataB[0], cvs, context, size);
    } else if (e.target.dataset.size == 0) {
      defaultState();
    }
  }
});

let cvs = document.getElementById("canvas");
context = cvs.getContext("2d");
let size = 512;
cvs.width = size;
cvs.height = size;

function defaultState() {
  let img = new Image();
  img.src = "image.png";
  img.onload = () => context.drawImage(img, 0, 0, size, size);
}
defaultState();

function draw(arg, cvs, context, size) {
  let width = arg[0].length;
  let height = arg.length;
  let scale = size / width;

  for (var row = 0; row < height; row++) {
    for (var col = 0; col < width; col++) {
      let typeColor = typeof arg[row][col];
      if (typeColor === "string") {
        context.fillStyle = `#${arg[row][col]}`;
      } else if (typeColor === "object") {
        context.fillStyle = `rgba(${arg[row][col]})`;
      }
      context.fillRect(col * scale, row * scale, scale, scale);
    }
  }
}