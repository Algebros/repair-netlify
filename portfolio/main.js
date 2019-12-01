let elements = document.querySelectorAll('.item');
let currentElem = 0;
let isEnabled = true;

function toggleCurrentElem(n) {
    currentElem = (n + elements.length) % elements.length
}

function hiderElements(direction) {
    isEnabled = false;
    elements[currentElem].classList.add(direction);
    elements[currentElem].addEventListener('animationend', function() {
        this.classList.remove('active', direction)
    })
}

function showElements(direction) {
    elements[currentElem].classList.add('next', direction);
    elements[currentElem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    })
}

function prevElement(n) {
    hiderElements('to-right');
    toggleCurrentElem(currentElem - 1);
    showElements('from-left');
}


function nextElement(n) {
    hiderElements('to-left');
    toggleCurrentElem(currentElem + 1);
    showElements('from-right');
}


document.querySelector('.control.left').addEventListener('click', function() {
    if (isEnabled) {
        prevElement(currentElem);
    }
})

document.querySelector('.control.right').addEventListener('click', function() {
    if (isEnabled) {
        nextElement(currentElem);
    }
})

const btn = document.querySelector(".btn");
const listContainer = document.querySelector(".list-container");

document.addEventListener('click', e => {
    if(e.target === btn) listContainer.classList.toggle("hider");
});

const windowToggler = document.getElementById("windowToggler");

windowToggler.textContent = "Mobile";
let widthContainer = document.querySelector(".container");
let body = document.querySelector("body");


function toggler(e) {    
    if(e.target === windowToggler) {
        let cur = windowToggler.textContent;
        windowToggler.textContent = cur === "Mobile" ? "Desktop" : "Mobile";
        widthContainer.style.width = cur === "Mobile" ? 375 + "px" : 824 + "px";
        body.style.backgroundColor = cur === "Mobile" ? "grey" : null;
    }
}

document.addEventListener('click', toggler);

back.addEventListener('click', (e)=>{
    location.reload(true)

})
