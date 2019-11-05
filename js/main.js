let arrEng = [
    [["eng"], ["\`", "Backquote", "~"], ["1", "Digit1", "!"], ["2", "Digit2", "@"], ["3", "Digit3", "#"], ["4", "Digit4", "$"], ["5", "Digit5", "%"], ["6", "Digit6", "^"], ["7", "Digit7", "&"], ["8", "Digit8", "*"], ["9", "Digit9", "("], ["0", "Digit0", ")"], ["-", "Minus", "_"], ["=", "Equal", "+"], ["Backspace", "Backspace"]],
    [["Tab", "Tab"], ["q", "KeyQ", "Q"], ["w", "KeyW", "W"], ["e", "KeyE", "E"], ["r", "KeyR", "R"], ["t", "KeyT", "T"], ["y", "KeyY", "Y"], ["u", "KeyU", "U"], ["i", "KeyI", "I"], ["o", "KeyO", "O"], ["p", "KeyP", "P"], ["[", "BracketLeft", "{"], ["]", "BracketRight", "}"], ["\\", "Backslash", "|"]],
    [["CapsLock", "CapsLock"], ["a", "KeyA", "A"], ["s", "KeyS", "S"], ["d", "KeyD", "D"], ["f", "KeyF", "F"], ["g", "KeyG", "G"], ["h", "KeyH", "H"], ["j", "KeyJ", "J"], ["k", "KeyK", "K"], ["l", "KeyL", "L"], [";", "Semicolon", ":"], ["\'", "Quote", "\""], ["Enter", "Enter"]],
    [["Shift", "ShiftLeft"], ["z", "KeyZ", "Z"], ["x", "KeyX", "X"], ["c", "KeyC", "C"], ["v", "KeyV", "V"], ["b", "KeyB", "B"], ["n", "KeyN", "N"], ["m", "KeyM", "M"], [",", "Comma", "<"], [".", "Period", ">"], ["/", "Slash", "?"], ["Shift", "ShiftRight"], ["arrUp", "ArrowUp"]],
    [["Ctrl", "ControlLeft"], ["Win", "MetaLeft"], ["Alt", "AltLeft"], ["Space", "Space"], ["Alt", "AltRight"], ["Cnt", "ContextMenu"], ["Ctrl", "ControlRight"], ["arrLeft", "ArrowLeft"], ["arrDown", "ArrowDown"], ["arrRight", "ArrowRight"]]
];

let arrRus = [
    [["rus"], ["ё", "Backquote", "Ё"], ["1", "Digit1", "!"], ["2", "Digit2", "\""], ["3", "Digit3", "№"], ["4", "Digit4", ";"], ["5", "Digit5", "%"], ["6", "Digit6", ":"], ["7", "Digit7", "?"], ["8", "Digit8", "*"], ["9", "Digit9", "("], ["0", "Digit0", ")"], ["-", "Minus", "_"], ["=", "Equal", "+"], ["Backspace", "Backspace"]],
    [["Tab", "Tab"], ["й", "KeyQ", "Й"], ["ц", "KeyW", "Ц"], ["у", "KeyE", "У"], ["к", "KeyR", "К"], ["е", "KeyT", "Е"], ["н", "KeyY", "Н"], ["г", "KeyU", "Г"], ["ш", "KeyI", "Ш"], ["щ", "KeyO", "Щ"], ["з", "KeyP", "З"], ["х", "BracketLeft", "Х"], ["ъ", "BracketRight", "Ъ"], ["\\", "Backslash", "/"]],
    [["CapsLock", "CapsLock"], ["ф", "KeyA", "Ф"], ["ы", "KeyS", "Ы"], ["в", "KeyD", "В"], ["а", "KeyF", "А"], ["п", "KeyG", "П"], ["р", "KeyH", "Р"], ["о", "KeyJ", "О"], ["л", "KeyK", "Л"], ["д", "KeyL", "Д"], ["ж", "Semicolon", "Ж"], ["э", "Quote", "Э"], ["Enter", "Enter"]],
    [["Shift", "ShiftLeft"], ["я", "KeyZ", "Я"], ["ч", "KeyX", "Ч"], ["с", "KeyC", "С"], ["м", "KeyV", "М"], ["и", "KeyB", "И"], ["т", "KeyN", "Т"], ["ь", "KeyM", "Ь"], ["б", "Comma", "Б"], ["ю", "Period", "Ю"], [".", "Slash", ","], ["Shift", "ShiftRight"], ["arrUp", "ArrowUp"]],
    [["Ctrl", "ControlLeft"], ["Win", "MetaLeft"], ["Alt", "AltLeft"], ["Space", "Space"], ["Alt", "AltRight"], ["Cnt", "ContextMenu"], ["Ctrl", "ControlRight"], ["arrLeft", "ArrowLeft"], ["arrDown", "ArrowDown"], ["arrRight", "ArrowRight"]]
];

let ignoreChar = ["Backspace", "Enter", "CapsLock", "Shift", "Ctrl", "Tab", "Alt", "ContextMenu", "Space", "Win", "Cnt", "Control", "Meta"];

let textNote = document.createElement("textarea");
textNote.setAttribute("rows", "15");
textNote.setAttribute("cols", "100");
textNote.setAttribute("id", "textNode");
let body = document.querySelector("body");
body.append(textNote);

let currentState = arrEng;
function drawKeyboard(arr) {
    currentState = arr;
    let body = document.querySelector("body");
    let virtKeyboard = document.createElement("div");
    virtKeyboard.setAttribute("id", "virtKeyboard");
    virtKeyboard.classList.add("keyboard");
    body.append(virtKeyboard);

    for (let i = 0; i < arr.length; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let z = 0; z < arr[i].length; z++) {
            if(i == 0 && z == 0) continue;
            let span = document.createElement("span");
            let keyCode = arr[i][z];
            span.classList.add(keyCode[1]);
            span.innerHTML = keyCode[0];
            row.append(span);
        }
        virtKeyboard.append(row);
    }
}
drawKeyboard(currentState);

function drawKeyboardUpperCase(arr, st) {
    currentState = arr;
    let span = document.getElementsByTagName("span");
    let iterator = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let z = 0; z < arr[i].length; z++) {
            let cur = arr[i][z][st];
            if(cur === undefined || cur === "eng" || cur === "rus") {
                iterator++;
                continue;
            } else {
                span[iterator-1].textContent = cur;
                iterator++;
            }
        }
    }
}

////////////////////
// Подсветка клавиш
////////////////////

document.addEventListener("keydown", keyBacklight);
document.addEventListener("keyup", keyBacklightOff);

function keyBacklight(e) {
    if(e.code === "F5") return;
    if(e.code === "Tab" || e.key === "Alt") e.preventDefault();
    if(e.code === "CapsLock") {
        let curr = document.querySelector("." + e.code);
        curr.classList.toggle("lighter");
    } else {
        let curr = document.querySelector("." + e.code);
        curr.classList.add("lighter");
    }    
};

function keyBacklightOff(e) {
    if(e.code === "F5" || e.code === "CapsLock") return;
    let curr = document.querySelector("." + e.code);
    curr.classList.remove("lighter");
};

virtKeyboard.addEventListener("mousedown", mouseKeyBacklight);
virtKeyboard.addEventListener("mouseup", mouseKeyBacklightOff);
virtKeyboard.addEventListener("mouseout", mouseKeyBacklightOff);

function mouseKeyBacklight(e) {
    if(e.code === "F5") return;
    if(e.target.textContent === "CapsLock") {
        e.target.classList.toggle("lighter");
    } else {
        e.target.classList.add("lighter");
    }    
};

function mouseKeyBacklightOff(e) {
    if(e.target.textContent === "CapsLock") return;
    e.target.classList.remove("lighter");
};

///////////////////////////////
// Добавление текста в textarea
///////////////////////////////

document.addEventListener("keyup", textInput);
virtKeyboard.addEventListener("mouseup", mouseTextInput);

function textInput(e) {
    if(e.code === "F5") return;
    if(e.code === "Tab" || e.key === "Alt") e.preventDefault();
    if(checkSymbol(e.key)) {
        let current = document.querySelector("." + e.code);
        textNode.innerText = textNode.textContent + current.textContent;
    }
};

function mouseTextInput(e) {
    if(checkSymbol(e.target.innerText)) {
        textNode.innerText = textNode.textContent + e.target.innerText;
    }
};

/////////////////////////////////
// Проверка на символы ignoreChar
/////////////////////////////////

function checkSymbol(symbol) {
    let result = true;
    ignoreChar.forEach(element => {
        if(element == symbol) {
            result = false;
            return;
        }
    });
    return result;
};

////////////////////////////
// Удаляем символы backspace
////////////////////////////

document.addEventListener("keyup", backSpace);
virtKeyboard.addEventListener("mouseup", backSpace);

function backSpace(e) {
    if(e.target.textContent === "Backspace") {
        textNode.innerText = textNode.textContent.substr(0, textNode.textContent.length - 1);
    } else if(e.key === "Backspace") {
        textNode.innerText = textNode.textContent.substr(0, textNode.textContent.length - 1);
    }
}

/////////////////////
// Переключение языка
/////////////////////

document.addEventListener("keydown", changeKeyboard);

function changeKeyboard(e) {
    if(e.code === "F5") return;
    if(e.altKey) {
        e.preventDefault();
        if (e.ctrlKey && e.altKey) {
            let virtKeyboard = document.querySelector(".keyboard");
            let arg = currentState[0][0] == "rus" ? arrEng : arrRus;
            drawKeyboardUpperCase(arg, 0);
        }
    }
};

////////
// Shift
////////

document.addEventListener("keydown", shiftKey);
document.addEventListener("keyup", shiftKeyOff);

virtKeyboard.addEventListener("mousedown", shiftKey);
virtKeyboard.addEventListener("mouseup", shiftKeyOff);

function shiftKey(e) {
    if(e.code == "ShiftLeft" || e.code == "ShiftRight") {
        drawKeyboardUpperCase(currentState, 2);
    } else if(e.target.textContent == "Shift") {
        drawKeyboardUpperCase(currentState, 2);
    }
};

function shiftKeyOff(e) {
    if(e.code == "ShiftLeft" || e.code == "ShiftRight") {
        drawKeyboardUpperCase(currentState, 0);
    } else if(e.target.textContent == "Shift") {
        drawKeyboardUpperCase(currentState, 0);
    }
};

///////////
// CapsLock
///////////

document.addEventListener("keydown", capsLockFunc);
document.addEventListener("mousedown", capsLockFunc);
function capsLockFunc(e) {
    let capsLock = document.getElementsByClassName("CapsLock");
    if(e.target != capsLock[0] && e.keyCode != 20) return;
    if(capsLock[0].classList.contains("lighter")) {
        drawKeyboardUpperCase(currentState, 2);
    } else {
        drawKeyboardUpperCase(currentState, 0);
    }
}