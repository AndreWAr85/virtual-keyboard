const engKeys = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
  ['Ctrl', 'Win', 'Alt', '_', 'Alt', 'Ctrl', '◄', '▼', '►'],
];

const rusKeys = [
  ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift'],
  ['Ctrl', 'Win', 'Alt', '_', 'Alt', 'Ctrl', '◄', '▼', '►'],
];

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
    localStorage.setItem('selectedLanguage', JSON.stringify(selectedLanguage));
  } else {
    sessionStorage.setItem('selectedLanguage', JSON.stringify(selectedLanguage));
  }
}

changeLanguage();

const keyboardContainer = document.createElement('div');
keyboardContainer.classList.add('keyboard-container');
const languageSwitcher = document.createElement('button');
languageSwitcher.classList.add('language-switcher');
languageSwitcher.textContent = 'ENG/RUS';

languageSwitcher.addEventListener('click', () => {
  changeLanguage();
});

keyboardContainer.prepend(languageSwitcher);
const textArea = document.createElement('textarea');
textArea.classList.add('input-text');
keyboardContainer.appendChild(textArea);

currentKeys.forEach((rowKeys) => {
  const rowContainer = document.createElement('div');
  rowContainer.classList.add('row');

  rowKeys.forEach((currentKey) => {
    const keyElement = document.createElement('div');
    keyElement.classList.add('key');
    keyElement.textContent = currentKey;

    // функция выделения кнопки клавиатуры при ее нажатии
    function highlightKey(elementToHighlight) {
      elementToHighlight.classList.add('active');
      setTimeout(() => elementToHighlight.classList.remove('active'), 200);
    }

    // функция определения кода символа на физической клавиатуре
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

    const keyCode = getCharCode(currentKey);

    // функция вставки символа в текстовое поле
    function insertText(rowKey) {
      let valueToAdd;
      if (rowKey === 'Backspace') {
        textArea.value = textArea.value.slice(0, -1);
        return;
      } if (rowKey === 'Enter') {
        valueToAdd = '\n';
      } else if (rowKey === 'Tab') {
        valueToAdd = ' ';
      } else if (rowKey === '▲' || rowKey === '◄' || rowKey === '▼' || rowKey === '►') {
        // игнорирование стрелок на клавиатуре
        return;
      } else {
        valueToAdd = currentKey;
      }
      textArea.value += valueToAdd;
    }

    // обработчики событий нажатия кнопки мыши и клавиши на физической клавиатуре
    keyElement.addEventListener('mousedown', () => {
      highlightKey(keyElement);
      insertText(currentKey);
    });

    document.addEventListener('keydown', (event) => {
      if (event.code === keyCode) {
        highlightKey(keyElement);
        insertText(currentKey);
      }
    });

    rowContainer.appendChild(keyElement);
  });

  keyboardContainer.appendChild(rowContainer);
});

document.body.appendChild(keyboardContainer);

// --------------------------******************************-------------------------------

const keyStyleMap = {
  Backspace: {
    backgroundColor: '#90e2c4',
    width: '100px',
    fontSize: '18px',
  },
  Tab: {
    backgroundColor: '#90e2c4',
    fontSize: '18px',
  },
  Del: {
    backgroundColor: '#90e2c4',
    fontSize: '18px',
  },
  CapsLock: {
    backgroundColor: '#90e2c4',
    width: '96px',
    fontSize: '18px',
    classList: ['capslock'],
  },
  Enter: {
    backgroundColor: '#90e2c4',
    width: '100px',
    fontSize: '18px',
  },
  '▲': {
    backgroundColor: '#90e2c4',
  },
  Ctrl: {
    backgroundColor: '#90e2c4',
    width: '50px',
    fontSize: '18px',
    classList: ['control'],
  },
  Win: {
    backgroundColor: '#90e2c4',
    width: '50px',
    fontSize: '18px',
    classList: ['meta'],
  },
  ' ': {
    width: '318px',
  },
  Alt: {
    backgroundColor: '#90e2c4',
    width: '50px',
    fontSize: '18px',
    classList: ['alt'],
  },
  '◄': {
    backgroundColor: '#90e2c4',
  },
  '▼': {
    backgroundColor: '#90e2c4',
  },
  '►': {
    backgroundColor: '#90e2c4',
    width: '64px',
  },
  '`': {
    backgroundColor: '#90e2c4',
  },
  '\\': {
    backgroundColor: '#90e2c4',
  },
  Shift: {
    backgroundColor: '#90e2c4',
    width: '65px',
    fontSize: '18px',
    classList: ['shift'],
  },
  _: {
    width: '318px',
    classList: ['space'],
  },
};

const keys = document.querySelectorAll('.key');
keys.forEach((currentKey) => {
  const keyText = currentKey.textContent.trim();
  const keyStyles = keyStyleMap[keyText];
  if (keyStyles) {
    const keyStylesObject = currentKey.style; // Создать новую переменную для объекта style
    Object.keys(keyStyles).forEach((style) => {
      keyStylesObject[style] = keyStyles[style]; // Использовать новую переменную вместо currentKey
    });
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
