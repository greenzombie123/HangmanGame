import { createElement, getElement } from "./Helpers";

export default class View {
  constructor(hangman) {
    this.hangman = hangman;
    this.tile_container = getElement("tile-container");
    this.tiles = [];

    // document.querySelector('.keyboard-container__button').addEventListener('click', this.disableButton)
  }

  // Get length of the word
  getWord() {
    return "banana";
  }

  createTiles() {
    const word = this.getWord();
    for (let index = 0; index < word.length; index++) {
      const tile = createElement("div", "tile-container__tile");
      tile.dataset.letter = word[index];
      this.tile_container.appendChild(tile);
      this.tiles.push(tile);
    }
  }

  //! Fix variable assignment
  addLetters(letter) {
    this.tiles.forEach((tile) => {
      if (tile.dataset.letter === letter) tile.textContent = letter;
    });
  }

  async flashRed() {
    document.body.classList.toggle("redFlash");
    await new Promise((resolve) => {setTimeout(() => resolve(), 2000)});
    document.body.classList.toggle("redFlash");
  }

  async flashGreen() {
    document.body.classList.toggle("greenFleash");
    await new Promise((resolve) => {setTimeout(() => resolve(), 2000)});
    document.body.classList.toggle("greenFleash");
  }

  disableButton({currentTarget}){
    const button = currentTarget;
    button.disabled = true;
  }

  enableAllButtons(){
    const buttons = document.querySelectorAll('.keyboard-container__button')
    buttons.forEach(button=> {button.disabled = false})
  }
}
