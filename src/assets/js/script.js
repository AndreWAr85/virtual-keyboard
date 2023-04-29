const engKeys = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
  ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '◄', '▼', '►'],
];

const rusKeys = [
  ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift'],
  ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '◄', '▼', '►'],
];

let selectedLanguage = localStorage.getItem('selectedLanguage') || 'eng';
let currentKeys = selectedLanguage === 'eng' ? engKeys : rusKeys;

const keyboardContainer = document.createElement('div');
keyboardContainer.classList.add('keyboard-container');

const textArea = document.createElement('textarea');
textArea.classList.add('input-text');
keyboardContainer.appendChild(textArea);

currentKeys.forEach((row) => {
  const rowContainer = document.createElement('div');
  rowContainer.classList.add('row');

  row.forEach((key) => {
    const keyElement = document.createElement('div');
    keyElement.classList.add('key');
    keyElement.textContent = key;

    const keyCode = getCharCode(key);
    console.log(keyCode);

    // обработчики событий нажатия кнопки мыши и клавиши на физической клавиатуре
    keyElement.addEventListener('mousedown', () => {
      highlightKey(keyElement);
      insertText(key);
    });

    document.addEventListener('keydown', (event) => {
      if (event.code === keyCode) {
        highlightKey(keyElement);
        insertText(key);
      }
    });

    rowContainer.appendChild(keyElement);
  });

  keyboardContainer.appendChild(rowContainer);
});

document.body.appendChild(keyboardContainer);

// функция определения кода символа на физической клавиатуре !!!!!!!!!!!!!!!!!!!!!!!!
function getCharCode(key) {
  const charCodes = {
    Backspace: 8,
    Tab: 9,
    Enter: 13,
    Shift: 16,
    Ctrl: 17,
    Alt: 18,
    CapsLock: 20,
    Win: 91,
    Del: 46,
    '▲': 38,
    '◄': 37,
    '▼': 40,
    '►': 39,
  };

  return charCodes[key] || key.charCodeAt(0);
}

// функция выделения кнопки клавиатуры при ее нажатии
function highlightKey(keyElement) {
  keyElement.classList.add('active');
  setTimeout(() => keyElement.classList.remove('active'), 200);
}

document.addEventListener('keydown', highlightKey);

// функция вставки символа в текстовое поле
function insertText(key) {
  let valueToAdd;
  if (key === 'Backspace') {
    textArea.value = textArea.value.slice(0, -1);
    return;
  } if (key === 'Enter') {
    valueToAdd = '\n';
  } else if (key === 'Tab') {
    valueToAdd = ' ';
  } else if (key === '▲' || key === '◄' || key === '▼' || key === '►') {
    // игнорирование стрелок на клавиатуре
    return;
  } else {
    valueToAdd = key;
  }
  textArea.value += valueToAdd;
}

// функция отображения виртуальной клавиатуры
function renderKeyboard() {
  const keyboardRows = document.querySelectorAll('.row');
  keyboardRows.forEach((row, index) => {
    const keys = row.querySelectorAll('.key');
    keys.forEach((key, keyIndex) => {
      key.textContent = currentKeys[index][keyIndex];
    });
  });
}

function changeLanguage() {
  // изменение выбранного языка
  selectedLanguage = selectedLanguage === 'eng' ? 'rus' : 'eng';
  currentKeys = selectedLanguage === 'eng' ? engKeys : rusKeys;

  // обновление надписей на кнопках клавиатуры
  const keys = document.querySelectorAll('.key');
  keys.forEach((key, index) => {
    if (currentKeys.flat()[index]) {
      key.textContent = currentKeys.flat()[index];
    }
  });

  // сохранение выбранного языка в localStorage  НЕ РАБОТАЕТ
  localStorage.setItem('selectedLanguage', selectedLanguage);
}
// неабор текста не меняется !!!!!!!!!

const languageSwitchButton = document.createElement('button');
languageSwitchButton.classList.add('language-switch-button');
languageSwitchButton.textContent = 'LANGUAGE';
document.body.appendChild(languageSwitchButton);

languageSwitchButton.addEventListener('click', changeLanguage);
// обработчик события смены языка клавиатуры по нажатию Ctrl + Shift НЕ РАБОТАЕТ
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.shiftKey) {
    switchLanguage();
  }
});

const keys = document.querySelectorAll('.key');
keys.forEach((key) => {
  if (key.textContent.includes('Backspace')) {
    key.style.backgroundColor = '#90e2c4';
    key.style.width = '100px';
    key.style.fontSize = '18px';
  }
  if (key.textContent.includes('Tab')) {
    key.style.backgroundColor = '#90e2c4';
    key.style.fontSize = '18px';
  }
  if (key.textContent.includes('Del')) {
    key.style.backgroundColor = '#90e2c4';
    key.style.fontSize = '18px';
  }
  if (key.textContent.includes('CapsLock')) {
    key.style.backgroundColor = '#90e2c4';
    key.style.width = '96px';
    key.style.fontSize = '18px';
  }
  if (key.textContent.includes('Enter')) {
    key.style.backgroundColor = '#90e2c4';
    key.style.width = '100px';
    key.style.fontSize = '18px';
  }
  if (key.textContent.includes('▲')) {
    key.style.backgroundColor = '#90e2c4';
  }
  if (key.textContent.includes('Ctrl')) {
    key.style.backgroundColor = '#90e2c4';
    key.style.width = '50px';
    key.style.fontSize = '18px';
  }
  if (key.textContent.includes('Win')) {
    key.style.backgroundColor = '#90e2c4';
    key.style.width = '50px';
    key.style.fontSize = '18px';
  }
  if (key.textContent.includes(' ')) {
    key.style.width = '318px';
  }
  if (key.textContent.includes('Alt')) {
    key.style.backgroundColor = '#90e2c4';
    key.style.width = '50px';
    key.style.fontSize = '18px';
  }
  if (key.textContent.includes('◄')) {
    key.style.backgroundColor = '#90e2c4';
  }
  if (key.textContent.includes('▼')) {
    key.style.backgroundColor = '#90e2c4';
  }
  if (key.textContent.includes('►')) {
    key.style.backgroundColor = '#90e2c4';
    key.style.width = '64px';
  }
  if (key.textContent.includes('`')) {
    key.style.backgroundColor = '#90e2c4';
  }
  if (key.textContent.includes('\\')) {
    key.style.backgroundColor = '#90e2c4';
  }
  if (key.textContent.includes('Shift')) {
    key.style.backgroundColor = '#90e2c4';
    key.style.width = '65px';
    key.style.fontSize = '18px';
  }
  const keys = document.querySelectorAll('.key');
  const secondShiftKey = Array.from(keys).find((key, index) => index !== 0 && key.textContent.includes('Shift'));
  if (secondShiftKey) {
    secondShiftKey.style.backgroundColor = '#90e2c4';
    secondShiftKey.style.fontSize = '18px';
    secondShiftKey.style.width = '130px';
  }
});
