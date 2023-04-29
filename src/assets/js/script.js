import { keysValue } from './keysValue.js';
console.log(keysValue)
const main = document.querySelector('main');

// Создаем элементы клавиатуры
const text = document.createElement("section");
text.classList.add('text');
const textEnter = document.createElement("textarea");
textEnter.classList.add('text__enter');
text.appendChild(textEnter)
main.appendChild(text);
