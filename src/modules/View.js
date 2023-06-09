import { createElement, getElement } from "./Helpers";

export default class View {
  constructor(hangman) {
    this.hangman = hangman;
    this.tile_container = getElement("tile-container");
    this.tiles = [];
    this.animatedElement = null;
    this.display = getElement("display");
    this.displayWords = getElement("display__words");
    this.resetButton = getElement("reset-button");
    this.startButton = getElement("start-button");
    this.backDrop = getElement("backdrop");
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

  addLetters(letter) {
    this.tiles.forEach((tile) => {
      if (tile.dataset.letter === letter) tile.textContent = letter;
    });
  }

  setLimitOfMistakes = (number) => {
    this.hangman.limitOfMistakes = number
    console.log('NUmber of mistakes ' + number);
  };

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

  bindOnWordButtonClicked = (handler) => {
    const button = getElement("guess-button");
    const input = document.querySelector(".guess-input");
    button.addEventListener("click", () => {
      handler(input.value);
    });
  };

  bindOnGameButtonClicked = (handler) => {
    this.startButton.addEventListener("click", () => {
      handler();
    });
  };

  bindOnResetButtonClicked = (handler) => {
    this.resetButton.addEventListener("click", () => {
      handler();
    });
  };

  changeGameButton() {
    this.resetButton.style.display = "block";
    this.startButton.style.display = "none";
  }

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

  displayGameStatus = (isWinner) => {
    if (isWinner) {
      this.hangman.renderWinner();
      this.showDisplayer(true);
    } else {
      this.showDisplayer(false);
    }
  };

  showDisplayer = (isWinner) => {
    if (isWinner) {
      this.display.classList.toggle("display_winner");
      this.displayWords.textContent = "Good Job!";
      // this.backDrop.classList.toggle("backdrop_open");
      this.toggleBackDrop(true);
    } else {
      this.display.classList.toggle("display_loser");
      this.displayWords.textContent = "Too Bad!";
      // this.backDrop.classList.toggle("backdrop_open");
      this.toggleBackDrop(true);
    }
  };

  toggleBackDrop(isGameDone) {
    if (isGameDone) {
      this.backDrop.classList.toggle("backdrop_open");
      this.resetButton.classList.toggle("reset-button_flash");
    } else if (this.backDrop.classList.contains("backdrop_open")) {
      this.backDrop.classList.toggle("backdrop_open");
      this.resetButton.classList.toggle("reset-button_flash");
    }
  }

  reset() {
    this.tiles.forEach((tile) => this.tile_container.removeChild(tile));
    this.tiles = [];
    this.animatedElement = null;
    this.display.classList.remove("display_loser");
    this.display.classList.remove("display_winner");
    this.enableAllButtons();
    this.toggleBackDrop(false);
    this.hangman.reset();
  }

  init() {
    this.hangman.draw();
  }
}
