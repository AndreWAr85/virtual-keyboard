import { rusKeys, engKeys } from './keyboardLayaut.js';
import { keyStyleMap } from './style.js';

let selectedLanguage = localStorage.getItem('selectedLanguage') || 'eng';
let currentKeys = selectedLanguage === 'eng' ? engKeys : rusKeys;

function checkLocalStorage() {
  const testKey = 'test';
  try {
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

function changeLanguage() {
  selectedLanguage = selectedLanguage === 'eng' ? 'rus' : 'eng';
  currentKeys = selectedLanguage === 'eng' ? engKeys : rusKeys;

  const keys = document.querySelectorAll('.key');
  keys.forEach((key, index) => {
    const currentKey = key;
    if (currentKeys.flat()[index]) {
      currentKey.textContent = currentKeys.flat()[index];
    }
  });

  if (checkLocalStorage()) {
    localStorage.setItem('selectedLanguage', selectedLanguage);
  }
}
// Создаем контейнер клавиатуры и добавляем кнопку для смены языка
const keyboardContainer = document.createElement('div');
keyboardContainer.className = 'keyboard-container';
const languageSwitcher = document.createElement('button');
languageSwitcher.className = 'language-switcher';
languageSwitcher.textContent = 'ENG/RUS  Alt+Shift';
keyboardContainer.appendChild(languageSwitcher);

languageSwitcher.addEventListener('click', () => {
  changeLanguage();
});

// Обработчик нажатия на клавиши Shift и Ctrl для смены языка
let isShiftPressed = false;
let isCtrlPressed = false;
document.addEventListener('keydown', (event) => {
  if (event.key === 'Shift') {
    isShiftPressed = true;
  } if (event.key === 'Alt') {
    isCtrlPressed = true;
  } else if (isShiftPressed && isCtrlPressed) {
    changeLanguage();
  }
});
document.addEventListener('keyup', (event) => {
  if (event.key === 'Shift') {
    isShiftPressed = false;
  } else if (event.key === 'Alt') {
    isCtrlPressed = false;
  }
});

keyboardContainer.prepend(languageSwitcher);
const textArea = document.createElement('textarea');
textArea.classList.add('input-text');
keyboardContainer.appendChild(textArea);
window.addEventListener('DOMContentLoaded', () => {
  textArea.classList.add('input-text');
  textArea.focus();
});
textArea.focus();
currentKeys.forEach((rowKeys) => {
  const rowContainer = document.createElement('div');
  rowContainer.classList.add('row');

  rowKeys.forEach((currentKey) => {
    const keyElement = document.createElement('div');
    keyElement.classList.add('key');
    keyElement.textContent = currentKey;
    function insertText(rowKey) {
      let valueToAdd;
      if (rowKey === 'Backspace') {
        textArea.value = textArea.value.slice(0, -1);
        return;
      } if (rowKey === 'Enter') {
        valueToAdd = '\n';
      } else if (rowKey === 'Tab') {
        valueToAdd = ' ';
      } else if (rowKey === 'CapsLock' || rowKey === 'Shift' || rowKey === 'Control' || rowKey === 'Alt' || rowKey === 'Win') {
        return;
      } else if (rowKey === 'Delete') {
        const cursorPosition = textArea.selectionStart;
        const textBeforeCursor = textArea.value.slice(0, cursorPosition);
        const textAfterCursor = textArea.value.slice(cursorPosition + 1);
        textArea.value = textBeforeCursor + textAfterCursor;
        textArea.selectionStart = cursorPosition;
        textArea.selectionEnd = cursorPosition;
        return;
      } else {
        valueToAdd = keyElement.textContent;
      }
      textArea.value += valueToAdd;
    }

    function highlightKey(elementToHighlight) {
      if (elementToHighlight) {
        elementToHighlight.classList.add('active');
        setTimeout(() => elementToHighlight.classList.remove('active'), 200);
      }
    }
    // обработчики событий нажатия кнопки мыши и клавиши на виртуальной клавиатуре
    keyElement.addEventListener('mousedown', () => {
      highlightKey(keyElement);
      insertText(currentKey);
    });

    rowContainer.appendChild(keyElement);
  });

  keyboardContainer.appendChild(rowContainer);
});

document.body.appendChild(keyboardContainer);

const keys = document.querySelectorAll('.key');
keys.forEach((currentKey) => {
  const keyText = currentKey.textContent.trim();
  const keyStyles = keyStyleMap[keyText];
  if (keyStyles) {
    const keyStylesObject = {};
    Object.keys(keyStyles).forEach((style) => {
      keyStylesObject[style] = keyStyles[style];
    });
    Object.assign(currentKey.style, keyStylesObject);
    if (keyStyles.classList) {
      keyStyles.classList.forEach((className) => {
        currentKey.classList.add(className);
      });
    }
  }
});

const secondShiftKey = Array.from(keys).find((key, index) => index !== 0 && key.textContent.includes('Shift'));
if (secondShiftKey) {
  secondShiftKey.style.backgroundColor = '#90e2c4';
  secondShiftKey.style.fontSize = '18px';
  secondShiftKey.style.width = '130px';
}

const space = document.querySelectorAll('.key');
space.forEach((key) => {
  if (key.textContent.includes(' ')) {
    const keyCopy = key.cloneNode(true);
    keyCopy.style.width = '318px';
    key.parentNode.replaceChild(keyCopy, key);
  }
});

// Функция для изменения регистра текста клавиши в зависимости от состояния Caps Lock
let capsLockPressed = false;

document.addEventListener('keydown', (event) => {
  const pressedKey = event.key;
  const virtualKeys = document.querySelectorAll('.key');
  virtualKeys.forEach((key) => {
    if (key.textContent === pressedKey) {
      key.classList.add('active');
    }
  });

  if (pressedKey === 'CapsLock' && !capsLockPressed) {
    const capsLockKeys = document.querySelectorAll('.capslock');
    capsLockKeys.forEach((capsLockKey) => {
      capsLockKey.classList.add('on');
    });
    capsLockPressed = true;
    keys.forEach((key) => {
      let newTextContent = key.textContent;
      if (newTextContent.trim().length <= 1) {
        newTextContent = newTextContent.toUpperCase();
      }
      key.textContent = newTextContent;
    });
  } else if (pressedKey === 'CapsLock' && capsLockPressed) {
    const capsLockKeys = document.querySelectorAll('.capslock');
    capsLockKeys.forEach((capsLockKey) => {
      capsLockKey.classList.remove('on');
    });
    capsLockPressed = false;
    keys.forEach((key) => {
      let newTextContent = key.textContent;
      if (newTextContent.trim().length <= 1) {
        newTextContent = newTextContent.toLowerCase();
      }
      key.textContent = newTextContent;
    });
  }
});

document.addEventListener('keyup', (event) => {
  const pressedKey = event.key;
  const virtualKeys = document.querySelectorAll('.key');
  virtualKeys.forEach((key) => {
    if (key.textContent === pressedKey) {
      key.classList.remove('active');
    }
  });
});

const capsLock = document.querySelector('.capslock');
capsLock.addEventListener('click', () => {
  capsLock.classList.toggle('on');
  keys.forEach((key) => {
    let newTextContent = key.textContent;
    if (capsLock.classList.contains('on')) {
      if (newTextContent.trim().length <= 1) {
        newTextContent = newTextContent.toUpperCase();
      }
    } else if (newTextContent.trim().length <= 1) {
      newTextContent = newTextContent.toLowerCase();
    }
    key.textContent = newTextContent;
  });
});
