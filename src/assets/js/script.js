const main = document.querySelector('main');

function createTextarea() {
  return `<section class="text">
  <textarea class="text__enter" name="input box" id="text" cols="100" rows="10"></textarea>
</section>
<section class="keyboard">
  <div class="keyboard__container">
    <button class="keyboard__key" type="button">a</button>
    <button class="keyboard__key key-max" type="button">
      <span class="material-icons">backspace</span>
    </button>
    <button class="keyboard__key key-supermax" type="button">
      <span class="material-icons">space_bar</span>
    </button>
    <button class="keyboard__key key-max key-active" type="button">
      <span class="keyboard-name">Caps Lock</span>
    </button>
  </div>
</section>`;
}

main.innerHTML = createTextarea();
