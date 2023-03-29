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

//API JuKv+yCXS1ZGMowd97AwEg==TByOU3LN70assN1k


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsYUFBYTtBQUNwQyxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksVUFBVTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxvQ0FBb0M7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZTtBQUNmO0FBQ0EsQ0FBQyxFQUFDOztBQUVGOzs7Ozs7Ozs7Ozs7Ozs7O0FDM0J1Qzs7QUFFeEI7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixvREFBVTtBQUMvQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0RBQVU7QUFDL0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0RBQVU7QUFDL0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3BhQTtBQUNBLDBDQUEwQyxRQUFRO0FBQ2xELHVDQUF1QyxVQUFVO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMsVUFBVTtBQUNyRDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDVEE7O0FBRWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixPQUFPO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hGc0Q7O0FBRXZDO0FBQ2Y7QUFDQTtBQUNBLDBCQUEwQixvREFBVTtBQUNwQztBQUNBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCLHdCQUF3QixvREFBVTtBQUNsQyx1QkFBdUIsb0RBQVU7QUFDakMsdUJBQXVCLG9EQUFVO0FBQ2pDLG9CQUFvQixvREFBVTtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLHFCQUFxQjtBQUM3QyxtQkFBbUIsdURBQWE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBOztBQUVBLGtCQUFrQixlQUFlO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUM5S0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ1Y7QUFDSTtBQUNOO0FBQ1k7QUFDZ0I7O0FBRTlELG9CQUFvQix3REFBTztBQUMzQjtBQUNBLGlCQUFpQixxREFBSTtBQUNyQixrQkFBa0Isc0RBQUssQ0FBQywyREFBVTtBQUNsQyx1QkFBdUIsMkRBQVU7O0FBRWpDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9Db250cm9sbGVyLmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvRGljdGlvbmFyeS5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL0hhbmdtYW4uanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9IZWxwZXJzLmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvTW9kZWwuanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9WaWV3LmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hhbmdtYW5nYW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2hhbmdtYW5nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCB2aWV3KSB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gIH1cblxuICBnZXRXb3JkID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld1dvcmQgPSB0aGlzLm1vZGVsLmdldFdvcmQoKTtcbiAgICAvLyBjb25zb2xlLmxvZyhuZXdXb3JkKTtcbiAgICB0aGlzLnZpZXcuY3JlYXRlVGlsZXMobmV3V29yZCk7XG4gIH07XG5cbiAgY2hlY2tsZXR0ZXIoY2hvc2VuTGV0dGVyKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWwubGV0dGVycy5zb21lKChsZXR0ZXIpID0+IGxldHRlciA9PT0gY2hvc2VuTGV0dGVyKTtcbiAgfVxuXG4gIGNoZWNrV29yZCh3b3JkKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWwud29yZCA9PT0gd29yZC50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgZ3Vlc3NMZXR0ZXIgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGN1cnJlbnRUYXJnZXQ6IHsgdGV4dENvbnRlbnQgfSxcbiAgICB9ID0gZTtcbiAgICBjb25zdCBsZXR0ZXIgPSB0ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh0aGlzLmNoZWNrbGV0dGVyKGxldHRlcikpIHtcbiAgICAgIHRoaXMubW9kZWwucmVtb3ZlTGV0dGVyKGxldHRlcik7XG4gICAgICB0aGlzLnZpZXcuYWRkTGV0dGVycyhsZXR0ZXIpO1xuICAgICAgdGhpcy52aWV3LmZsYXNoR3JlZW4oKTtcbiAgICAgIHRoaXMuY2hlY2tXaW5uZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWV3LmZsYXNoUmVkKCk7XG4gICAgICB0aGlzLnZpZXcucmVuZGVyQm9keVBhcnQoKTtcbiAgICAgIHRoaXMubW9kZWwuaW5jcmVhc2VOdW1PZk1pc3Rha2VzKCk7XG4gICAgICB0aGlzLmNoZWNrTG9zZXIoKTtcbiAgICB9XG4gIH07XG5cbiAgZ3Vlc3NXb3JkID0gKHdvcmQpID0+IHtcbiAgICBpZiAodGhpcy5jaGVja1dvcmQod29yZCkpIHtcbiAgICAgIC8vIHRoaXMudmlldy5wcmludFdvcmQoKTtcbiAgICAgIHRoaXMudmlldy5mbGFzaEdyZWVuKCk7XG4gICAgICB0aGlzLmNoZWNrV2lubmVyKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXcuZmxhc2hSZWQoKTtcbiAgICAgIHRoaXMudmlldy5yZW5kZXJCb2R5UGFydCgpO1xuICAgICAgdGhpcy5tb2RlbC5pbmNyZWFzZU51bU9mTWlzdGFrZXMoKTtcbiAgICAgIHRoaXMuY2hlY2tMb3NlcigpXG4gICAgfVxuICB9O1xuXG4gIGNoZWNrV2lubmVyKGlzV29yZENvcnJlY3QgPSBmYWxzZSkge1xuICAgIGNvbnN0IHsgbGV0dGVycyB9ID0gdGhpcy5tb2RlbDtcbiAgICBpZiAoIWxldHRlcnMubGVuZ3RoIHx8IGlzV29yZENvcnJlY3QpIHtcbiAgICAgIHRoaXMudmlldy5wcmludFdvcmQoKTtcbiAgICAgIHRoaXMubW9kZWwuc2V0R2FtZVN0YXR1cyh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBjaGVja0xvc2VyKCkge1xuICAgIGNvbnN0IHsgbnVtYmVyT2ZNaXN0YWtlcywgbGltaXRPZk1pc3Rha2VzIH0gPSB0aGlzLm1vZGVsO1xuICAgIGlmIChudW1iZXJPZk1pc3Rha2VzID09PSBsaW1pdE9mTWlzdGFrZXMpIHtcbiAgICAgIHRoaXMubW9kZWwuc2V0R2FtZVN0YXR1cyhmYWxzZSk7XG4gICAgICB0aGlzLnZpZXcucHJpbnRXb3JkKCk7XG4gICAgfVxuICB9XG5cbiAgb25HYW1lU3RhdHVzVXBkYXRlZCA9IChpc1dpbm5lcikgPT4ge1xuICAgIHRoaXMudmlldy5kaXNwbGF5R2FtZVN0YXR1cyhpc1dpbm5lcilcbiAgfVxuXG4gIHNldExpbWl0T2ZNaXN0YWtlcyA9IChudW1iZXIpPT4ge1xuICAgIHRoaXMudmlldy5zZXRMaW1pdE9mTWlzdGFrZXMobnVtYmVyKVxuICB9XG5cbiAgc3RhcnROZXdHYW1lID0gKCkgPT4ge1xuICAgIHRoaXMucmVzZXQoKVxuICAgIHRoaXMubW9kZWwuaW5pdCgpO1xuICAgIHRoaXMudmlldy5pbml0KCk7XG4gIH1cblxuICBzdGFydEZpcnN0R2FtZSA9ICgpID0+IHtcbiAgICB0aGlzLm1vZGVsLmJpbmRPbldvcmRSZXRyaWV2ZWQodGhpcy5nZXRXb3JkKTtcbiAgICB0aGlzLm1vZGVsLmJpbmRPbkdhbWVTdGF0dXNVcGRhdGVkKHRoaXMub25HYW1lU3RhdHVzVXBkYXRlZCk7XG4gICAgdGhpcy5tb2RlbC5iaW5kT25MaW1pdG9mTWlzdGFrZXNDcmVhdGVkKHRoaXMuc2V0TGltaXRPZk1pc3Rha2VzKVxuICAgIHRoaXMudmlldy5iaW5kT25UaWxlQnV0dG9uc0NsaWNrZWQodGhpcy5ndWVzc0xldHRlcik7XG4gICAgdGhpcy52aWV3LmJpbmRPbldvcmRCdXR0b25DbGlja2VkKHRoaXMuZ3Vlc3NXb3JkKTtcbiAgICB0aGlzLnZpZXcuaW5pdCgpO1xuICAgIHRoaXMubW9kZWwuaW5pdCgpO1xuXG4gICAgdGhpcy52aWV3LmNoYW5nZUdhbWVCdXR0b24oKVxuICB9XG5cbiAgcmVzZXQoKXtcbiAgICB0aGlzLm1vZGVsLnJlc2V0KClcbiAgICB0aGlzLnZpZXcucmVzZXQoKVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnZpZXcuYmluZE9uR2FtZUJ1dHRvbkNsaWNrZWQodGhpcy5zdGFydEZpcnN0R2FtZSlcbiAgICB0aGlzLnZpZXcuYmluZE9uUmVzZXRCdXR0b25DbGlja2VkKHRoaXMuc3RhcnROZXdHYW1lKVxuICB9XG59XG4iLCIvLyBHZXQgYSB3b3JkIGZyb20gQVBJLiBSZXR1cm4gd29yZC5cbmNvbnN0IGNvbmZpZyA9IHtcbiAgbW9kZTogXCJjb3JzXCIsXG4gIG1ldGhvZDogXCJHRVRcIixcbiAgaGVhZGVyczoge1xuICAgIFwiWC1BcGktS2V5XCI6IFwiSnVLdit5Q1hTMVpHTW93ZDk3QXdFZz09VEJ5T1UzTE43MGFzc04xa1wiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufTtcblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hXb3JkKCkge1xuICB0cnkge1xuICAgIC8vIGNvbnN0IHdvcmRsaXN0ID0gW1wid29yZFwiXTtcbiAgICAvLyBjb25zdCBudW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3b3JkbGlzdC5sZW5ndGgpO1xuICAgIC8vIHJldHVybiB3b3JkbGlzdFtudW1dO1xuICAgIGxldCB3b3JkID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2FwaS5hcGktbmluamFzLmNvbS92MS9yYW5kb213b3JkXCIsIGNvbmZpZyk7XG4gICAgd29yZCA9IGF3YWl0IHdvcmQuanNvbigpO1xuICAgIHJldHVybiB3b3JkLndvcmQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZmV0Y2hXb3JkLFxufTtcblxuLy9BUEkgSnVLdit5Q1hTMVpHTW93ZDk3QXdFZz09VEJ5T1UzTE43MGFzc04xa1xuIiwiaW1wb3J0IHsgZ2V0RWxlbWVudCB9IGZyb20gXCIuL0hlbHBlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFuZ21hbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubnVtYmVyT2ZNaXN0YWtlcyA9IDA7XG4gICAgdGhpcy5saW1pdE9mTWlzdGFrZXMgPSAwO1xuICB9XG5cbiAgLy8gaCAzMDAgdyA2MDBcbiAgZHJhdygpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LnRyYW5zbGF0ZSgxNTAsIDApO1xuXG4gICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gIH1cblxuICBkcmF3Qm9keVBhcnQoKSB7XG4gICAgdGhpcy5udW1iZXJPZk1pc3Rha2VzICs9IDE7XG4gICAgc3dpdGNoICh0aGlzLm51bWJlck9mTWlzdGFrZXMpIHtcbiAgICAgIGNhc2UgTWF0aC5mbG9vcigoMS82KSAqIHRoaXMubGltaXRPZk1pc3Rha2VzKTpcbiAgICAgICAgdGhpcy5hbmltYXRlSGVhZCgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBNYXRoLmZsb29yKCgyLzYpICogdGhpcy5saW1pdE9mTWlzdGFrZXMpOlxuICAgICAgICB0aGlzLmFuaW1hdGVCb2R5KClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE1hdGguZmxvb3IoKDMvNikgKiB0aGlzLmxpbWl0T2ZNaXN0YWtlcyk6XG4gICAgICAgIHRoaXMuYW5pbWF0ZUxlZnRMZWcoKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTWF0aC5mbG9vcigoNC82KSAqIHRoaXMubGltaXRPZk1pc3Rha2VzKTpcbiAgICAgICAgdGhpcy5hbmltYXRlUmlnaHRMZWcoKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTWF0aC5mbG9vcigoNS82KSAqIHRoaXMubGltaXRPZk1pc3Rha2VzKTpcbiAgICAgICAgdGhpcy5hbmltYXRlTGVmdEFybSgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLmxpbWl0T2ZNaXN0YWtlczpcbiAgICAgICAgdGhpcy5hbmltYXRlUmlnaHRBcm0oKVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGRyYXdIYW5nZXIoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY29uc3QgaGFuZ2VyID0gbmV3IFBhdGgyRCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgaGFuZ2VyLm1vdmVUbygxMCwgMjkwKTtcbiAgICBoYW5nZXIubGluZVRvKDExMCwgMjkwKTtcbiAgICBoYW5nZXIubGluZVRvKDExMCwgMjcwKTtcbiAgICBoYW5nZXIubGluZVRvKDcwLCAyNzApO1xuICAgIGhhbmdlci5saW5lVG8oNzAsIDUwKTtcbiAgICBoYW5nZXIubGluZVRvKDIyMCwgNTApO1xuICAgIGhhbmdlci5saW5lVG8oMjIwLCA4MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygyMzAsIDgwKTtcbiAgICBoYW5nZXIubGluZVRvKDIzMCwgNDApO1xuICAgIGhhbmdlci5saW5lVG8oNTAsIDQwKTtcbiAgICBoYW5nZXIubGluZVRvKDUwLCAyNzApO1xuICAgIGhhbmdlci5saW5lVG8oMTAsIDI3MCk7XG4gICAgY3R4LmZpbGwoaGFuZ2VyKTtcbiAgfVxuXG4gIGFuaW1hdGVIZWFkKCkge1xuICAgIGxldCBzdGFydCA9IDMwMTtcbiAgICBjb25zdCBFTkQgPSAxMDI7XG4gICAgLy8gOThcblxuICAgIGNvbnN0IGRyYXcgPSAodGltZSkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcblxuICAgICAgLy8gSGVhZFxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5hcmMoMjI1LCBzdGFydCwgMjAsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICAgIGN0eC5hcmMoMjI1LCBzdGFydCwgMTgsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICAgIGN0eC5hcmMoMjE2LCBzdGFydCAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5tb3ZlVG8oMjM4LCAxMDEpO1xuICAgICAgY3R4LmFyYygyMzMsIHN0YXJ0IC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIGN0eC5maWxsUmVjdCgyMTUsIHN0YXJ0ICsgNywgMjAsIDMpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVySGVhZCgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBIZWFkXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYygyMjUsIDEwMiwgMjAsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgY3R4LmFyYygyMjUsIDEwMiwgMTgsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgY3R4LmFyYygyMTYsIDEwMiAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHgubW92ZVRvKDIzOCwgMTAxKTtcbiAgICBjdHguYXJjKDIzMywgMTAyIC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LmZpbGxSZWN0KDIxNSwgMTAyICsgNywgMjAsIDMpO1xuICB9XG5cbiAgYW5pbWF0ZUJvZHkoKSB7XG4gICAgbGV0IHN0YXJ0ID0gMzIxO1xuICAgIGNvbnN0IEVORCA9IDEyNTtcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIC8vIEhlYWRcbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG5cbiAgICAgIGN0eC5maWxsUmVjdCgyMjIsIHN0YXJ0LCA1LCA1MCk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJCb2R5KCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIEJvZHlcblxuICAgIGN0eC5maWxsUmVjdCgyMjIsIDEyMCwgNSwgNTApO1xuICB9XG5cbiAgYW5pbWF0ZUxlZnRMZWcoKSB7XG4gICAgbGV0IHN0YXJ0ID0gMjIxO1xuICAgIGNvbnN0IEVORCA9IC0xMTtcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG4gICAgICB0aGlzLnJlbmRlckJvZHkoKTtcblxuICAgICAgLy8gTGVmdCBMZWdcbiAgICAgIGN0eC5zYXZlKCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogNDUpO1xuICAgICAgY3R4LmZpbGxSZWN0KC0yMiwgc3RhcnQsIDUsIDUwKTtcbiAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJMZWZ0TGVnKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIExlZnQgTGVnXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiA0NSk7XG4gICAgY3R4LmZpbGxSZWN0KC0yMiwgLTIxLCA1LCA1MCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIGFuaW1hdGVSaWdodExlZygpIHtcbiAgICBsZXQgc3RhcnQgPSAyMjE7XG4gICAgY29uc3QgRU5EID0gLTI3O1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gICAgICB0aGlzLnJlbmRlckhlYWQoKTtcbiAgICAgIHRoaXMucmVuZGVyQm9keSgpO1xuICAgICAgdGhpcy5yZW5kZXJMZWZ0TGVnKCk7XG5cbiAgICAgIC8vIExlZnQgTGVnXG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDEzNSk7XG4gICAgICBjdHguZmlsbFJlY3QoLTIzLCBzdGFydCwgNSwgNTApO1xuICAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlclJpZ2h0TGVnKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIFJpZ2h0IExlZ1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogMTM1KTtcbiAgICBjdHguZmlsbFJlY3QoLTIzLCAtMjcsIDUsIDUwKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgYW5pbWF0ZUxlZnRBcm0oKSB7XG4gICAgbGV0IHN0YXJ0ID0gMzIxO1xuICAgIGNvbnN0IEVORCA9IDE0MDtcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG4gICAgICB0aGlzLnJlbmRlckJvZHkoKTtcbiAgICAgIHRoaXMucmVuZGVyTGVmdExlZygpO1xuICAgICAgdGhpcy5yZW5kZXJSaWdodExlZygpO1xuXG4gICAgICAvLyBMZWZ0IEFybVxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC5maWxsUmVjdCgxNzEsIHN0YXJ0LCA1MCwgNSk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJMZWZ0QXJtKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIExlZnQgQXJtXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguZmlsbFJlY3QoMTcxLCAxMzAsIDUwLCA1KTtcbiAgfVxuXG4gIGFuaW1hdGVSaWdodEFybSgpIHtcbiAgICBsZXQgc3RhcnQgPSAzMjE7XG4gICAgY29uc3QgRU5EID0gMTQwO1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gICAgICB0aGlzLnJlbmRlckhlYWQoKTtcbiAgICAgIHRoaXMucmVuZGVyQm9keSgpO1xuICAgICAgdGhpcy5yZW5kZXJMZWZ0TGVnKCk7XG4gICAgICB0aGlzLnJlbmRlclJpZ2h0TGVnKCk7XG4gICAgICB0aGlzLnJlbmRlckxlZnRBcm0oKTtcblxuICAgICAgLy8gUmlnaHQgQXJtXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LmZpbGxSZWN0KDIyNywgc3RhcnQsIDUwLCA1KTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlclJpZ2h0QXJtKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIFJpZ2h0IEFybVxuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LmZpbGxSZWN0KDIyNywgMTQwLCA1MCwgNSk7XG4gIH1cblxuICByZXNldCgpe1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgNjAwLCAzMDApXG4gICAgY3R4LnJlc3RvcmUoKVxuXG4gICAgdGhpcy5udW1iZXJPZk1pc3Rha2VzID0gMFxuICB9XG5cbiAgcmVuZGVyV2lubmVyKCl7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCA2MDAsIDMwMClcbiAgICB0aGlzLmRyYXdIYW5nZXIoKVxuXG4gICAgY3R4LnRyYW5zbGF0ZSgtMTAwLCAwKTtcblxuICAgIC8vIEhlYWRcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKDMyNSwgMjAyLCAyMCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICBjdHguYXJjKDMyNSwgMjAyLCAxOCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICBjdHguYXJjKDMxNiwgMjAyIC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5tb3ZlVG8oMjM4LCAxMDEpO1xuICAgIGN0eC5hcmMoMzMzLCAyMDIgLSAzLCAzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4Lm1vdmVUbygzMzMsIDIyMCk7XG4gICAgY3R4LmZpbGwoKTtcblxuICAgIC8vIFNtaWxlXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oMzE0LCAyMDUpO1xuICAgIGN0eC5hcmMoMzI0LCAyMDUsIDEwLCAwLCBNYXRoLlBJLCBmYWxzZSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgLy8gQm9keVxuXG4gICAgY3R4LmZpbGxSZWN0KDMyMiwgMjIwLCA1LCA1MCk7XG5cbiAgICAgLy8gTGVmdCBMZWdcbiAgICAgY3R4LnNhdmUoKTtcbiAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiA0NSk7XG4gICAgIGN0eC5maWxsUmVjdCgxMjAsIC0yMCwgNSwgNTApO1xuICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgIC8vIFJpZ2h0IExlZ1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogMTM1KTtcbiAgICBjdHguZmlsbFJlY3QoLTIzLCAtMTY5LCA1LCA1MCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcblxuICAgIC8vIExlZnQgQXJtXG4gICAgY3R4LnNhdmUoKTtcbiAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiA0NSk7XG4gICAgIGN0eC5maWxsUmVjdCgxMDAsIC05MCwgNSwgNTApO1xuICAgICBjdHgucmVzdG9yZSgpO1xuXG5cbiAgICAvLyBSaWdodCBBcm1cbiAgICBjdHguc2F2ZSgpO1xuICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDEzNSk7XG4gICAgIGN0eC5maWxsUmVjdCgtNDAsIC0xMDAsIDUsIDUwKTtcbiAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgIC8vICBjdHgudHJhbnNsYXRlKDMwMCwgMCk7XG4gIH1cbn1cbiIsImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZWxlbWVudCwgY2xhc3NOYW1lKXtcbiAgICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGAke2VsZW1lbnR9YClcbiAgICBpZihjbGFzc05hbWUpIGVsZS5jbGFzc0xpc3QuYWRkKGAke2NsYXNzTmFtZX1gKVxuICAgIHJldHVybiBlbGVcbn1cblxuZnVuY3Rpb24gZ2V0RWxlbWVudChjbGFzc05hbWUpe1xuICAgIGNvbnN0IGVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzTmFtZX1gKVxuICAgIHJldHVybiBlbGVcbn1cblxuZXhwb3J0IHtjcmVhdGVFbGVtZW50LCBnZXRFbGVtZW50fSIsIi8vIGltcG9ydCBEaWN0aW9uYXJ5IGZyb20gXCIuL0RpY3Rpb25hcnlcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWwge1xuICBjb25zdHJ1Y3RvcihkaWN0aW9uYXJ5KSB7XG4gICAgdGhpcy53b3JkID0gbnVsbDtcbiAgICB0aGlzLm51bWJlck9mTWlzdGFrZXMgPSAwO1xuICAgIHRoaXMubGltaXRPZk1pc3Rha2VzID0gNjtcbiAgICB0aGlzLmxldHRlcnMgPSBbXTtcbiAgICB0aGlzLmdhbWVTdGF0dXMgPSBudWxsO1xuICAgIHRoaXMuZGljdGlvbmFyeSA9IGRpY3Rpb25hcnk7XG4gIH1cblxuICAvLyBHZXQgd29yZCBmcm9tIEFQSSBhbmQgc2V0IHRvIHdvcmQgcHJvcGVydHlcbiAgYXN5bmMgZmV0Y2hXb3JkKCkge1xuICAgIHRoaXMud29yZCA9IGF3YWl0IHRoaXMuZGljdGlvbmFyeS5mZXRjaFdvcmQoKTtcbiAgICB0aGlzLnNldExldHRlcnMoKTtcbiAgICB0aGlzLnNldExpbWl0b2ZNaXN0YWtlcyh0aGlzLndvcmQpO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubGV0dGVycyk7XG4gICAgdGhpcy5vbldvcmRSZXRyaWV2ZWQoKTtcbiAgfVxuXG4gIGdldFdvcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMud29yZDtcbiAgfVxuXG4gIGJpbmRPbldvcmRSZXRyaWV2ZWQoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uV29yZFJldHJpZXZlZCA9IGNhbGxiYWNrO1xuICB9XG5cbiAgYmluZE9uR2FtZVN0YXR1c1VwZGF0ZWQoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uR2FtZVN0YXR1c1VwZGF0ZWQgPSBjYWxsYmFjaztcbiAgfVxuXG4gIGJpbmRPbkxpbWl0b2ZNaXN0YWtlc0NyZWF0ZWQoY2FsbGJhY2spe1xuICAgIHRoaXMubGltaXRPZk1pc3Rha2VzQ3JlYXRlZCA9IGNhbGxiYWNrXG4gIH1cblxuICAvLyBJbnNlcnQgbGV0dGVycyBvZiB3b3JkIGludG8gbGV0dGVycyBwcm9wXG4gIHNldExldHRlcnMoKSB7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMud29yZC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHRoaXMubGV0dGVycy5wdXNoKHRoaXMud29yZC5jaGFyQXQoaW5kZXgpKTtcbiAgICB9XG4gIH1cblxuICAvLyBTZXQgbnVtYmVyIG9mIG1pc3Rha2VzXG4gIHNldExpbWl0b2ZNaXN0YWtlcyh7bGVuZ3RofSkge1xuICAgIGxldCBudW1PZk1pc3Rha2UgPSBsZW5ndGggKiAyXG4gICAgaWYobnVtT2ZNaXN0YWtlID4gMjApbnVtT2ZNaXN0YWtlID0gMjBcbiAgICB0aGlzLmxpbWl0T2ZNaXN0YWtlcyA9IG51bU9mTWlzdGFrZTtcblxuICAgIHRoaXMubGltaXRPZk1pc3Rha2VzQ3JlYXRlZCh0aGlzLmxpbWl0T2ZNaXN0YWtlcylcbiAgfVxuXG4gIGluY3JlYXNlTnVtT2ZNaXN0YWtlcygpIHtcbiAgICB0aGlzLm51bWJlck9mTWlzdGFrZXMgKz0gMTtcbiAgfVxuXG4gIC8vIFJlbW92ZSBhIGxldHRlciBmcm9tIGxldHRlcnMgcHJvcFxuICByZW1vdmVMZXR0ZXIobGV0dGVyKSB7XG4gICAgdGhpcy5sZXR0ZXJzID0gdGhpcy5sZXR0ZXJzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gbGV0dGVyKTtcbiAgfVxuXG4gIC8vIFNldCB2YWx1ZSB0byBnYW1lU3RhdHVzIHByb3BcbiAgc2V0R2FtZVN0YXR1cyhzdGF0dXMpIHtcbiAgICB0aGlzLmdhbWVTdGF0dXMgPSBzdGF0dXM7XG5cbiAgICB0aGlzLm9uR2FtZVN0YXR1c1VwZGF0ZWQodGhpcy5nYW1lU3RhdHVzKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5mZXRjaFdvcmQoKTtcbiAgfVxuXG4gIC8vIFJlc2V0cyB2YWx1ZXMgb2YgcHJvcGVydGllcyBvZiBtb2RlbFxuICByZXNldCgpIHtcbiAgICB0aGlzLndvcmQgPSBudWxsO1xuICAgIHRoaXMubnVtYmVyT2ZNaXN0YWtlcyA9IG51bGw7XG4gICAgdGhpcy5sZXR0ZXJzID0gW107XG4gICAgdGhpcy5nYW1lU3RhdHVzID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZ2V0RWxlbWVudCB9IGZyb20gXCIuL0hlbHBlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG4gIGNvbnN0cnVjdG9yKGhhbmdtYW4pIHtcbiAgICB0aGlzLmhhbmdtYW4gPSBoYW5nbWFuO1xuICAgIHRoaXMudGlsZV9jb250YWluZXIgPSBnZXRFbGVtZW50KFwidGlsZS1jb250YWluZXJcIik7XG4gICAgdGhpcy50aWxlcyA9IFtdO1xuICAgIHRoaXMuYW5pbWF0ZWRFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLmRpc3BsYXkgPSBnZXRFbGVtZW50KFwiZGlzcGxheVwiKTtcbiAgICB0aGlzLmRpc3BsYXlXb3JkcyA9IGdldEVsZW1lbnQoXCJkaXNwbGF5X193b3Jkc1wiKTtcbiAgICB0aGlzLnJlc2V0QnV0dG9uID0gZ2V0RWxlbWVudChcInJlc2V0LWJ1dHRvblwiKTtcbiAgICB0aGlzLnN0YXJ0QnV0dG9uID0gZ2V0RWxlbWVudChcInN0YXJ0LWJ1dHRvblwiKTtcbiAgICB0aGlzLmJhY2tEcm9wID0gZ2V0RWxlbWVudChcImJhY2tkcm9wXCIpO1xuICB9XG5cbiAgLy8gR2V0IGxlbmd0aCBvZiB0aGUgd29yZFxuICBjcmVhdGVUaWxlcyh3b3JkKSB7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHdvcmQubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCB0aWxlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcInRpbGUtY29udGFpbmVyX190aWxlXCIpO1xuICAgICAgdGlsZS5kYXRhc2V0LmxldHRlciA9IHdvcmRbaW5kZXhdO1xuICAgICAgdGhpcy50aWxlX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aWxlKTtcbiAgICAgIHRoaXMudGlsZXMucHVzaCh0aWxlKTtcbiAgICB9XG4gIH1cblxuICBhZGRMZXR0ZXJzKGxldHRlcikge1xuICAgIHRoaXMudGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgICAgaWYgKHRpbGUuZGF0YXNldC5sZXR0ZXIgPT09IGxldHRlcikgdGlsZS50ZXh0Q29udGVudCA9IGxldHRlcjtcbiAgICB9KTtcbiAgfVxuXG4gIHNldExpbWl0T2ZNaXN0YWtlcyA9IChudW1iZXIpID0+IHtcbiAgICB0aGlzLmhhbmdtYW4ubGltaXRPZk1pc3Rha2VzID0gbnVtYmVyXG4gICAgY29uc29sZS5sb2coJ05VbWJlciBvZiBtaXN0YWtlcyAnICsgbnVtYmVyKTtcbiAgfTtcblxuICBwcmludFdvcmQoKSB7XG4gICAgdGhpcy50aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICB0aWxlLnRleHRDb250ZW50ID0gdGlsZS5kYXRhc2V0LmxldHRlcjtcbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRPblRpbGVCdXR0b25zQ2xpY2tlZCA9IChoYW5kbGVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIua2V5Ym9hcmQtY29udGFpbmVyX19idXR0b25cIik7XG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaGFuZGxlcihlKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgYmluZE9uV29yZEJ1dHRvbkNsaWNrZWQgPSAoaGFuZGxlcikgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGdldEVsZW1lbnQoXCJndWVzcy1idXR0b25cIik7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmd1ZXNzLWlucHV0XCIpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaGFuZGxlcihpbnB1dC52YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgYmluZE9uR2FtZUJ1dHRvbkNsaWNrZWQgPSAoaGFuZGxlcikgPT4ge1xuICAgIHRoaXMuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGhhbmRsZXIoKTtcbiAgICB9KTtcbiAgfTtcblxuICBiaW5kT25SZXNldEJ1dHRvbkNsaWNrZWQgPSAoaGFuZGxlcikgPT4ge1xuICAgIHRoaXMucmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGhhbmRsZXIoKTtcbiAgICB9KTtcbiAgfTtcblxuICBjaGFuZ2VHYW1lQnV0dG9uKCkge1xuICAgIHRoaXMucmVzZXRCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB0aGlzLnN0YXJ0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgfVxuXG4gIGZsYXNoUmVkKCkge1xuICAgIGlmICh0aGlzLmFuaW1hdGVkRWxlbWVudCkge1xuICAgICAgaWYgKHRoaXMuYW5pbWF0ZWRFbGVtZW50LmN1cnJlbnRUaW1lKSB0aGlzLmFuaW1hdGVkRWxlbWVudC5jYW5jZWwoKTtcbiAgICB9XG4gICAgY29uc3QgYW5pbWF0aW9uID0gW1xuICAgICAge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsIDAsIDAsIDAuMzQ2KVwiLFxuICAgICAgfSxcblxuICAgICAge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIixcbiAgICAgIH0sXG4gICAgXTtcbiAgICBjb25zdCBhbmltYXRpb25UaW1lID0geyBkdXJhdGlvbjogMTAwMCB9O1xuICAgIHRoaXMuYW5pbWF0ZWRFbGVtZW50ID0gZG9jdW1lbnQuYm9keS5hbmltYXRlKGFuaW1hdGlvbiwgYW5pbWF0aW9uVGltZSk7XG4gIH1cblxuICBmbGFzaEdyZWVuKCkge1xuICAgIGlmICh0aGlzLmFuaW1hdGVkRWxlbWVudCkge1xuICAgICAgaWYgKHRoaXMuYW5pbWF0ZWRFbGVtZW50LmN1cnJlbnRUaW1lKSB0aGlzLmFuaW1hdGVkRWxlbWVudC5jYW5jZWwoKTtcbiAgICB9XG4gICAgY29uc3QgYW5pbWF0aW9uID0gW1xuICAgICAge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyLCAyMTQsIDIsIDAuNTMzKVwiLFxuICAgICAgfSxcblxuICAgICAge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIixcbiAgICAgIH0sXG4gICAgXTtcbiAgICBjb25zdCBhbmltYXRpb25UaW1lID0geyBkdXJhdGlvbjogMTAwMCB9O1xuICAgIHRoaXMuYW5pbWF0ZWRFbGVtZW50ID0gZG9jdW1lbnQuYm9keS5hbmltYXRlKGFuaW1hdGlvbiwgYW5pbWF0aW9uVGltZSk7XG4gIH1cblxuICBkaXNhYmxlQnV0dG9uKHsgY3VycmVudFRhcmdldCB9KSB7XG4gICAgY29uc3QgYnV0dG9uID0gY3VycmVudFRhcmdldDtcbiAgICBidXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICB9XG5cbiAgZW5hYmxlQWxsQnV0dG9ucygpIHtcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5rZXlib2FyZC1jb250YWluZXJfX2J1dHRvblwiKTtcbiAgICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJCb2R5UGFydCgpIHtcbiAgICB0aGlzLmhhbmdtYW4uZHJhd0JvZHlQYXJ0KCk7XG4gIH1cblxuICBkaXNwbGF5R2FtZVN0YXR1cyA9IChpc1dpbm5lcikgPT4ge1xuICAgIGlmIChpc1dpbm5lcikge1xuICAgICAgdGhpcy5oYW5nbWFuLnJlbmRlcldpbm5lcigpO1xuICAgICAgdGhpcy5zaG93RGlzcGxheWVyKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dEaXNwbGF5ZXIoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBzaG93RGlzcGxheWVyID0gKGlzV2lubmVyKSA9PiB7XG4gICAgaWYgKGlzV2lubmVyKSB7XG4gICAgICB0aGlzLmRpc3BsYXkuY2xhc3NMaXN0LnRvZ2dsZShcImRpc3BsYXlfd2lubmVyXCIpO1xuICAgICAgdGhpcy5kaXNwbGF5V29yZHMudGV4dENvbnRlbnQgPSBcIkdvb2QgSm9iIVwiO1xuICAgICAgLy8gdGhpcy5iYWNrRHJvcC5jbGFzc0xpc3QudG9nZ2xlKFwiYmFja2Ryb3Bfb3BlblwiKTtcbiAgICAgIHRoaXMudG9nZ2xlQmFja0Ryb3AodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlzcGxheS5jbGFzc0xpc3QudG9nZ2xlKFwiZGlzcGxheV9sb3NlclwiKTtcbiAgICAgIHRoaXMuZGlzcGxheVdvcmRzLnRleHRDb250ZW50ID0gXCJUb28gQmFkIVwiO1xuICAgICAgLy8gdGhpcy5iYWNrRHJvcC5jbGFzc0xpc3QudG9nZ2xlKFwiYmFja2Ryb3Bfb3BlblwiKTtcbiAgICAgIHRoaXMudG9nZ2xlQmFja0Ryb3AodHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIHRvZ2dsZUJhY2tEcm9wKGlzR2FtZURvbmUpIHtcbiAgICBpZiAoaXNHYW1lRG9uZSkge1xuICAgICAgdGhpcy5iYWNrRHJvcC5jbGFzc0xpc3QudG9nZ2xlKFwiYmFja2Ryb3Bfb3BlblwiKTtcbiAgICAgIHRoaXMucmVzZXRCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcInJlc2V0LWJ1dHRvbl9mbGFzaFwiKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYmFja0Ryb3AuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYmFja2Ryb3Bfb3BlblwiKSkge1xuICAgICAgdGhpcy5iYWNrRHJvcC5jbGFzc0xpc3QudG9nZ2xlKFwiYmFja2Ryb3Bfb3BlblwiKTtcbiAgICAgIHRoaXMucmVzZXRCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcInJlc2V0LWJ1dHRvbl9mbGFzaFwiKTtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnRpbGVzLmZvckVhY2goKHRpbGUpID0+IHRoaXMudGlsZV9jb250YWluZXIucmVtb3ZlQ2hpbGQodGlsZSkpO1xuICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICB0aGlzLmFuaW1hdGVkRWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5kaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNwbGF5X2xvc2VyXCIpO1xuICAgIHRoaXMuZGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzcGxheV93aW5uZXJcIik7XG4gICAgdGhpcy5lbmFibGVBbGxCdXR0b25zKCk7XG4gICAgdGhpcy50b2dnbGVCYWNrRHJvcChmYWxzZSk7XG4gICAgdGhpcy5oYW5nbWFuLnJlc2V0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuaGFuZ21hbi5kcmF3KCk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IERpY3Rpb25hcnkgZnJvbSBcIi4vbW9kdWxlcy9EaWN0aW9uYXJ5XCI7XG5pbXBvcnQgTW9kZWwgZnJvbSBcIi4vbW9kdWxlcy9Nb2RlbFwiO1xuaW1wb3J0IEhhbmdtYW4gZnJvbSBcIi4vbW9kdWxlcy9IYW5nbWFuXCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi9tb2R1bGVzL1ZpZXdcIjtcbmltcG9ydCBDb250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZ2V0RWxlbWVudCB9IGZyb20gXCIuL21vZHVsZXMvSGVscGVyc1wiO1xuXG5jb25zdCBoYW5nbWFuID0gbmV3IEhhbmdtYW4oKVxuLy8gaGFuZ21hbi5kcmF3KClcbmNvbnN0IHZpZXcgPSBuZXcgVmlldyhoYW5nbWFuKVxuY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwoRGljdGlvbmFyeSlcbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcihtb2RlbCwgdmlldylcblxuY29udHJvbGxlci5pbml0KClcblxuLy8gY29uc3Qgd29yZCA9IG1vZGVsLmRpY3Rpb25hcnkuZmV0Y2hXb3JkKClcbi8vIGNvbnNvbGUubG9nKHdvcmQpO1xuLy8gdmlldy5hZGRMZXR0ZXJzKCdhJylcbi8vIHZpZXcuZmxhc2hSZWQoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==