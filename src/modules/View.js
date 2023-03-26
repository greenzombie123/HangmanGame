import { createElement, getElement } from "./Helpers";

export default class View {
  constructor(hangman) {
    this.hangman = hangman;
    this.tile_container = getElement("tile-container");
    this.tiles = [];
    this.counter = 0;
  }

  // Get length of the word
  createTiles(word) {
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

  printWord(){
    this.tiles.forEach(tile=>{
        tile.textContent = tile.dataset.letter 
    })
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

  renderBodyPart(){
    this.hangman.drawBodyPart()
  }

  init(){
    this.hangman.draw()
  }
}
