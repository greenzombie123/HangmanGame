import { createElement, getElement } from "./Helpers";

export default class View {
  constructor(hangman) {
    this.hangman = hangman;
    this.tile_container = getElement("tile-container");
    this.tiles = [];
    this.counter = 0;
    this.timerID = null;
    this.animatedElement = null;
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

  printWord() {
    this.tiles.forEach((tile) => {
      tile.textContent = tile.dataset.letter;
    });
  }

  bindOnTileButtonsClicked = (handler) => {
    const buttons = document.querySelectorAll(".keyboard-container__button");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        handler(e);
        this.disableButton(e);
      });
    });
  };

  // TODO Finish implementation
  bindOnWordButtonClicked = (handler) => {
    const button = getElement("guess-button");
    button.addEventListener("click", (e) => {
      const input = document.querySelector("input");
      handler(input.textContent);
    });
  };

  flashRed() {
    if (this.animatedElement) {
      if (this.animatedElement.currentTime) this.animatedElement.cancel();
    }
    const animation = [
      {
        backgroundColor: "rgba(255, 0, 0, 0.346)",
      },

      {
        backgroundColor: "white",
      },
    ];
    const animationTime = { duration: 1000 };
    this.animatedElement = document.body.animate(animation, animationTime);
  }

  flashGreen() {
    if (this.animatedElement) {
      if (this.animatedElement.currentTime) this.animatedElement.cancel();
    }
    const animation = [
      {
        backgroundColor: "rgba(2, 214, 2, 0.533)",
      },

      {
        backgroundColor: "white",
      },
    ];
    const animationTime = { duration: 1000 };
    this.animatedElement = document.body.animate(animation, animationTime);
  }

  disableButton({ currentTarget }) {
    const button = currentTarget;
    button.disabled = true;
  }

  enableAllButtons() {
    const buttons = document.querySelectorAll(".keyboard-container__button");
    buttons.forEach((button) => {
      button.disabled = false;
    });
  }

  renderBodyPart() {
    this.hangman.drawBodyPart();
  }

  init() {
    this.hangman.draw();
  }
}
