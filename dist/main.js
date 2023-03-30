/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/Controller.js":
/*!***********************************!*\
  !*** ./src/modules/Controller.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Controller)
/* harmony export */ });
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  getWord = () => {
    const newWord = this.model.getWord();
    // console.log(newWord);
    this.view.createTiles(newWord);
  };

  checkletter(chosenLetter) {
    return this.model.letters.some((letter) => letter === chosenLetter);
  }

  checkWord(word) {
    return this.model.word === word.toLowerCase();
  }

  guessLetter = (e) => {
    const {
      currentTarget: { textContent },
    } = e;
    const letter = textContent.toLowerCase();
    if (this.checkletter(letter)) {
      this.model.removeLetter(letter);
      this.view.addLetters(letter);
      this.view.flashGreen();
      this.checkWinner();
    } else {
      this.view.flashRed();
      this.view.renderBodyPart();
      this.model.increaseNumOfMistakes();
      this.checkLoser();
    }
  };

  guessWord = (word) => {
    if (this.checkWord(word)) {
      // this.view.printWord();
      this.view.flashGreen();
      this.checkWinner(true);
    } else {
      this.view.flashRed();
      this.view.renderBodyPart();
      this.model.increaseNumOfMistakes();
      this.checkLoser()
    }
  };

  checkWinner(isWordCorrect = false) {
    const { letters } = this.model;
    if (!letters.length || isWordCorrect) {
      this.view.printWord();
      this.model.setGameStatus(true);
    }
  }

  checkLoser() {
    const { numberOfMistakes, limitOfMistakes } = this.model;
    if (numberOfMistakes === limitOfMistakes) {
      this.model.setGameStatus(false);
      this.view.printWord();
    }
  }

  onGameStatusUpdated = (isWinner) => {
    this.view.displayGameStatus(isWinner)
  }

  setLimitOfMistakes = (number)=> {
    this.view.setLimitOfMistakes(number)
  }

  startNewGame = () => {
    this.reset()
    this.model.init();
    this.view.init();
  }

  startFirstGame = () => {
    this.model.bindOnWordRetrieved(this.getWord);
    this.model.bindOnGameStatusUpdated(this.onGameStatusUpdated);
    this.model.bindOnLimitofMistakesCreated(this.setLimitOfMistakes)
    this.view.bindOnTileButtonsClicked(this.guessLetter);
    this.view.bindOnWordButtonClicked(this.guessWord);
    this.view.init();
    this.model.init();

    this.view.changeGameButton()
  }

  reset(){
    this.model.reset()
    this.view.reset()
  }

  init() {
    this.view.bindOnGameButtonClicked(this.startFirstGame)
    this.view.bindOnResetButtonClicked(this.startNewGame)
  }
}


/***/ }),

/***/ "./src/modules/Dictionary.js":
/*!***********************************!*\
  !*** ./src/modules/Dictionary.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Get a word from API. Return word.
const config = {
  mode: "cors",
  method: "GET",
  headers: {
    "X-Api-Key": "JuKv+yCXS1ZGMowd97AwEg==TByOU3LN70assN1k",
    "Content-Type": "application/json",
  },
};

async function fetchWord() {
  try {
    // const wordlist = ["word"];
    // const num = Math.floor(Math.random() * wordlist.length);
    // return wordlist[num];
    let word = await fetch("https://api.api-ninjas.com/v1/randomword", config);
    word = await word.json();
    return word.word;
  } catch (error) {
    console.log(error);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  fetchWord,
});



/***/ }),

/***/ "./src/modules/Hangman.js":
/*!********************************!*\
  !*** ./src/modules/Hangman.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Hangman)
/* harmony export */ });
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Helpers */ "./src/modules/Helpers.js");


class Hangman {
  constructor() {
    this.numberOfMistakes = 0;
    this.limitOfMistakes = 0;
  }

  // h 300 w 600
  draw() {
    const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
    const ctx = canvas.getContext("2d");

    ctx.save()
    ctx.translate(150, 0);

    this.drawHanger();
  }

  drawBodyPart() {
    this.numberOfMistakes += 1;
    switch (this.numberOfMistakes) {
      case Math.floor((1/6) * this.limitOfMistakes):
        this.animateHead()
        break;
      case Math.floor((2/6) * this.limitOfMistakes):
        this.animateBody()
        break;
      case Math.floor((3/6) * this.limitOfMistakes):
        this.animateLeftLeg()
        break;
      case Math.floor((4/6) * this.limitOfMistakes):
        this.animateRightLeg()
        break;
      case Math.floor((5/6) * this.limitOfMistakes):
        this.animateLeftArm()
        break;
      case this.limitOfMistakes:
        this.animateRightArm()
        break;
      default:
        break;
    }
  }

  drawHanger() {
    const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
    const ctx = canvas.getContext("2d");

    const hanger = new Path2D();
    ctx.fillStyle = "black";
    hanger.moveTo(10, 290);
    hanger.lineTo(110, 290);
    hanger.lineTo(110, 270);
    hanger.lineTo(70, 270);
    hanger.lineTo(70, 50);
    hanger.lineTo(220, 50);
    hanger.lineTo(220, 80);
    hanger.lineTo(230, 80);
    hanger.lineTo(230, 40);
    hanger.lineTo(50, 40);
    hanger.lineTo(50, 270);
    hanger.lineTo(10, 270);
    ctx.fill(hanger);
  }

  animateHead() {
    let start = 301;
    const END = 102;
    // 98

    const draw = (time) => {
      if (start < END) return;
      start -= 10;

      const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, 300, 600);

      this.drawHanger();

      // Head
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(225, start, 20, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.moveTo(220, 101);
      ctx.arc(225, start, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(220, 101);
      ctx.arc(216, start - 3, 3, 0, Math.PI * 2);
      ctx.moveTo(238, 101);
      ctx.arc(233, start - 3, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(215, start + 7, 20, 3);

      window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
  }

  renderHead() {
    const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
    const ctx = canvas.getContext("2d");

    // Head
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(225, 102, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(220, 101);
    ctx.arc(225, 102, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(220, 101);
    ctx.arc(216, 102 - 3, 3, 0, Math.PI * 2);
    ctx.moveTo(238, 101);
    ctx.arc(233, 102 - 3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(215, 102 + 7, 20, 3);
  }

  animateBody() {
    let start = 321;
    const END = 125;

    const draw = () => {
      if (start < END) return;
      start -= 10;

      const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, 300, 600);

      // Head
      this.drawHanger();
      this.renderHead();

      ctx.fillRect(222, start, 5, 50);

      window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
  }

  renderBody() {
    const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
    const ctx = canvas.getContext("2d");

    // Body

    ctx.fillRect(222, 120, 5, 50);
  }

  animateLeftLeg() {
    let start = 221;
    const END = -11;

    const draw = () => {
      if (start < END) return;
      start -= 10;

      const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, 300, 600);

      this.drawHanger();
      this.renderHead();
      this.renderBody();

      // Left Leg
      ctx.save();
      ctx.fillStyle = "black";
      ctx.translate(224.5, 195);
      ctx.rotate((Math.PI / 180) * 45);
      ctx.fillRect(-22, start, 5, 50);
      ctx.restore();

      window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
  }

  renderLeftLeg() {
    const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
    const ctx = canvas.getContext("2d");

    // Left Leg
    ctx.save();
    ctx.fillStyle = "black";
    ctx.translate(224.5, 195);
    ctx.rotate((Math.PI / 180) * 45);
    ctx.fillRect(-22, -21, 5, 50);
    ctx.restore();
  }

  animateRightLeg() {
    let start = 221;
    const END = -27;

    const draw = () => {
      if (start < END) return;
      start -= 10;

      const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, 300, 600);

      this.drawHanger();
      this.renderHead();
      this.renderBody();
      this.renderLeftLeg();

      // Left Leg
      ctx.save();
      ctx.fillStyle = "black";
      ctx.translate(224.5, 195);
      ctx.rotate((Math.PI / 180) * 135);
      ctx.fillRect(-23, start, 5, 50);
      ctx.restore();

      window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
  }

  renderRightLeg() {
    const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
    const ctx = canvas.getContext("2d");

    // Right Leg
    ctx.save();
    ctx.fillStyle = "black";
    ctx.translate(224.5, 195);
    ctx.rotate((Math.PI / 180) * 135);
    ctx.fillRect(-23, -27, 5, 50);
    ctx.restore();
  }

  animateLeftArm() {
    let start = 321;
    const END = 140;

    const draw = () => {
      if (start < END) return;
      start -= 10;

      const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, 300, 600);

      this.drawHanger();
      this.renderHead();
      this.renderBody();
      this.renderLeftLeg();
      this.renderRightLeg();

      // Left Arm
      ctx.fillStyle = "black";
      ctx.fillRect(171, start, 50, 5);

      window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
  }

  renderLeftArm() {
    const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
    const ctx = canvas.getContext("2d");

    // Left Arm
    ctx.fillStyle = "black";
    ctx.fillRect(171, 130, 50, 5);
  }

  animateRightArm() {
    let start = 321;
    const END = 140;

    const draw = () => {
      if (start < END) return;
      start -= 10;

      const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, 300, 600);

      this.drawHanger();
      this.renderHead();
      this.renderBody();
      this.renderLeftLeg();
      this.renderRightLeg();
      this.renderLeftArm();

      // Right Arm
      ctx.fillStyle = "black";
      ctx.fillRect(227, start, 50, 5);

      window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
  }

  renderRightArm() {
    const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
    const ctx = canvas.getContext("2d");

    // Right Arm
    ctx.fillStyle = "black";
    ctx.fillRect(227, 140, 50, 5);
  }

  reset(){
    const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 600, 300)
    ctx.restore()

    this.numberOfMistakes = 0
  }

  renderWinner(){
    const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 600, 300)
    this.drawHanger()

    ctx.translate(-100, 0);

    // Head
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(325, 202, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(220, 101);
    ctx.arc(325, 202, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(220, 101);
    ctx.arc(316, 202 - 3, 3, 0, Math.PI * 2);
    ctx.moveTo(238, 101);
    ctx.arc(333, 202 - 3, 3, 0, Math.PI * 2);
    ctx.moveTo(333, 220);
    ctx.fill();

    // Smile
    ctx.beginPath();
    ctx.moveTo(314, 205);
    ctx.arc(324, 205, 10, 0, Math.PI, false);
    ctx.stroke();

    // Body

    ctx.fillRect(322, 220, 5, 50);

     // Left Leg
     ctx.save();
     ctx.fillStyle = "black";
     ctx.translate(224.5, 195);
     ctx.rotate((Math.PI / 180) * 45);
     ctx.fillRect(120, -20, 5, 50);
     ctx.restore();

     // Right Leg
    ctx.save();
    ctx.fillStyle = "black";
    ctx.translate(224.5, 195);
    ctx.rotate((Math.PI / 180) * 135);
    ctx.fillRect(-23, -169, 5, 50);
    ctx.restore();

    // Left Arm
    ctx.save();
     ctx.fillStyle = "black";
     ctx.translate(224.5, 195);
     ctx.rotate((Math.PI / 180) * 45);
     ctx.fillRect(100, -90, 5, 50);
     ctx.restore();


    // Right Arm
    ctx.save();
     ctx.fillStyle = "black";
     ctx.translate(224.5, 195);
     ctx.rotate((Math.PI / 180) * 135);
     ctx.fillRect(-40, -100, 5, 50);
     ctx.restore();

    //  ctx.translate(300, 0);
  }
}


/***/ }),

/***/ "./src/modules/Helpers.js":
/*!********************************!*\
  !*** ./src/modules/Helpers.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "getElement": () => (/* binding */ getElement)
/* harmony export */ });
function createElement(element, className){
    const ele = document.createElement(`${element}`)
    if(className) ele.classList.add(`${className}`)
    return ele
}

function getElement(className){
    const ele = document.querySelector(`.${className}`)
    return ele
}



/***/ }),

/***/ "./src/modules/Model.js":
/*!******************************!*\
  !*** ./src/modules/Model.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Model)
/* harmony export */ });
// import Dictionary from "./Dictionary";

class Model {
  constructor(dictionary) {
    this.word = null;
    this.numberOfMistakes = 0;
    this.limitOfMistakes = 6;
    this.letters = [];
    this.gameStatus = null;
    this.dictionary = dictionary;
  }

  // Get word from API and set to word property
  async fetchWord() {
    this.word = await this.dictionary.fetchWord();
    this.setLetters();
    this.setLimitofMistakes(this.word);
    // console.log(this.letters);
    this.onWordRetrieved();
  }

  getWord() {
    return this.word;
  }

  bindOnWordRetrieved(callback) {
    this.onWordRetrieved = callback;
  }

  bindOnGameStatusUpdated(callback) {
    this.onGameStatusUpdated = callback;
  }

  bindOnLimitofMistakesCreated(callback){
    this.limitOfMistakesCreated = callback
  }

  // Insert letters of word into letters prop
  setLetters() {
    for (let index = 0; index < this.word.length; index++) {
      this.letters.push(this.word.charAt(index));
    }
  }

  // Set number of mistakes
  setLimitofMistakes({length}) {
    let numOfMistake = length * 2
    if(numOfMistake > 20)numOfMistake = 20
    this.limitOfMistakes = numOfMistake;

    this.limitOfMistakesCreated(this.limitOfMistakes)
  }

  increaseNumOfMistakes() {
    this.numberOfMistakes += 1;
  }

  // Remove a letter from letters prop
  removeLetter(letter) {
    this.letters = this.letters.filter((item) => item !== letter);
  }

  // Set value to gameStatus prop
  setGameStatus(status) {
    this.gameStatus = status;

    this.onGameStatusUpdated(this.gameStatus);
  }

  init() {
    this.fetchWord();
  }

  // Resets values of properties of model
  reset() {
    this.word = null;
    this.numberOfMistakes = null;
    this.letters = [];
    this.gameStatus = null;
  }
}


/***/ }),

/***/ "./src/modules/View.js":
/*!*****************************!*\
  !*** ./src/modules/View.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Helpers */ "./src/modules/Helpers.js");


class View {
  constructor(hangman) {
    this.hangman = hangman;
    this.tile_container = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("tile-container");
    this.tiles = [];
    this.animatedElement = null;
    this.display = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("display");
    this.displayWords = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("display__words");
    this.resetButton = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("reset-button");
    this.startButton = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("start-button");
    this.backDrop = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("backdrop");
  }

  // Get length of the word
  createTiles(word) {
    for (let index = 0; index < word.length; index++) {
      const tile = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", "tile-container__tile");
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
    const button = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("guess-button");
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_Dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Dictionary */ "./src/modules/Dictionary.js");
/* harmony import */ var _modules_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Model */ "./src/modules/Model.js");
/* harmony import */ var _modules_Hangman__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Hangman */ "./src/modules/Hangman.js");
/* harmony import */ var _modules_View__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/View */ "./src/modules/View.js");
/* harmony import */ var _modules_Controller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/Controller */ "./src/modules/Controller.js");
/* harmony import */ var _modules_Helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/Helpers */ "./src/modules/Helpers.js");







const hangman = new _modules_Hangman__WEBPACK_IMPORTED_MODULE_2__["default"]()
// hangman.draw()
const view = new _modules_View__WEBPACK_IMPORTED_MODULE_3__["default"](hangman)
const model = new _modules_Model__WEBPACK_IMPORTED_MODULE_1__["default"](_modules_Dictionary__WEBPACK_IMPORTED_MODULE_0__["default"])
const controller = new _modules_Controller__WEBPACK_IMPORTED_MODULE_4__["default"](model, view)

controller.init()

// const word = model.dictionary.fetchWord()
// console.log(word);
// view.addLetters('a')
// view.flashRed()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsYUFBYTtBQUNwQyxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksVUFBVTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxvQ0FBb0M7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZTtBQUNmO0FBQ0EsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCcUM7O0FBRXhCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixvREFBVTtBQUMvQjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixvREFBVTtBQUMvQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0RBQVU7QUFDL0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixvREFBVTtBQUMvQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwYUE7QUFDQSwwQ0FBMEMsUUFBUTtBQUNsRCx1Q0FBdUMsVUFBVTtBQUNqRDtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLFVBQVU7QUFDckQ7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1RBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsT0FBTztBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRnNEOztBQUV2QztBQUNmO0FBQ0E7QUFDQSwwQkFBMEIsb0RBQVU7QUFDcEM7QUFDQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qix3QkFBd0Isb0RBQVU7QUFDbEMsdUJBQXVCLG9EQUFVO0FBQ2pDLHVCQUF1QixvREFBVTtBQUNqQyxvQkFBb0Isb0RBQVU7QUFDOUI7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0MsbUJBQW1CLHVEQUFhO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTs7QUFFQSxrQkFBa0IsZUFBZTtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDOUtBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ044QztBQUNWO0FBQ0k7QUFDTjtBQUNZO0FBQ2dCOztBQUU5RCxvQkFBb0Isd0RBQU87QUFDM0I7QUFDQSxpQkFBaUIscURBQUk7QUFDckIsa0JBQWtCLHNEQUFLLENBQUMsMkRBQVU7QUFDbEMsdUJBQXVCLDJEQUFVOztBQUVqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQiIsInNvdXJjZXMiOlsid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL0RpY3Rpb25hcnkuanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9IYW5nbWFuLmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvSGVscGVycy5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL01vZGVsLmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvVmlldy5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgdmlldykge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICB9XG5cbiAgZ2V0V29yZCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdXb3JkID0gdGhpcy5tb2RlbC5nZXRXb3JkKCk7XG4gICAgLy8gY29uc29sZS5sb2cobmV3V29yZCk7XG4gICAgdGhpcy52aWV3LmNyZWF0ZVRpbGVzKG5ld1dvcmQpO1xuICB9O1xuXG4gIGNoZWNrbGV0dGVyKGNob3NlbkxldHRlcikge1xuICAgIHJldHVybiB0aGlzLm1vZGVsLmxldHRlcnMuc29tZSgobGV0dGVyKSA9PiBsZXR0ZXIgPT09IGNob3NlbkxldHRlcik7XG4gIH1cblxuICBjaGVja1dvcmQod29yZCkge1xuICAgIHJldHVybiB0aGlzLm1vZGVsLndvcmQgPT09IHdvcmQudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIGd1ZXNzTGV0dGVyID0gKGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjdXJyZW50VGFyZ2V0OiB7IHRleHRDb250ZW50IH0sXG4gICAgfSA9IGU7XG4gICAgY29uc3QgbGV0dGVyID0gdGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAodGhpcy5jaGVja2xldHRlcihsZXR0ZXIpKSB7XG4gICAgICB0aGlzLm1vZGVsLnJlbW92ZUxldHRlcihsZXR0ZXIpO1xuICAgICAgdGhpcy52aWV3LmFkZExldHRlcnMobGV0dGVyKTtcbiAgICAgIHRoaXMudmlldy5mbGFzaEdyZWVuKCk7XG4gICAgICB0aGlzLmNoZWNrV2lubmVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlldy5mbGFzaFJlZCgpO1xuICAgICAgdGhpcy52aWV3LnJlbmRlckJvZHlQYXJ0KCk7XG4gICAgICB0aGlzLm1vZGVsLmluY3JlYXNlTnVtT2ZNaXN0YWtlcygpO1xuICAgICAgdGhpcy5jaGVja0xvc2VyKCk7XG4gICAgfVxuICB9O1xuXG4gIGd1ZXNzV29yZCA9ICh3b3JkKSA9PiB7XG4gICAgaWYgKHRoaXMuY2hlY2tXb3JkKHdvcmQpKSB7XG4gICAgICAvLyB0aGlzLnZpZXcucHJpbnRXb3JkKCk7XG4gICAgICB0aGlzLnZpZXcuZmxhc2hHcmVlbigpO1xuICAgICAgdGhpcy5jaGVja1dpbm5lcih0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWV3LmZsYXNoUmVkKCk7XG4gICAgICB0aGlzLnZpZXcucmVuZGVyQm9keVBhcnQoKTtcbiAgICAgIHRoaXMubW9kZWwuaW5jcmVhc2VOdW1PZk1pc3Rha2VzKCk7XG4gICAgICB0aGlzLmNoZWNrTG9zZXIoKVxuICAgIH1cbiAgfTtcblxuICBjaGVja1dpbm5lcihpc1dvcmRDb3JyZWN0ID0gZmFsc2UpIHtcbiAgICBjb25zdCB7IGxldHRlcnMgfSA9IHRoaXMubW9kZWw7XG4gICAgaWYgKCFsZXR0ZXJzLmxlbmd0aCB8fCBpc1dvcmRDb3JyZWN0KSB7XG4gICAgICB0aGlzLnZpZXcucHJpbnRXb3JkKCk7XG4gICAgICB0aGlzLm1vZGVsLnNldEdhbWVTdGF0dXModHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tMb3NlcigpIHtcbiAgICBjb25zdCB7IG51bWJlck9mTWlzdGFrZXMsIGxpbWl0T2ZNaXN0YWtlcyB9ID0gdGhpcy5tb2RlbDtcbiAgICBpZiAobnVtYmVyT2ZNaXN0YWtlcyA9PT0gbGltaXRPZk1pc3Rha2VzKSB7XG4gICAgICB0aGlzLm1vZGVsLnNldEdhbWVTdGF0dXMoZmFsc2UpO1xuICAgICAgdGhpcy52aWV3LnByaW50V29yZCgpO1xuICAgIH1cbiAgfVxuXG4gIG9uR2FtZVN0YXR1c1VwZGF0ZWQgPSAoaXNXaW5uZXIpID0+IHtcbiAgICB0aGlzLnZpZXcuZGlzcGxheUdhbWVTdGF0dXMoaXNXaW5uZXIpXG4gIH1cblxuICBzZXRMaW1pdE9mTWlzdGFrZXMgPSAobnVtYmVyKT0+IHtcbiAgICB0aGlzLnZpZXcuc2V0TGltaXRPZk1pc3Rha2VzKG51bWJlcilcbiAgfVxuXG4gIHN0YXJ0TmV3R2FtZSA9ICgpID0+IHtcbiAgICB0aGlzLnJlc2V0KClcbiAgICB0aGlzLm1vZGVsLmluaXQoKTtcbiAgICB0aGlzLnZpZXcuaW5pdCgpO1xuICB9XG5cbiAgc3RhcnRGaXJzdEdhbWUgPSAoKSA9PiB7XG4gICAgdGhpcy5tb2RlbC5iaW5kT25Xb3JkUmV0cmlldmVkKHRoaXMuZ2V0V29yZCk7XG4gICAgdGhpcy5tb2RlbC5iaW5kT25HYW1lU3RhdHVzVXBkYXRlZCh0aGlzLm9uR2FtZVN0YXR1c1VwZGF0ZWQpO1xuICAgIHRoaXMubW9kZWwuYmluZE9uTGltaXRvZk1pc3Rha2VzQ3JlYXRlZCh0aGlzLnNldExpbWl0T2ZNaXN0YWtlcylcbiAgICB0aGlzLnZpZXcuYmluZE9uVGlsZUJ1dHRvbnNDbGlja2VkKHRoaXMuZ3Vlc3NMZXR0ZXIpO1xuICAgIHRoaXMudmlldy5iaW5kT25Xb3JkQnV0dG9uQ2xpY2tlZCh0aGlzLmd1ZXNzV29yZCk7XG4gICAgdGhpcy52aWV3LmluaXQoKTtcbiAgICB0aGlzLm1vZGVsLmluaXQoKTtcblxuICAgIHRoaXMudmlldy5jaGFuZ2VHYW1lQnV0dG9uKClcbiAgfVxuXG4gIHJlc2V0KCl7XG4gICAgdGhpcy5tb2RlbC5yZXNldCgpXG4gICAgdGhpcy52aWV3LnJlc2V0KClcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy52aWV3LmJpbmRPbkdhbWVCdXR0b25DbGlja2VkKHRoaXMuc3RhcnRGaXJzdEdhbWUpXG4gICAgdGhpcy52aWV3LmJpbmRPblJlc2V0QnV0dG9uQ2xpY2tlZCh0aGlzLnN0YXJ0TmV3R2FtZSlcbiAgfVxufVxuIiwiLy8gR2V0IGEgd29yZCBmcm9tIEFQSS4gUmV0dXJuIHdvcmQuXG5jb25zdCBjb25maWcgPSB7XG4gIG1vZGU6IFwiY29yc1wiLFxuICBtZXRob2Q6IFwiR0VUXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBcIlgtQXBpLUtleVwiOiBcIkp1S3YreUNYUzFaR01vd2Q5N0F3RWc9PVRCeU9VM0xONzBhc3NOMWtcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoV29yZCgpIHtcbiAgdHJ5IHtcbiAgICAvLyBjb25zdCB3b3JkbGlzdCA9IFtcIndvcmRcIl07XG4gICAgLy8gY29uc3QgbnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd29yZGxpc3QubGVuZ3RoKTtcbiAgICAvLyByZXR1cm4gd29yZGxpc3RbbnVtXTtcbiAgICBsZXQgd29yZCA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9hcGkuYXBpLW5pbmphcy5jb20vdjEvcmFuZG9td29yZFwiLCBjb25maWcpO1xuICAgIHdvcmQgPSBhd2FpdCB3b3JkLmpzb24oKTtcbiAgICByZXR1cm4gd29yZC53b3JkO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGZldGNoV29yZCxcbn07XG5cbiIsImltcG9ydCB7IGdldEVsZW1lbnQgfSBmcm9tIFwiLi9IZWxwZXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhbmdtYW4ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm51bWJlck9mTWlzdGFrZXMgPSAwO1xuICAgIHRoaXMubGltaXRPZk1pc3Rha2VzID0gMDtcbiAgfVxuXG4gIC8vIGggMzAwIHcgNjAwXG4gIGRyYXcoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY3R4LnNhdmUoKVxuICAgIGN0eC50cmFuc2xhdGUoMTUwLCAwKTtcblxuICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICB9XG5cbiAgZHJhd0JvZHlQYXJ0KCkge1xuICAgIHRoaXMubnVtYmVyT2ZNaXN0YWtlcyArPSAxO1xuICAgIHN3aXRjaCAodGhpcy5udW1iZXJPZk1pc3Rha2VzKSB7XG4gICAgICBjYXNlIE1hdGguZmxvb3IoKDEvNikgKiB0aGlzLmxpbWl0T2ZNaXN0YWtlcyk6XG4gICAgICAgIHRoaXMuYW5pbWF0ZUhlYWQoKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTWF0aC5mbG9vcigoMi82KSAqIHRoaXMubGltaXRPZk1pc3Rha2VzKTpcbiAgICAgICAgdGhpcy5hbmltYXRlQm9keSgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBNYXRoLmZsb29yKCgzLzYpICogdGhpcy5saW1pdE9mTWlzdGFrZXMpOlxuICAgICAgICB0aGlzLmFuaW1hdGVMZWZ0TGVnKClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE1hdGguZmxvb3IoKDQvNikgKiB0aGlzLmxpbWl0T2ZNaXN0YWtlcyk6XG4gICAgICAgIHRoaXMuYW5pbWF0ZVJpZ2h0TGVnKClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE1hdGguZmxvb3IoKDUvNikgKiB0aGlzLmxpbWl0T2ZNaXN0YWtlcyk6XG4gICAgICAgIHRoaXMuYW5pbWF0ZUxlZnRBcm0oKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5saW1pdE9mTWlzdGFrZXM6XG4gICAgICAgIHRoaXMuYW5pbWF0ZVJpZ2h0QXJtKClcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBkcmF3SGFuZ2VyKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGNvbnN0IGhhbmdlciA9IG5ldyBQYXRoMkQoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGhhbmdlci5tb3ZlVG8oMTAsIDI5MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygxMTAsIDI5MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygxMTAsIDI3MCk7XG4gICAgaGFuZ2VyLmxpbmVUbyg3MCwgMjcwKTtcbiAgICBoYW5nZXIubGluZVRvKDcwLCA1MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygyMjAsIDUwKTtcbiAgICBoYW5nZXIubGluZVRvKDIyMCwgODApO1xuICAgIGhhbmdlci5saW5lVG8oMjMwLCA4MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygyMzAsIDQwKTtcbiAgICBoYW5nZXIubGluZVRvKDUwLCA0MCk7XG4gICAgaGFuZ2VyLmxpbmVUbyg1MCwgMjcwKTtcbiAgICBoYW5nZXIubGluZVRvKDEwLCAyNzApO1xuICAgIGN0eC5maWxsKGhhbmdlcik7XG4gIH1cblxuICBhbmltYXRlSGVhZCgpIHtcbiAgICBsZXQgc3RhcnQgPSAzMDE7XG4gICAgY29uc3QgRU5EID0gMTAyO1xuICAgIC8vIDk4XG5cbiAgICBjb25zdCBkcmF3ID0gKHRpbWUpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG5cbiAgICAgIC8vIEhlYWRcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHguYXJjKDIyNSwgc3RhcnQsIDIwLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguZmlsbCgpO1xuXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgICBjdHguYXJjKDIyNSwgc3RhcnQsIDE4LCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguZmlsbCgpO1xuXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgICBjdHguYXJjKDIxNiwgc3RhcnQgLSAzLCAzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHgubW92ZVRvKDIzOCwgMTAxKTtcbiAgICAgIGN0eC5hcmMoMjMzLCBzdGFydCAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgICBjdHguZmlsbFJlY3QoMjE1LCBzdGFydCArIDcsIDIwLCAzKTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlckhlYWQoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gSGVhZFxuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoMjI1LCAxMDIsIDIwLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oMjIwLCAxMDEpO1xuICAgIGN0eC5hcmMoMjI1LCAxMDIsIDE4LCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oMjIwLCAxMDEpO1xuICAgIGN0eC5hcmMoMjE2LCAxMDIgLSAzLCAzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4Lm1vdmVUbygyMzgsIDEwMSk7XG4gICAgY3R4LmFyYygyMzMsIDEwMiAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5maWxsUmVjdCgyMTUsIDEwMiArIDcsIDIwLCAzKTtcbiAgfVxuXG4gIGFuaW1hdGVCb2R5KCkge1xuICAgIGxldCBzdGFydCA9IDMyMTtcbiAgICBjb25zdCBFTkQgPSAxMjU7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICAvLyBIZWFkXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuXG4gICAgICBjdHguZmlsbFJlY3QoMjIyLCBzdGFydCwgNSwgNTApO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyQm9keSgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBCb2R5XG5cbiAgICBjdHguZmlsbFJlY3QoMjIyLCAxMjAsIDUsIDUwKTtcbiAgfVxuXG4gIGFuaW1hdGVMZWZ0TGVnKCkge1xuICAgIGxldCBzdGFydCA9IDIyMTtcbiAgICBjb25zdCBFTkQgPSAtMTE7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuICAgICAgdGhpcy5yZW5kZXJCb2R5KCk7XG5cbiAgICAgIC8vIExlZnQgTGVnXG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDQ1KTtcbiAgICAgIGN0eC5maWxsUmVjdCgtMjIsIHN0YXJ0LCA1LCA1MCk7XG4gICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyTGVmdExlZygpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBMZWZ0IExlZ1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogNDUpO1xuICAgIGN0eC5maWxsUmVjdCgtMjIsIC0yMSwgNSwgNTApO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBhbmltYXRlUmlnaHRMZWcoKSB7XG4gICAgbGV0IHN0YXJ0ID0gMjIxO1xuICAgIGNvbnN0IEVORCA9IC0yNztcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG4gICAgICB0aGlzLnJlbmRlckJvZHkoKTtcbiAgICAgIHRoaXMucmVuZGVyTGVmdExlZygpO1xuXG4gICAgICAvLyBMZWZ0IExlZ1xuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiAxMzUpO1xuICAgICAgY3R4LmZpbGxSZWN0KC0yMywgc3RhcnQsIDUsIDUwKTtcbiAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJSaWdodExlZygpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBSaWdodCBMZWdcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDEzNSk7XG4gICAgY3R4LmZpbGxSZWN0KC0yMywgLTI3LCA1LCA1MCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIGFuaW1hdGVMZWZ0QXJtKCkge1xuICAgIGxldCBzdGFydCA9IDMyMTtcbiAgICBjb25zdCBFTkQgPSAxNDA7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuICAgICAgdGhpcy5yZW5kZXJCb2R5KCk7XG4gICAgICB0aGlzLnJlbmRlckxlZnRMZWcoKTtcbiAgICAgIHRoaXMucmVuZGVyUmlnaHRMZWcoKTtcblxuICAgICAgLy8gTGVmdCBBcm1cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHguZmlsbFJlY3QoMTcxLCBzdGFydCwgNTAsIDUpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyTGVmdEFybSgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBMZWZ0IEFybVxuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LmZpbGxSZWN0KDE3MSwgMTMwLCA1MCwgNSk7XG4gIH1cblxuICBhbmltYXRlUmlnaHRBcm0oKSB7XG4gICAgbGV0IHN0YXJ0ID0gMzIxO1xuICAgIGNvbnN0IEVORCA9IDE0MDtcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG4gICAgICB0aGlzLnJlbmRlckJvZHkoKTtcbiAgICAgIHRoaXMucmVuZGVyTGVmdExlZygpO1xuICAgICAgdGhpcy5yZW5kZXJSaWdodExlZygpO1xuICAgICAgdGhpcy5yZW5kZXJMZWZ0QXJtKCk7XG5cbiAgICAgIC8vIFJpZ2h0IEFybVxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC5maWxsUmVjdCgyMjcsIHN0YXJ0LCA1MCwgNSk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJSaWdodEFybSgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBSaWdodCBBcm1cbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5maWxsUmVjdCgyMjcsIDE0MCwgNTAsIDUpO1xuICB9XG5cbiAgcmVzZXQoKXtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDYwMCwgMzAwKVxuICAgIGN0eC5yZXN0b3JlKClcblxuICAgIHRoaXMubnVtYmVyT2ZNaXN0YWtlcyA9IDBcbiAgfVxuXG4gIHJlbmRlcldpbm5lcigpe1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgNjAwLCAzMDApXG4gICAgdGhpcy5kcmF3SGFuZ2VyKClcblxuICAgIGN0eC50cmFuc2xhdGUoLTEwMCwgMCk7XG5cbiAgICAvLyBIZWFkXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYygzMjUsIDIwMiwgMjAsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgY3R4LmFyYygzMjUsIDIwMiwgMTgsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgY3R4LmFyYygzMTYsIDIwMiAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHgubW92ZVRvKDIzOCwgMTAxKTtcbiAgICBjdHguYXJjKDMzMywgMjAyIC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5tb3ZlVG8oMzMzLCAyMjApO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICAvLyBTbWlsZVxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDMxNCwgMjA1KTtcbiAgICBjdHguYXJjKDMyNCwgMjA1LCAxMCwgMCwgTWF0aC5QSSwgZmFsc2UpO1xuICAgIGN0eC5zdHJva2UoKTtcblxuICAgIC8vIEJvZHlcblxuICAgIGN0eC5maWxsUmVjdCgzMjIsIDIyMCwgNSwgNTApO1xuXG4gICAgIC8vIExlZnQgTGVnXG4gICAgIGN0eC5zYXZlKCk7XG4gICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogNDUpO1xuICAgICBjdHguZmlsbFJlY3QoMTIwLCAtMjAsIDUsIDUwKTtcbiAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgICAvLyBSaWdodCBMZWdcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDEzNSk7XG4gICAgY3R4LmZpbGxSZWN0KC0yMywgLTE2OSwgNSwgNTApO1xuICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAvLyBMZWZ0IEFybVxuICAgIGN0eC5zYXZlKCk7XG4gICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogNDUpO1xuICAgICBjdHguZmlsbFJlY3QoMTAwLCAtOTAsIDUsIDUwKTtcbiAgICAgY3R4LnJlc3RvcmUoKTtcblxuXG4gICAgLy8gUmlnaHQgQXJtXG4gICAgY3R4LnNhdmUoKTtcbiAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiAxMzUpO1xuICAgICBjdHguZmlsbFJlY3QoLTQwLCAtMTAwLCA1LCA1MCk7XG4gICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAvLyAgY3R4LnRyYW5zbGF0ZSgzMDAsIDApO1xuICB9XG59XG4iLCJmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGVsZW1lbnQsIGNsYXNzTmFtZSl7XG4gICAgY29uc3QgZWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgJHtlbGVtZW50fWApXG4gICAgaWYoY2xhc3NOYW1lKSBlbGUuY2xhc3NMaXN0LmFkZChgJHtjbGFzc05hbWV9YClcbiAgICByZXR1cm4gZWxlXG59XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnQoY2xhc3NOYW1lKXtcbiAgICBjb25zdCBlbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc05hbWV9YClcbiAgICByZXR1cm4gZWxlXG59XG5cbmV4cG9ydCB7Y3JlYXRlRWxlbWVudCwgZ2V0RWxlbWVudH0iLCIvLyBpbXBvcnQgRGljdGlvbmFyeSBmcm9tIFwiLi9EaWN0aW9uYXJ5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGVsIHtcbiAgY29uc3RydWN0b3IoZGljdGlvbmFyeSkge1xuICAgIHRoaXMud29yZCA9IG51bGw7XG4gICAgdGhpcy5udW1iZXJPZk1pc3Rha2VzID0gMDtcbiAgICB0aGlzLmxpbWl0T2ZNaXN0YWtlcyA9IDY7XG4gICAgdGhpcy5sZXR0ZXJzID0gW107XG4gICAgdGhpcy5nYW1lU3RhdHVzID0gbnVsbDtcbiAgICB0aGlzLmRpY3Rpb25hcnkgPSBkaWN0aW9uYXJ5O1xuICB9XG5cbiAgLy8gR2V0IHdvcmQgZnJvbSBBUEkgYW5kIHNldCB0byB3b3JkIHByb3BlcnR5XG4gIGFzeW5jIGZldGNoV29yZCgpIHtcbiAgICB0aGlzLndvcmQgPSBhd2FpdCB0aGlzLmRpY3Rpb25hcnkuZmV0Y2hXb3JkKCk7XG4gICAgdGhpcy5zZXRMZXR0ZXJzKCk7XG4gICAgdGhpcy5zZXRMaW1pdG9mTWlzdGFrZXModGhpcy53b3JkKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmxldHRlcnMpO1xuICAgIHRoaXMub25Xb3JkUmV0cmlldmVkKCk7XG4gIH1cblxuICBnZXRXb3JkKCkge1xuICAgIHJldHVybiB0aGlzLndvcmQ7XG4gIH1cblxuICBiaW5kT25Xb3JkUmV0cmlldmVkKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbldvcmRSZXRyaWV2ZWQgPSBjYWxsYmFjaztcbiAgfVxuXG4gIGJpbmRPbkdhbWVTdGF0dXNVcGRhdGVkKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbkdhbWVTdGF0dXNVcGRhdGVkID0gY2FsbGJhY2s7XG4gIH1cblxuICBiaW5kT25MaW1pdG9mTWlzdGFrZXNDcmVhdGVkKGNhbGxiYWNrKXtcbiAgICB0aGlzLmxpbWl0T2ZNaXN0YWtlc0NyZWF0ZWQgPSBjYWxsYmFja1xuICB9XG5cbiAgLy8gSW5zZXJ0IGxldHRlcnMgb2Ygd29yZCBpbnRvIGxldHRlcnMgcHJvcFxuICBzZXRMZXR0ZXJzKCkge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLndvcmQubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB0aGlzLmxldHRlcnMucHVzaCh0aGlzLndvcmQuY2hhckF0KGluZGV4KSk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2V0IG51bWJlciBvZiBtaXN0YWtlc1xuICBzZXRMaW1pdG9mTWlzdGFrZXMoe2xlbmd0aH0pIHtcbiAgICBsZXQgbnVtT2ZNaXN0YWtlID0gbGVuZ3RoICogMlxuICAgIGlmKG51bU9mTWlzdGFrZSA+IDIwKW51bU9mTWlzdGFrZSA9IDIwXG4gICAgdGhpcy5saW1pdE9mTWlzdGFrZXMgPSBudW1PZk1pc3Rha2U7XG5cbiAgICB0aGlzLmxpbWl0T2ZNaXN0YWtlc0NyZWF0ZWQodGhpcy5saW1pdE9mTWlzdGFrZXMpXG4gIH1cblxuICBpbmNyZWFzZU51bU9mTWlzdGFrZXMoKSB7XG4gICAgdGhpcy5udW1iZXJPZk1pc3Rha2VzICs9IDE7XG4gIH1cblxuICAvLyBSZW1vdmUgYSBsZXR0ZXIgZnJvbSBsZXR0ZXJzIHByb3BcbiAgcmVtb3ZlTGV0dGVyKGxldHRlcikge1xuICAgIHRoaXMubGV0dGVycyA9IHRoaXMubGV0dGVycy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGxldHRlcik7XG4gIH1cblxuICAvLyBTZXQgdmFsdWUgdG8gZ2FtZVN0YXR1cyBwcm9wXG4gIHNldEdhbWVTdGF0dXMoc3RhdHVzKSB7XG4gICAgdGhpcy5nYW1lU3RhdHVzID0gc3RhdHVzO1xuXG4gICAgdGhpcy5vbkdhbWVTdGF0dXNVcGRhdGVkKHRoaXMuZ2FtZVN0YXR1cyk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuZmV0Y2hXb3JkKCk7XG4gIH1cblxuICAvLyBSZXNldHMgdmFsdWVzIG9mIHByb3BlcnRpZXMgb2YgbW9kZWxcbiAgcmVzZXQoKSB7XG4gICAgdGhpcy53b3JkID0gbnVsbDtcbiAgICB0aGlzLm51bWJlck9mTWlzdGFrZXMgPSBudWxsO1xuICAgIHRoaXMubGV0dGVycyA9IFtdO1xuICAgIHRoaXMuZ2FtZVN0YXR1cyA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGdldEVsZW1lbnQgfSBmcm9tIFwiLi9IZWxwZXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihoYW5nbWFuKSB7XG4gICAgdGhpcy5oYW5nbWFuID0gaGFuZ21hbjtcbiAgICB0aGlzLnRpbGVfY29udGFpbmVyID0gZ2V0RWxlbWVudChcInRpbGUtY29udGFpbmVyXCIpO1xuICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICB0aGlzLmFuaW1hdGVkRWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5kaXNwbGF5ID0gZ2V0RWxlbWVudChcImRpc3BsYXlcIik7XG4gICAgdGhpcy5kaXNwbGF5V29yZHMgPSBnZXRFbGVtZW50KFwiZGlzcGxheV9fd29yZHNcIik7XG4gICAgdGhpcy5yZXNldEJ1dHRvbiA9IGdldEVsZW1lbnQoXCJyZXNldC1idXR0b25cIik7XG4gICAgdGhpcy5zdGFydEJ1dHRvbiA9IGdldEVsZW1lbnQoXCJzdGFydC1idXR0b25cIik7XG4gICAgdGhpcy5iYWNrRHJvcCA9IGdldEVsZW1lbnQoXCJiYWNrZHJvcFwiKTtcbiAgfVxuXG4gIC8vIEdldCBsZW5ndGggb2YgdGhlIHdvcmRcbiAgY3JlYXRlVGlsZXMod29yZCkge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB3b3JkLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgdGlsZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJ0aWxlLWNvbnRhaW5lcl9fdGlsZVwiKTtcbiAgICAgIHRpbGUuZGF0YXNldC5sZXR0ZXIgPSB3b3JkW2luZGV4XTtcbiAgICAgIHRoaXMudGlsZV9jb250YWluZXIuYXBwZW5kQ2hpbGQodGlsZSk7XG4gICAgICB0aGlzLnRpbGVzLnB1c2godGlsZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTGV0dGVycyhsZXR0ZXIpIHtcbiAgICB0aGlzLnRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgIGlmICh0aWxlLmRhdGFzZXQubGV0dGVyID09PSBsZXR0ZXIpIHRpbGUudGV4dENvbnRlbnQgPSBsZXR0ZXI7XG4gICAgfSk7XG4gIH1cblxuICBzZXRMaW1pdE9mTWlzdGFrZXMgPSAobnVtYmVyKSA9PiB7XG4gICAgdGhpcy5oYW5nbWFuLmxpbWl0T2ZNaXN0YWtlcyA9IG51bWJlclxuICAgIGNvbnNvbGUubG9nKCdOVW1iZXIgb2YgbWlzdGFrZXMgJyArIG51bWJlcik7XG4gIH07XG5cbiAgcHJpbnRXb3JkKCkge1xuICAgIHRoaXMudGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgICAgdGlsZS50ZXh0Q29udGVudCA9IHRpbGUuZGF0YXNldC5sZXR0ZXI7XG4gICAgfSk7XG4gIH1cblxuICBiaW5kT25UaWxlQnV0dG9uc0NsaWNrZWQgPSAoaGFuZGxlcikgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmtleWJvYXJkLWNvbnRhaW5lcl9fYnV0dG9uXCIpO1xuICAgIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGhhbmRsZXIoZSk7XG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbihlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGJpbmRPbldvcmRCdXR0b25DbGlja2VkID0gKGhhbmRsZXIpID0+IHtcbiAgICBjb25zdCBidXR0b24gPSBnZXRFbGVtZW50KFwiZ3Vlc3MtYnV0dG9uXCIpO1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ndWVzcy1pbnB1dFwiKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGhhbmRsZXIoaW5wdXQudmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIGJpbmRPbkdhbWVCdXR0b25DbGlja2VkID0gKGhhbmRsZXIpID0+IHtcbiAgICB0aGlzLnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBoYW5kbGVyKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgYmluZE9uUmVzZXRCdXR0b25DbGlja2VkID0gKGhhbmRsZXIpID0+IHtcbiAgICB0aGlzLnJlc2V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBoYW5kbGVyKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgY2hhbmdlR2FtZUJ1dHRvbigpIHtcbiAgICB0aGlzLnJlc2V0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgdGhpcy5zdGFydEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH1cblxuICBmbGFzaFJlZCgpIHtcbiAgICBpZiAodGhpcy5hbmltYXRlZEVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmFuaW1hdGVkRWxlbWVudC5jdXJyZW50VGltZSkgdGhpcy5hbmltYXRlZEVsZW1lbnQuY2FuY2VsKCk7XG4gICAgfVxuICAgIGNvbnN0IGFuaW1hdGlvbiA9IFtcbiAgICAgIHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LCAwLCAwLCAwLjM0NilcIixcbiAgICAgIH0sXG5cbiAgICAgIHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCIsXG4gICAgICB9LFxuICAgIF07XG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IHsgZHVyYXRpb246IDEwMDAgfTtcbiAgICB0aGlzLmFuaW1hdGVkRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuYW5pbWF0ZShhbmltYXRpb24sIGFuaW1hdGlvblRpbWUpO1xuICB9XG5cbiAgZmxhc2hHcmVlbigpIHtcbiAgICBpZiAodGhpcy5hbmltYXRlZEVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmFuaW1hdGVkRWxlbWVudC5jdXJyZW50VGltZSkgdGhpcy5hbmltYXRlZEVsZW1lbnQuY2FuY2VsKCk7XG4gICAgfVxuICAgIGNvbnN0IGFuaW1hdGlvbiA9IFtcbiAgICAgIHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMiwgMjE0LCAyLCAwLjUzMylcIixcbiAgICAgIH0sXG5cbiAgICAgIHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCIsXG4gICAgICB9LFxuICAgIF07XG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IHsgZHVyYXRpb246IDEwMDAgfTtcbiAgICB0aGlzLmFuaW1hdGVkRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuYW5pbWF0ZShhbmltYXRpb24sIGFuaW1hdGlvblRpbWUpO1xuICB9XG5cbiAgZGlzYWJsZUJ1dHRvbih7IGN1cnJlbnRUYXJnZXQgfSkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGN1cnJlbnRUYXJnZXQ7XG4gICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGVuYWJsZUFsbEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIua2V5Ym9hcmQtY29udGFpbmVyX19idXR0b25cIik7XG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyQm9keVBhcnQoKSB7XG4gICAgdGhpcy5oYW5nbWFuLmRyYXdCb2R5UGFydCgpO1xuICB9XG5cbiAgZGlzcGxheUdhbWVTdGF0dXMgPSAoaXNXaW5uZXIpID0+IHtcbiAgICBpZiAoaXNXaW5uZXIpIHtcbiAgICAgIHRoaXMuaGFuZ21hbi5yZW5kZXJXaW5uZXIoKTtcbiAgICAgIHRoaXMuc2hvd0Rpc3BsYXllcih0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93RGlzcGxheWVyKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgc2hvd0Rpc3BsYXllciA9IChpc1dpbm5lcikgPT4ge1xuICAgIGlmIChpc1dpbm5lcikge1xuICAgICAgdGhpcy5kaXNwbGF5LmNsYXNzTGlzdC50b2dnbGUoXCJkaXNwbGF5X3dpbm5lclwiKTtcbiAgICAgIHRoaXMuZGlzcGxheVdvcmRzLnRleHRDb250ZW50ID0gXCJHb29kIEpvYiFcIjtcbiAgICAgIC8vIHRoaXMuYmFja0Ryb3AuY2xhc3NMaXN0LnRvZ2dsZShcImJhY2tkcm9wX29wZW5cIik7XG4gICAgICB0aGlzLnRvZ2dsZUJhY2tEcm9wKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc3BsYXkuY2xhc3NMaXN0LnRvZ2dsZShcImRpc3BsYXlfbG9zZXJcIik7XG4gICAgICB0aGlzLmRpc3BsYXlXb3Jkcy50ZXh0Q29udGVudCA9IFwiVG9vIEJhZCFcIjtcbiAgICAgIC8vIHRoaXMuYmFja0Ryb3AuY2xhc3NMaXN0LnRvZ2dsZShcImJhY2tkcm9wX29wZW5cIik7XG4gICAgICB0aGlzLnRvZ2dsZUJhY2tEcm9wKHRydWUpO1xuICAgIH1cbiAgfTtcblxuICB0b2dnbGVCYWNrRHJvcChpc0dhbWVEb25lKSB7XG4gICAgaWYgKGlzR2FtZURvbmUpIHtcbiAgICAgIHRoaXMuYmFja0Ryb3AuY2xhc3NMaXN0LnRvZ2dsZShcImJhY2tkcm9wX29wZW5cIik7XG4gICAgICB0aGlzLnJlc2V0QnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJyZXNldC1idXR0b25fZmxhc2hcIik7XG4gICAgfSBlbHNlIGlmICh0aGlzLmJhY2tEcm9wLmNsYXNzTGlzdC5jb250YWlucyhcImJhY2tkcm9wX29wZW5cIikpIHtcbiAgICAgIHRoaXMuYmFja0Ryb3AuY2xhc3NMaXN0LnRvZ2dsZShcImJhY2tkcm9wX29wZW5cIik7XG4gICAgICB0aGlzLnJlc2V0QnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJyZXNldC1idXR0b25fZmxhc2hcIik7XG4gICAgfVxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy50aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB0aGlzLnRpbGVfY29udGFpbmVyLnJlbW92ZUNoaWxkKHRpbGUpKTtcbiAgICB0aGlzLnRpbGVzID0gW107XG4gICAgdGhpcy5hbmltYXRlZEVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuZGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzcGxheV9sb3NlclwiKTtcbiAgICB0aGlzLmRpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZShcImRpc3BsYXlfd2lubmVyXCIpO1xuICAgIHRoaXMuZW5hYmxlQWxsQnV0dG9ucygpO1xuICAgIHRoaXMudG9nZ2xlQmFja0Ryb3AoZmFsc2UpO1xuICAgIHRoaXMuaGFuZ21hbi5yZXNldCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmhhbmdtYW4uZHJhdygpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBEaWN0aW9uYXJ5IGZyb20gXCIuL21vZHVsZXMvRGljdGlvbmFyeVwiO1xuaW1wb3J0IE1vZGVsIGZyb20gXCIuL21vZHVsZXMvTW9kZWxcIjtcbmltcG9ydCBIYW5nbWFuIGZyb20gXCIuL21vZHVsZXMvSGFuZ21hblwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4vbW9kdWxlcy9WaWV3XCI7XG5pbXBvcnQgQ29udHJvbGxlciBmcm9tIFwiLi9tb2R1bGVzL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGdldEVsZW1lbnQgfSBmcm9tIFwiLi9tb2R1bGVzL0hlbHBlcnNcIjtcblxuY29uc3QgaGFuZ21hbiA9IG5ldyBIYW5nbWFuKClcbi8vIGhhbmdtYW4uZHJhdygpXG5jb25zdCB2aWV3ID0gbmV3IFZpZXcoaGFuZ21hbilcbmNvbnN0IG1vZGVsID0gbmV3IE1vZGVsKERpY3Rpb25hcnkpXG5jb25zdCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIobW9kZWwsIHZpZXcpXG5cbmNvbnRyb2xsZXIuaW5pdCgpXG5cbi8vIGNvbnN0IHdvcmQgPSBtb2RlbC5kaWN0aW9uYXJ5LmZldGNoV29yZCgpXG4vLyBjb25zb2xlLmxvZyh3b3JkKTtcbi8vIHZpZXcuYWRkTGV0dGVycygnYScpXG4vLyB2aWV3LmZsYXNoUmVkKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=