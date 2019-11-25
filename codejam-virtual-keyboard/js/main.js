/* eslint-disable no-continue */
const arrEng = [
  [['eng'], ['`', 'Backquote', '~'], ['1', 'Digit1', '!'], ['2', 'Digit2', '@'], ['3', 'Digit3', '#'], ['4', 'Digit4', '$'], ['5', 'Digit5', '%'], ['6', 'Digit6', '^'], ['7', 'Digit7', '&'], ['8', 'Digit8', '*'], ['9', 'Digit9', '('], ['0', 'Digit0', ')'], ['-', 'Minus', '_'], ['=', 'Equal', '+'], ['Backspace', 'Backspace']],
  [['Tab', 'Tab'], ['q', 'KeyQ', 'Q'], ['w', 'KeyW', 'W'], ['e', 'KeyE', 'E'], ['r', 'KeyR', 'R'], ['t', 'KeyT', 'T'], ['y', 'KeyY', 'Y'], ['u', 'KeyU', 'U'], ['i', 'KeyI', 'I'], ['o', 'KeyO', 'O'], ['p', 'KeyP', 'P'], ['[', 'BracketLeft', '{'], [']', 'BracketRight', '}'], ['\\', 'Backslash', '|']],
  [['CapsLock', 'CapsLock'], ['a', 'KeyA', 'A'], ['s', 'KeyS', 'S'], ['d', 'KeyD', 'D'], ['f', 'KeyF', 'F'], ['g', 'KeyG', 'G'], ['h', 'KeyH', 'H'], ['j', 'KeyJ', 'J'], ['k', 'KeyK', 'K'], ['l', 'KeyL', 'L'], [';', 'Semicolon', ':'], ["'", 'Quote', '"'], ['Enter', 'Enter']],
  [['Shift', 'ShiftLeft'], ['z', 'KeyZ', 'Z'], ['x', 'KeyX', 'X'], ['c', 'KeyC', 'C'], ['v', 'KeyV', 'V'], ['b', 'KeyB', 'B'], ['n', 'KeyN', 'N'], ['m', 'KeyM', 'M'], [',', 'Comma', '<'], ['.', 'Period', '>'], ['/', 'Slash', '?'], ['Shift', 'ShiftRight'], ['arrUp', 'ArrowUp']],
  [['Ctrl', 'ControlLeft'], ['Win', 'MetaLeft'], ['Alt', 'AltLeft'], ['Space', 'Space'], ['Alt', 'AltRight'], ['Cnt', 'ContextMenu'], ['Ctrl', 'ControlRight'], ['arrLeft', 'ArrowLeft'], ['arrDown', 'ArrowDown'], ['arrRight', 'ArrowRight']],
];

const arrRus = [
  [['rus'], ['ё', 'Backquote', 'Ё'], ['1', 'Digit1', '!'], ['2', 'Digit2', '"'], ['3', 'Digit3', '№'], ['4', 'Digit4', ';'], ['5', 'Digit5', '%'], ['6', 'Digit6', ':'], ['7', 'Digit7', '?'], ['8', 'Digit8', '*'], ['9', 'Digit9', '('], ['0', 'Digit0', ')'], ['-', 'Minus', '_'], ['=', 'Equal', '+'], ['Backspace', 'Backspace']],
  [['Tab', 'Tab'], ['й', 'KeyQ', 'Й'], ['ц', 'KeyW', 'Ц'], ['у', 'KeyE', 'У'], ['к', 'KeyR', 'К'], ['е', 'KeyT', 'Е'], ['н', 'KeyY', 'Н'], ['г', 'KeyU', 'Г'], ['ш', 'KeyI', 'Ш'], ['щ', 'KeyO', 'Щ'], ['з', 'KeyP', 'З'], ['х', 'BracketLeft', 'Х'], ['ъ', 'BracketRight', 'Ъ'], ['\\', 'Backslash', '/']],
  [['CapsLock', 'CapsLock'], ['ф', 'KeyA', 'Ф'], ['ы', 'KeyS', 'Ы'], ['в', 'KeyD', 'В'], ['а', 'KeyF', 'А'], ['п', 'KeyG', 'П'], ['р', 'KeyH', 'Р'], ['о', 'KeyJ', 'О'], ['л', 'KeyK', 'Л'], ['д', 'KeyL', 'Д'], ['ж', 'Semicolon', 'Ж'], ['э', 'Quote', 'Э'], ['Enter', 'Enter']],
  [['Shift', 'ShiftLeft'], ['я', 'KeyZ', 'Я'], ['ч', 'KeyX', 'Ч'], ['с', 'KeyC', 'С'], ['м', 'KeyV', 'М'], ['и', 'KeyB', 'И'], ['т', 'KeyN', 'Т'], ['ь', 'KeyM', 'Ь'], ['б', 'Comma', 'Б'], ['ю', 'Period', 'Ю'], ['.', 'Slash', ','], ['Shift', 'ShiftRight'], ['arrUp', 'ArrowUp']],
  [['Ctrl', 'ControlLeft'], ['Win', 'MetaLeft'], ['Alt', 'AltLeft'], ['Space', 'Space'], ['Alt', 'AltRight'], ['Cnt', 'ContextMenu'], ['Ctrl', 'ControlRight'], ['arrLeft', 'ArrowLeft'], ['arrDown', 'ArrowDown'], ['arrRight', 'ArrowRight']],
];

// кнопки которые не нужно выводить в textarea
const ignoreChar = ['Backspace', 'Enter', 'CapsLock', 'Shift', 'Ctrl', 'Tab', 'Alt', 'ContextMenu', ' ', 'Win', 'Cnt', 'Control', 'Meta', 'Space'];

// //////////////////////////////////////////////////////////////////////////
// Создаем textarea и button очистки textarea, также шаблон самой клавиатуры
// //////////////////////////////////////////////////////////////////////////

const textNote = document.createElement('textarea');
const virtKeyboard = document.createElement('div');
const button = document.createElement('button');
const body = document.querySelector('body');
const localTextArea = localStorage.getItem('textarea');

textNote.setAttribute('rows', '15');
textNote.setAttribute('cols', '100');
textNote.setAttribute('id', 'textNode');
textNote.textContent = localTextArea;
body.append(textNote);

virtKeyboard.setAttribute('id', 'virtKeyboard');
virtKeyboard.classList.add('keyboard');
body.append(virtKeyboard);

button.textContent = 'Clear';
button.style.width = `${80}px`;
button.style.height = `${40}px`;
textNote.after(button);


// ////////////////////////////////////////
// Отрисовка кнопок и наполнение символами
// ////////////////////////////////////////

const localSt = localStorage.getItem('currentState');
let currentState = JSON.parse(localSt) || arrEng;
function drawKeyboard(arr) {
  currentState = arr;
  const json = JSON.stringify(arr);
  localStorage.setItem('currentState', json);

  for (let i = 0; i < arr.length; i += 1) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let z = 0; z < arr[i].length; z += 1) {
      if (i === 0 && z === 0) continue;
      const span = document.createElement('span');
      const keyCode = arr[i][z];
      const item = keyCode[0];
      span.classList.add(keyCode[1]);
      span.innerHTML = item;
      row.append(span);
    }
    virtKeyboard.append(row);
  }
}
// сразу вызываем клавиатуру "по умолчанию"
drawKeyboard(currentState);

// ///////////////////////////////////////////////////////
// Меняем регистр букв (только внутренний контент кнопки)
// ///////////////////////////////////////////////////////

function changeCaseButtons(arr, st) {
  currentState = arr;
  const json = JSON.stringify(arr);
  localStorage.setItem('currentState', json);

  const span = document.getElementsByTagName('span');
  let iterator = 0;
  for (let i = 0; i < arr.length; i += 1) {
    for (let z = 0; z < arr[i].length; z += 1) {
      const cur = arr[i][z][st];
      if (cur === undefined || cur === 'eng' || cur === 'rus') {
        iterator += 1;
        continue;
      } else {
        span[iterator - 1].textContent = cur;
        iterator += 1;
      }
    }
  }
}

// //////////////////
// Подсветка клавиш
// //////////////////

function keyBacklight(e) {
  if (e.code === 'F5') return;
  if (e.code === 'Tab' || e.key === 'Alt') e.preventDefault();
  if (e.code === 'CapsLock') {
    const curr = document.querySelector(`.${e.code}`);
    curr.classList.toggle('lighter');
  } else {
    const curr = document.querySelector(`.${e.code}`);
    curr.classList.add('lighter');
  }
}

function keyBacklightOff(e) {
  if (e.code === 'F5' || e.code === 'CapsLock') return;
  const curr = document.querySelector(`.${e.code}`);
  curr.classList.remove('lighter');
}

document.addEventListener('keydown', keyBacklight);
document.addEventListener('keyup', keyBacklightOff);

function mouseKeyBacklight(e) {
  if (e.code === 'F5' || e.target.tagName !== 'SPAN') return;
  if (e.target.textContent === 'CapsLock') {
    e.target.classList.toggle('lighter');
  } else {
    e.target.classList.add('lighter');
  }
}

function mouseKeyBacklightOff(e) {
  if (e.target.textContent === 'CapsLock') return;
  e.target.classList.remove('lighter');
}

virtKeyboard.addEventListener('mousedown', mouseKeyBacklight);
virtKeyboard.addEventListener('mouseup', mouseKeyBacklightOff);
virtKeyboard.addEventListener('mouseout', mouseKeyBacklightOff);

// ///////////////////////////////
// Проверка на символы ignoreChar
// ///////////////////////////////

function checkSymbol(symbol) {
  let result = true;
  ignoreChar.forEach((element) => {
    if (element === symbol) {
      result = false;
    }
  });
  return result;
}

// /////////////////////////////
// Добавление текста в textarea
// /////////////////////////////

function textInput(e) {
  const textNode = document.getElementById('textNode');
  const current = document.querySelector(`.${e.code}`);
  if (e.code === 'F5') return;
  if (e.code === 'Tab' || e.key === 'Alt') e.preventDefault();
  if (checkSymbol(e.key)) {
    textNode.textContent += current.textContent;
  } else {
    switch (e.key) {
      case 'Tab':
        textNode.textContent += '    ';
        break;

      case 'Enter':
        textNode.innerHTML += '\n';
        break;

      case ' ':
        textNode.innerHTML += ' ';
        break;

      default:
        break;
    }
  }
  localStorage.setItem('textarea', textNode.textContent);
}

function mouseTextInput(e) {
  const textNode = document.getElementById('textNode');
  if (e.target.tagName !== 'SPAN') return;
  if (checkSymbol(e.target.innerText)) {
    textNode.textContent += e.target.textContent;
  } else {
    switch (e.target.innerText) {
      case 'Tab':
        textNode.textContent += '    ';
        break;

      case 'Enter':
        textNode.innerHTML += '\n';
        break;

      case 'Space':
        textNode.innerHTML += ' ';
        break;

      default:
        break;
    }
  }
  const json = JSON.stringify(textNode.textContent);
  localStorage.setItem('textarea', json);
}

document.addEventListener('keyup', textInput);
virtKeyboard.addEventListener('mouseup', mouseTextInput);

// //////////////////////////
// Удаляем символы backspace
// //////////////////////////

function backSpace(e) {
  const textNode = document.getElementById('textNode');
  if (e.target.textContent === 'Backspace') {
    textNode.innerText = textNode.textContent.substr(0, textNode.textContent.length - 1);
  } else if (e.key === 'Backspace') {
    textNode.innerText = textNode.textContent.substr(0, textNode.textContent.length - 1);
  }
}

document.addEventListener('keyup', backSpace);
virtKeyboard.addEventListener('mouseup', backSpace);

// ///////////////////
// Переключение языка
// ///////////////////

function changeKeyboard(e) {
  if (e.code === 'F5') return;
  if (e.altKey) {
    e.preventDefault();
    if (e.ctrlKey && e.altKey) {
      const arg = currentState[0][0] === 'rus' ? arrEng : arrRus;
      changeCaseButtons(arg, 0);
    }
  }
}

document.addEventListener('keydown', changeKeyboard);

// //////
// Shift
// //////

function shiftKey(e) {
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    changeCaseButtons(currentState, 2);
  } else if (e.target.textContent === 'Shift') {
    changeCaseButtons(currentState, 2);
  }
}

function shiftKeyOff(e) {
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    changeCaseButtons(currentState, 0);
  } else if (e.target.textContent === 'Shift') {
    changeCaseButtons(currentState, 0);
  }
}

document.addEventListener('keydown', shiftKey);
document.addEventListener('keyup', shiftKeyOff);

virtKeyboard.addEventListener('mousedown', shiftKey);
virtKeyboard.addEventListener('mouseup', shiftKeyOff);

// /////////
// CapsLock
// /////////

function capsLockFunc(e) {
  const capsLock = document.getElementsByClassName('CapsLock');
  if (e.target !== capsLock[0] && e.keyCode !== 20) return;
  if (capsLock[0].classList.contains('lighter')) {
    changeCaseButtons(currentState, 2);
  } else {
    changeCaseButtons(currentState, 0);
  }
}

document.addEventListener('keydown', capsLockFunc);
document.addEventListener('mousedown', capsLockFunc);

// /////////////////////////////////////
// Очистить чат и localStorage textarea
// /////////////////////////////////////

function clearArea() {
  localStorage.removeItem('textarea');
  textNote.textContent = '';
}

button.addEventListener('click', clearArea);

// нашел шаблон для работы с кареткой в textarea

// document.getElementById('textNode').addEventListener('keyup', e => {
//     console.log('Caret at: ', e.target.selectionStart)
// })
