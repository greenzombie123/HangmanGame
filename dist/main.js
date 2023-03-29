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
    console.log(newWord);
    this.view.createTiles(newWord);
  };

  checkletter(chosenLetter) {
    return this.model.letters.some((letter) => letter === chosenLetter);
  }

  checkWord(word) {
    console.log(word);
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
      this.view.printWord();
      this.view.flashGreen();
      this.checkWinner(true);
    } else {
      this.view.flashRed();
      this.view.renderBodyPart();
      this.checkLoser()
    }
  };

  checkWinner(isWordCorrect = false) {
    const { letters } = this.model;
    if (!letters.length || isWordCorrect) {
      this.model.setGameStatus(true);
    }
  }

  checkLoser() {
    const { numberOfMistakes, limitOfMistakes } = this.model;
    if (numberOfMistakes === limitOfMistakes) {
      this.model.setGameStatus(false);
    }
  }

  onGameStatusUpdated = (isWinner) => {
    this.view.displayGameStatus(isWinner)
  }

  startNewGame = () => {
    this.reset()
    this.model.init();
    this.view.init();
  }

  startFirstGame = () => {
    this.model.bindOnWordRetrieved(this.getWord);
    this.model.bindOnGameStatusUpdated(this.onGameStatusUpdated);
    this.view.bindOnTileButtonsClicked(this.guessLetter);
    this.view.bindOnWordButtonClicked(this.guessWord);
    this.view.init();
    this.model.init();

    this.view.changeGameButton()
    this.view.bindOnGameButtonClicked(this.startNewGame)
  }

  reset(){
    this.model.reset()
    this.view.reset()
  }

  init() {
    this.view.bindOnGameButtonClicked(this.startFirstGame)
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
    method: "GET",
    headers: {
      "X-Api-Key": "JuKv+yCXS1ZGMowd97AwEg==TByOU3LN70assN1k",
      "Content-Type": "application/json",
    },
  };

async function fetchWord() {
    
  try {
    const wordlist = ["word"];
    const num = Math.floor(Math.random() * wordlist.length);
    return wordlist[num];
    // let word = await fetch(
    //     "https://api.api-ninjas.com/v1/randomword",
    //     config
    // );
    // word = await word.json();
    // return word.word;
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
    this.numOfBodyParts = 0;
  }

  // h 300 w 600
  draw() {
    const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
    const ctx = canvas.getContext("2d");

    ctx.translate(150, 0);

    this.drawHanger();
  }

  drawBodyPart() {
    this.numOfBodyParts += 1;
    switch (this.numOfBodyParts) {
      case 1:
        this.animateHead()
        break;
      case 2:
        this.animateBody()
        break;
      case 3:
        this.animateLeftLeg()
        break;
      case 4:
        this.animateRightLeg()
        break;
      case 5:
        this.animateLeftArm()
        break;
      case 6:
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
      ctx.fillStyle = "blue";
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

  renderWinner(){
    const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
    const ctx = canvas.getContext("2d");

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
    console.log(this.letters);
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

  // Insert letters of word into letters prop
  setLetters() {
    for (let index = 0; index < this.word.length; index++) {
      this.letters.push(this.word.charAt(index));
    }
  }

  // Set number of mistakes
  setLimitofMistakes(number) {
    this.limitOfMistakes = number;
  }

  increaseNumOfMistakes() {
    this.numberOfMistakes += 1;
  }

  // Remove a letter from letters prop
  removeLetter(letter) {
    this.letters = this.letters.filter((item) => item !== letter);
    console.log(this.letters);
  }

  // Set value to gameStatus prop
  setGameStatus(status) {
    this.gameStatus = status;

    this.onGameStatusUpdated(this.gameStatus);
  }

  init() {
    this.setLimitofMistakes(6);
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
    this.gameButton = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)('start-button')
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

  bindOnGameButtonClicked = (handler) =>{
    this.gameButton.addEventListener("click", () => {
      handler();
    });
  }

  changeGameButton(){
    this.gameButton.textContent = "Reset"
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
      this.showDisplayer(true)
    } else {
      this.showDisplayer(false)
    }
  };

  showDisplayer = (isWinner) => {
    if (isWinner) {
      this.display.classList.toggle('display_winner')
      this.displayWords.textContent = "Good Job!"
    } else {
      this.display.classList.toggle('display_loser')
      this.displayWords.textContent = "Too Bad!"
    }
  };

  reset() {
    this.tiles.forEach((tile) => this.tile_container.removeChild(tile));
    this.tiles = [];
    this.animatedElement = null;
    this.display.classList.remove('display_loser')
    this.display.classList.remove('display_winner')
    this.hangman.reset()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksVUFBVTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksb0NBQW9DO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBLGlFQUFlO0FBQ2Y7QUFDQSxDQUFDLEVBQUM7O0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QnVDOztBQUV4QjtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixvREFBVTtBQUMvQjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixvREFBVTtBQUMvQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0RBQVU7QUFDL0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixvREFBVTtBQUMvQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuWkE7QUFDQSwwQ0FBMEMsUUFBUTtBQUNsRCx1Q0FBdUMsVUFBVTtBQUNqRDtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLFVBQVU7QUFDckQ7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1RBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3pFc0Q7O0FBRXZDO0FBQ2Y7QUFDQTtBQUNBLDBCQUEwQixvREFBVTtBQUNwQztBQUNBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCLHdCQUF3QixvREFBVTtBQUNsQyxzQkFBc0Isb0RBQVU7QUFDaEM7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0MsbUJBQW1CLHVEQUFhO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTs7QUFFQSxrQkFBa0IsZUFBZTtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDaEpBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ044QztBQUNWO0FBQ0k7QUFDTjtBQUNZO0FBQ2dCOztBQUU5RCxvQkFBb0Isd0RBQU87QUFDM0I7QUFDQSxpQkFBaUIscURBQUk7QUFDckIsa0JBQWtCLHNEQUFLLENBQUMsMkRBQVU7QUFDbEMsdUJBQXVCLDJEQUFVOztBQUVqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQiIsInNvdXJjZXMiOlsid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL0RpY3Rpb25hcnkuanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9IYW5nbWFuLmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvSGVscGVycy5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL01vZGVsLmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvVmlldy5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgdmlldykge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICB9XG5cbiAgZ2V0V29yZCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdXb3JkID0gdGhpcy5tb2RlbC5nZXRXb3JkKCk7XG4gICAgY29uc29sZS5sb2cobmV3V29yZCk7XG4gICAgdGhpcy52aWV3LmNyZWF0ZVRpbGVzKG5ld1dvcmQpO1xuICB9O1xuXG4gIGNoZWNrbGV0dGVyKGNob3NlbkxldHRlcikge1xuICAgIHJldHVybiB0aGlzLm1vZGVsLmxldHRlcnMuc29tZSgobGV0dGVyKSA9PiBsZXR0ZXIgPT09IGNob3NlbkxldHRlcik7XG4gIH1cblxuICBjaGVja1dvcmQod29yZCkge1xuICAgIGNvbnNvbGUubG9nKHdvcmQpO1xuICAgIHJldHVybiB0aGlzLm1vZGVsLndvcmQgPT09IHdvcmQudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIGd1ZXNzTGV0dGVyID0gKGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjdXJyZW50VGFyZ2V0OiB7IHRleHRDb250ZW50IH0sXG4gICAgfSA9IGU7XG4gICAgY29uc3QgbGV0dGVyID0gdGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAodGhpcy5jaGVja2xldHRlcihsZXR0ZXIpKSB7XG4gICAgICB0aGlzLm1vZGVsLnJlbW92ZUxldHRlcihsZXR0ZXIpO1xuICAgICAgdGhpcy52aWV3LmFkZExldHRlcnMobGV0dGVyKTtcbiAgICAgIHRoaXMudmlldy5mbGFzaEdyZWVuKCk7XG4gICAgICB0aGlzLmNoZWNrV2lubmVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlldy5mbGFzaFJlZCgpO1xuICAgICAgdGhpcy52aWV3LnJlbmRlckJvZHlQYXJ0KCk7XG4gICAgICB0aGlzLm1vZGVsLmluY3JlYXNlTnVtT2ZNaXN0YWtlcygpO1xuICAgICAgdGhpcy5jaGVja0xvc2VyKCk7XG4gICAgfVxuICB9O1xuXG4gIGd1ZXNzV29yZCA9ICh3b3JkKSA9PiB7XG4gICAgaWYgKHRoaXMuY2hlY2tXb3JkKHdvcmQpKSB7XG4gICAgICB0aGlzLnZpZXcucHJpbnRXb3JkKCk7XG4gICAgICB0aGlzLnZpZXcuZmxhc2hHcmVlbigpO1xuICAgICAgdGhpcy5jaGVja1dpbm5lcih0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWV3LmZsYXNoUmVkKCk7XG4gICAgICB0aGlzLnZpZXcucmVuZGVyQm9keVBhcnQoKTtcbiAgICAgIHRoaXMuY2hlY2tMb3NlcigpXG4gICAgfVxuICB9O1xuXG4gIGNoZWNrV2lubmVyKGlzV29yZENvcnJlY3QgPSBmYWxzZSkge1xuICAgIGNvbnN0IHsgbGV0dGVycyB9ID0gdGhpcy5tb2RlbDtcbiAgICBpZiAoIWxldHRlcnMubGVuZ3RoIHx8IGlzV29yZENvcnJlY3QpIHtcbiAgICAgIHRoaXMubW9kZWwuc2V0R2FtZVN0YXR1cyh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBjaGVja0xvc2VyKCkge1xuICAgIGNvbnN0IHsgbnVtYmVyT2ZNaXN0YWtlcywgbGltaXRPZk1pc3Rha2VzIH0gPSB0aGlzLm1vZGVsO1xuICAgIGlmIChudW1iZXJPZk1pc3Rha2VzID09PSBsaW1pdE9mTWlzdGFrZXMpIHtcbiAgICAgIHRoaXMubW9kZWwuc2V0R2FtZVN0YXR1cyhmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgb25HYW1lU3RhdHVzVXBkYXRlZCA9IChpc1dpbm5lcikgPT4ge1xuICAgIHRoaXMudmlldy5kaXNwbGF5R2FtZVN0YXR1cyhpc1dpbm5lcilcbiAgfVxuXG4gIHN0YXJ0TmV3R2FtZSA9ICgpID0+IHtcbiAgICB0aGlzLnJlc2V0KClcbiAgICB0aGlzLm1vZGVsLmluaXQoKTtcbiAgICB0aGlzLnZpZXcuaW5pdCgpO1xuICB9XG5cbiAgc3RhcnRGaXJzdEdhbWUgPSAoKSA9PiB7XG4gICAgdGhpcy5tb2RlbC5iaW5kT25Xb3JkUmV0cmlldmVkKHRoaXMuZ2V0V29yZCk7XG4gICAgdGhpcy5tb2RlbC5iaW5kT25HYW1lU3RhdHVzVXBkYXRlZCh0aGlzLm9uR2FtZVN0YXR1c1VwZGF0ZWQpO1xuICAgIHRoaXMudmlldy5iaW5kT25UaWxlQnV0dG9uc0NsaWNrZWQodGhpcy5ndWVzc0xldHRlcik7XG4gICAgdGhpcy52aWV3LmJpbmRPbldvcmRCdXR0b25DbGlja2VkKHRoaXMuZ3Vlc3NXb3JkKTtcbiAgICB0aGlzLnZpZXcuaW5pdCgpO1xuICAgIHRoaXMubW9kZWwuaW5pdCgpO1xuXG4gICAgdGhpcy52aWV3LmNoYW5nZUdhbWVCdXR0b24oKVxuICAgIHRoaXMudmlldy5iaW5kT25HYW1lQnV0dG9uQ2xpY2tlZCh0aGlzLnN0YXJ0TmV3R2FtZSlcbiAgfVxuXG4gIHJlc2V0KCl7XG4gICAgdGhpcy5tb2RlbC5yZXNldCgpXG4gICAgdGhpcy52aWV3LnJlc2V0KClcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy52aWV3LmJpbmRPbkdhbWVCdXR0b25DbGlja2VkKHRoaXMuc3RhcnRGaXJzdEdhbWUpXG4gIH1cbn1cbiIsIi8vIEdldCBhIHdvcmQgZnJvbSBBUEkuIFJldHVybiB3b3JkLlxuY29uc3QgY29uZmlnID0ge1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcIlgtQXBpLUtleVwiOiBcIkp1S3YreUNYUzFaR01vd2Q5N0F3RWc9PVRCeU9VM0xONzBhc3NOMWtcIixcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0sXG4gIH07XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoV29yZCgpIHtcbiAgICBcbiAgdHJ5IHtcbiAgICBjb25zdCB3b3JkbGlzdCA9IFtcIndvcmRcIl07XG4gICAgY29uc3QgbnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd29yZGxpc3QubGVuZ3RoKTtcbiAgICByZXR1cm4gd29yZGxpc3RbbnVtXTtcbiAgICAvLyBsZXQgd29yZCA9IGF3YWl0IGZldGNoKFxuICAgIC8vICAgICBcImh0dHBzOi8vYXBpLmFwaS1uaW5qYXMuY29tL3YxL3JhbmRvbXdvcmRcIixcbiAgICAvLyAgICAgY29uZmlnXG4gICAgLy8gKTtcbiAgICAvLyB3b3JkID0gYXdhaXQgd29yZC5qc29uKCk7XG4gICAgLy8gcmV0dXJuIHdvcmQud29yZDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBmZXRjaFdvcmQsXG59O1xuXG4vL0FQSSBKdUt2K3lDWFMxWkdNb3dkOTdBd0VnPT1UQnlPVTNMTjcwYXNzTjFrXG4iLCJpbXBvcnQgeyBnZXRFbGVtZW50IH0gZnJvbSBcIi4vSGVscGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYW5nbWFuIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5udW1PZkJvZHlQYXJ0cyA9IDA7XG4gIH1cblxuICAvLyBoIDMwMCB3IDYwMFxuICBkcmF3KCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGN0eC50cmFuc2xhdGUoMTUwLCAwKTtcblxuICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICB9XG5cbiAgZHJhd0JvZHlQYXJ0KCkge1xuICAgIHRoaXMubnVtT2ZCb2R5UGFydHMgKz0gMTtcbiAgICBzd2l0Y2ggKHRoaXMubnVtT2ZCb2R5UGFydHMpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdGhpcy5hbmltYXRlSGVhZCgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICB0aGlzLmFuaW1hdGVCb2R5KClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHRoaXMuYW5pbWF0ZUxlZnRMZWcoKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgdGhpcy5hbmltYXRlUmlnaHRMZWcoKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgdGhpcy5hbmltYXRlTGVmdEFybSgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA2OlxuICAgICAgICB0aGlzLmFuaW1hdGVSaWdodEFybSgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZHJhd0hhbmdlcigpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjb25zdCBoYW5nZXIgPSBuZXcgUGF0aDJEKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBoYW5nZXIubW92ZVRvKDEwLCAyOTApO1xuICAgIGhhbmdlci5saW5lVG8oMTEwLCAyOTApO1xuICAgIGhhbmdlci5saW5lVG8oMTEwLCAyNzApO1xuICAgIGhhbmdlci5saW5lVG8oNzAsIDI3MCk7XG4gICAgaGFuZ2VyLmxpbmVUbyg3MCwgNTApO1xuICAgIGhhbmdlci5saW5lVG8oMjIwLCA1MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygyMjAsIDgwKTtcbiAgICBoYW5nZXIubGluZVRvKDIzMCwgODApO1xuICAgIGhhbmdlci5saW5lVG8oMjMwLCA0MCk7XG4gICAgaGFuZ2VyLmxpbmVUbyg1MCwgNDApO1xuICAgIGhhbmdlci5saW5lVG8oNTAsIDI3MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygxMCwgMjcwKTtcbiAgICBjdHguZmlsbChoYW5nZXIpO1xuICB9XG5cbiAgYW5pbWF0ZUhlYWQoKSB7XG4gICAgbGV0IHN0YXJ0ID0gMzAxO1xuICAgIGNvbnN0IEVORCA9IDEwMjtcbiAgICAvLyA5OFxuXG4gICAgY29uc3QgZHJhdyA9ICh0aW1lKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuXG4gICAgICAvLyBIZWFkXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYygyMjUsIHN0YXJ0LCAyMCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oMjIwLCAxMDEpO1xuICAgICAgY3R4LmFyYygyMjUsIHN0YXJ0LCAxOCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oMjIwLCAxMDEpO1xuICAgICAgY3R4LmFyYygyMTYsIHN0YXJ0IC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4Lm1vdmVUbygyMzgsIDEwMSk7XG4gICAgICBjdHguYXJjKDIzMywgc3RhcnQgLSAzLCAzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguZmlsbCgpO1xuICAgICAgY3R4LmZpbGxSZWN0KDIxNSwgc3RhcnQgKyA3LCAyMCwgMyk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJIZWFkKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIEhlYWRcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKDIyNSwgMTAyLCAyMCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICBjdHguYXJjKDIyNSwgMTAyLCAxOCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICBjdHguYXJjKDIxNiwgMTAyIC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5tb3ZlVG8oMjM4LCAxMDEpO1xuICAgIGN0eC5hcmMoMjMzLCAxMDIgLSAzLCAzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguZmlsbFJlY3QoMjE1LCAxMDIgKyA3LCAyMCwgMyk7XG4gIH1cblxuICBhbmltYXRlQm9keSgpIHtcbiAgICBsZXQgc3RhcnQgPSAzMjE7XG4gICAgY29uc3QgRU5EID0gMTI1O1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgLy8gSGVhZFxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gICAgICB0aGlzLnJlbmRlckhlYWQoKTtcblxuICAgICAgY3R4LmZpbGxSZWN0KDIyMiwgc3RhcnQsIDUsIDUwKTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlckJvZHkoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gQm9keVxuXG4gICAgY3R4LmZpbGxSZWN0KDIyMiwgMTIwLCA1LCA1MCk7XG4gIH1cblxuICBhbmltYXRlTGVmdExlZygpIHtcbiAgICBsZXQgc3RhcnQgPSAyMjE7XG4gICAgY29uc3QgRU5EID0gLTExO1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gICAgICB0aGlzLnJlbmRlckhlYWQoKTtcbiAgICAgIHRoaXMucmVuZGVyQm9keSgpO1xuXG4gICAgICAvLyBMZWZ0IExlZ1xuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiA0NSk7XG4gICAgICBjdHguZmlsbFJlY3QoLTIyLCBzdGFydCwgNSwgNTApO1xuICAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlckxlZnRMZWcoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gTGVmdCBMZWdcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDQ1KTtcbiAgICBjdHguZmlsbFJlY3QoLTIyLCAtMjEsIDUsIDUwKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgYW5pbWF0ZVJpZ2h0TGVnKCkge1xuICAgIGxldCBzdGFydCA9IDIyMTtcbiAgICBjb25zdCBFTkQgPSAtMjc7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuICAgICAgdGhpcy5yZW5kZXJCb2R5KCk7XG4gICAgICB0aGlzLnJlbmRlckxlZnRMZWcoKTtcblxuICAgICAgLy8gTGVmdCBMZWdcbiAgICAgIGN0eC5zYXZlKCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibHVlXCI7XG4gICAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiAxMzUpO1xuICAgICAgY3R4LmZpbGxSZWN0KC0yMywgc3RhcnQsIDUsIDUwKTtcbiAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJSaWdodExlZygpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBSaWdodCBMZWdcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDEzNSk7XG4gICAgY3R4LmZpbGxSZWN0KC0yMywgLTI3LCA1LCA1MCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIGFuaW1hdGVMZWZ0QXJtKCkge1xuICAgIGxldCBzdGFydCA9IDMyMTtcbiAgICBjb25zdCBFTkQgPSAxNDA7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuICAgICAgdGhpcy5yZW5kZXJCb2R5KCk7XG4gICAgICB0aGlzLnJlbmRlckxlZnRMZWcoKTtcbiAgICAgIHRoaXMucmVuZGVyUmlnaHRMZWcoKTtcblxuICAgICAgLy8gTGVmdCBBcm1cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHguZmlsbFJlY3QoMTcxLCBzdGFydCwgNTAsIDUpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyTGVmdEFybSgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBMZWZ0IEFybVxuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LmZpbGxSZWN0KDE3MSwgMTMwLCA1MCwgNSk7XG4gIH1cblxuICBhbmltYXRlUmlnaHRBcm0oKSB7XG4gICAgbGV0IHN0YXJ0ID0gMzIxO1xuICAgIGNvbnN0IEVORCA9IDE0MDtcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG4gICAgICB0aGlzLnJlbmRlckJvZHkoKTtcbiAgICAgIHRoaXMucmVuZGVyTGVmdExlZygpO1xuICAgICAgdGhpcy5yZW5kZXJSaWdodExlZygpO1xuICAgICAgdGhpcy5yZW5kZXJMZWZ0QXJtKCk7XG5cbiAgICAgIC8vIFJpZ2h0IEFybVxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC5maWxsUmVjdCgyMjcsIHN0YXJ0LCA1MCwgNSk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJSaWdodEFybSgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBSaWdodCBBcm1cbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5maWxsUmVjdCgyMjcsIDE0MCwgNTAsIDUpO1xuICB9XG5cbiAgcmVuZGVyV2lubmVyKCl7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY3R4LnRyYW5zbGF0ZSgtMTAwLCAwKTtcblxuICAgIC8vIEhlYWRcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKDMyNSwgMjAyLCAyMCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICBjdHguYXJjKDMyNSwgMjAyLCAxOCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICBjdHguYXJjKDMxNiwgMjAyIC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5tb3ZlVG8oMjM4LCAxMDEpO1xuICAgIGN0eC5hcmMoMzMzLCAyMDIgLSAzLCAzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4Lm1vdmVUbygzMzMsIDIyMCk7XG4gICAgY3R4LmZpbGwoKTtcblxuICAgIC8vIFNtaWxlXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oMzE0LCAyMDUpO1xuICAgIGN0eC5hcmMoMzI0LCAyMDUsIDEwLCAwLCBNYXRoLlBJLCBmYWxzZSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgLy8gQm9keVxuXG4gICAgY3R4LmZpbGxSZWN0KDMyMiwgMjIwLCA1LCA1MCk7XG5cbiAgICAgLy8gTGVmdCBMZWdcbiAgICAgY3R4LnNhdmUoKTtcbiAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiA0NSk7XG4gICAgIGN0eC5maWxsUmVjdCgxMjAsIC0yMCwgNSwgNTApO1xuICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgIC8vIFJpZ2h0IExlZ1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogMTM1KTtcbiAgICBjdHguZmlsbFJlY3QoLTIzLCAtMTY5LCA1LCA1MCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcblxuICAgIC8vIExlZnQgQXJtXG4gICAgY3R4LnNhdmUoKTtcbiAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiA0NSk7XG4gICAgIGN0eC5maWxsUmVjdCgxMDAsIC05MCwgNSwgNTApO1xuICAgICBjdHgucmVzdG9yZSgpO1xuXG5cbiAgICAvLyBSaWdodCBBcm1cbiAgICBjdHguc2F2ZSgpO1xuICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDEzNSk7XG4gICAgIGN0eC5maWxsUmVjdCgtNDAsIC0xMDAsIDUsIDUwKTtcbiAgICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxufVxuIiwiZnVuY3Rpb24gY3JlYXRlRWxlbWVudChlbGVtZW50LCBjbGFzc05hbWUpe1xuICAgIGNvbnN0IGVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYCR7ZWxlbWVudH1gKVxuICAgIGlmKGNsYXNzTmFtZSkgZWxlLmNsYXNzTGlzdC5hZGQoYCR7Y2xhc3NOYW1lfWApXG4gICAgcmV0dXJuIGVsZVxufVxuXG5mdW5jdGlvbiBnZXRFbGVtZW50KGNsYXNzTmFtZSl7XG4gICAgY29uc3QgZWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lfWApXG4gICAgcmV0dXJuIGVsZVxufVxuXG5leHBvcnQge2NyZWF0ZUVsZW1lbnQsIGdldEVsZW1lbnR9IiwiLy8gaW1wb3J0IERpY3Rpb25hcnkgZnJvbSBcIi4vRGljdGlvbmFyeVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbCB7XG4gIGNvbnN0cnVjdG9yKGRpY3Rpb25hcnkpIHtcbiAgICB0aGlzLndvcmQgPSBudWxsO1xuICAgIHRoaXMubnVtYmVyT2ZNaXN0YWtlcyA9IDA7XG4gICAgdGhpcy5saW1pdE9mTWlzdGFrZXMgPSA2O1xuICAgIHRoaXMubGV0dGVycyA9IFtdO1xuICAgIHRoaXMuZ2FtZVN0YXR1cyA9IG51bGw7XG4gICAgdGhpcy5kaWN0aW9uYXJ5ID0gZGljdGlvbmFyeTtcbiAgfVxuXG4gIC8vIEdldCB3b3JkIGZyb20gQVBJIGFuZCBzZXQgdG8gd29yZCBwcm9wZXJ0eVxuICBhc3luYyBmZXRjaFdvcmQoKSB7XG4gICAgdGhpcy53b3JkID0gYXdhaXQgdGhpcy5kaWN0aW9uYXJ5LmZldGNoV29yZCgpO1xuICAgIHRoaXMuc2V0TGV0dGVycygpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubGV0dGVycyk7XG4gICAgdGhpcy5vbldvcmRSZXRyaWV2ZWQoKTtcbiAgfVxuXG4gIGdldFdvcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMud29yZDtcbiAgfVxuXG4gIGJpbmRPbldvcmRSZXRyaWV2ZWQoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uV29yZFJldHJpZXZlZCA9IGNhbGxiYWNrO1xuICB9XG5cbiAgYmluZE9uR2FtZVN0YXR1c1VwZGF0ZWQoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uR2FtZVN0YXR1c1VwZGF0ZWQgPSBjYWxsYmFjaztcbiAgfVxuXG4gIC8vIEluc2VydCBsZXR0ZXJzIG9mIHdvcmQgaW50byBsZXR0ZXJzIHByb3BcbiAgc2V0TGV0dGVycygpIHtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy53b3JkLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdGhpcy5sZXR0ZXJzLnB1c2godGhpcy53b3JkLmNoYXJBdChpbmRleCkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNldCBudW1iZXIgb2YgbWlzdGFrZXNcbiAgc2V0TGltaXRvZk1pc3Rha2VzKG51bWJlcikge1xuICAgIHRoaXMubGltaXRPZk1pc3Rha2VzID0gbnVtYmVyO1xuICB9XG5cbiAgaW5jcmVhc2VOdW1PZk1pc3Rha2VzKCkge1xuICAgIHRoaXMubnVtYmVyT2ZNaXN0YWtlcyArPSAxO1xuICB9XG5cbiAgLy8gUmVtb3ZlIGEgbGV0dGVyIGZyb20gbGV0dGVycyBwcm9wXG4gIHJlbW92ZUxldHRlcihsZXR0ZXIpIHtcbiAgICB0aGlzLmxldHRlcnMgPSB0aGlzLmxldHRlcnMuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBsZXR0ZXIpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubGV0dGVycyk7XG4gIH1cblxuICAvLyBTZXQgdmFsdWUgdG8gZ2FtZVN0YXR1cyBwcm9wXG4gIHNldEdhbWVTdGF0dXMoc3RhdHVzKSB7XG4gICAgdGhpcy5nYW1lU3RhdHVzID0gc3RhdHVzO1xuXG4gICAgdGhpcy5vbkdhbWVTdGF0dXNVcGRhdGVkKHRoaXMuZ2FtZVN0YXR1cyk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc2V0TGltaXRvZk1pc3Rha2VzKDYpO1xuICAgIHRoaXMuZmV0Y2hXb3JkKCk7XG4gIH1cblxuICAvLyBSZXNldHMgdmFsdWVzIG9mIHByb3BlcnRpZXMgb2YgbW9kZWxcbiAgcmVzZXQoKSB7XG4gICAgdGhpcy53b3JkID0gbnVsbDtcbiAgICB0aGlzLm51bWJlck9mTWlzdGFrZXMgPSBudWxsO1xuICAgIHRoaXMubGV0dGVycyA9IFtdO1xuICAgIHRoaXMuZ2FtZVN0YXR1cyA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGdldEVsZW1lbnQgfSBmcm9tIFwiLi9IZWxwZXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihoYW5nbWFuKSB7XG4gICAgdGhpcy5oYW5nbWFuID0gaGFuZ21hbjtcbiAgICB0aGlzLnRpbGVfY29udGFpbmVyID0gZ2V0RWxlbWVudChcInRpbGUtY29udGFpbmVyXCIpO1xuICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICB0aGlzLmFuaW1hdGVkRWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5kaXNwbGF5ID0gZ2V0RWxlbWVudChcImRpc3BsYXlcIik7XG4gICAgdGhpcy5kaXNwbGF5V29yZHMgPSBnZXRFbGVtZW50KFwiZGlzcGxheV9fd29yZHNcIik7XG4gICAgdGhpcy5nYW1lQnV0dG9uID0gZ2V0RWxlbWVudCgnc3RhcnQtYnV0dG9uJylcbiAgfVxuXG4gIC8vIEdldCBsZW5ndGggb2YgdGhlIHdvcmRcbiAgY3JlYXRlVGlsZXMod29yZCkge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB3b3JkLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgdGlsZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJ0aWxlLWNvbnRhaW5lcl9fdGlsZVwiKTtcbiAgICAgIHRpbGUuZGF0YXNldC5sZXR0ZXIgPSB3b3JkW2luZGV4XTtcbiAgICAgIHRoaXMudGlsZV9jb250YWluZXIuYXBwZW5kQ2hpbGQodGlsZSk7XG4gICAgICB0aGlzLnRpbGVzLnB1c2godGlsZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTGV0dGVycyhsZXR0ZXIpIHtcbiAgICB0aGlzLnRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgIGlmICh0aWxlLmRhdGFzZXQubGV0dGVyID09PSBsZXR0ZXIpIHRpbGUudGV4dENvbnRlbnQgPSBsZXR0ZXI7XG4gICAgfSk7XG4gIH1cblxuICBwcmludFdvcmQoKSB7XG4gICAgdGhpcy50aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICB0aWxlLnRleHRDb250ZW50ID0gdGlsZS5kYXRhc2V0LmxldHRlcjtcbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRPblRpbGVCdXR0b25zQ2xpY2tlZCA9IChoYW5kbGVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIua2V5Ym9hcmQtY29udGFpbmVyX19idXR0b25cIik7XG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaGFuZGxlcihlKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgYmluZE9uV29yZEJ1dHRvbkNsaWNrZWQgPSAoaGFuZGxlcikgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGdldEVsZW1lbnQoXCJndWVzcy1idXR0b25cIik7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmd1ZXNzLWlucHV0XCIpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaGFuZGxlcihpbnB1dC52YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgYmluZE9uR2FtZUJ1dHRvbkNsaWNrZWQgPSAoaGFuZGxlcikgPT57XG4gICAgdGhpcy5nYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBoYW5kbGVyKCk7XG4gICAgfSk7XG4gIH1cblxuICBjaGFuZ2VHYW1lQnV0dG9uKCl7XG4gICAgdGhpcy5nYW1lQnV0dG9uLnRleHRDb250ZW50ID0gXCJSZXNldFwiXG4gIH1cblxuICBmbGFzaFJlZCgpIHtcbiAgICBpZiAodGhpcy5hbmltYXRlZEVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmFuaW1hdGVkRWxlbWVudC5jdXJyZW50VGltZSkgdGhpcy5hbmltYXRlZEVsZW1lbnQuY2FuY2VsKCk7XG4gICAgfVxuICAgIGNvbnN0IGFuaW1hdGlvbiA9IFtcbiAgICAgIHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LCAwLCAwLCAwLjM0NilcIixcbiAgICAgIH0sXG5cbiAgICAgIHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCIsXG4gICAgICB9LFxuICAgIF07XG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IHsgZHVyYXRpb246IDEwMDAgfTtcbiAgICB0aGlzLmFuaW1hdGVkRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuYW5pbWF0ZShhbmltYXRpb24sIGFuaW1hdGlvblRpbWUpO1xuICB9XG5cbiAgZmxhc2hHcmVlbigpIHtcbiAgICBpZiAodGhpcy5hbmltYXRlZEVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmFuaW1hdGVkRWxlbWVudC5jdXJyZW50VGltZSkgdGhpcy5hbmltYXRlZEVsZW1lbnQuY2FuY2VsKCk7XG4gICAgfVxuICAgIGNvbnN0IGFuaW1hdGlvbiA9IFtcbiAgICAgIHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMiwgMjE0LCAyLCAwLjUzMylcIixcbiAgICAgIH0sXG5cbiAgICAgIHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCIsXG4gICAgICB9LFxuICAgIF07XG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IHsgZHVyYXRpb246IDEwMDAgfTtcbiAgICB0aGlzLmFuaW1hdGVkRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuYW5pbWF0ZShhbmltYXRpb24sIGFuaW1hdGlvblRpbWUpO1xuICB9XG5cbiAgZGlzYWJsZUJ1dHRvbih7IGN1cnJlbnRUYXJnZXQgfSkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGN1cnJlbnRUYXJnZXQ7XG4gICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGVuYWJsZUFsbEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIua2V5Ym9hcmQtY29udGFpbmVyX19idXR0b25cIik7XG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyQm9keVBhcnQoKSB7XG4gICAgdGhpcy5oYW5nbWFuLmRyYXdCb2R5UGFydCgpO1xuICB9XG5cbiAgZGlzcGxheUdhbWVTdGF0dXMgPSAoaXNXaW5uZXIpID0+IHtcbiAgICBpZiAoaXNXaW5uZXIpIHtcbiAgICAgIHRoaXMuaGFuZ21hbi5yZW5kZXJXaW5uZXIoKTtcbiAgICAgIHRoaXMuc2hvd0Rpc3BsYXllcih0cnVlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dEaXNwbGF5ZXIoZmFsc2UpXG4gICAgfVxuICB9O1xuXG4gIHNob3dEaXNwbGF5ZXIgPSAoaXNXaW5uZXIpID0+IHtcbiAgICBpZiAoaXNXaW5uZXIpIHtcbiAgICAgIHRoaXMuZGlzcGxheS5jbGFzc0xpc3QudG9nZ2xlKCdkaXNwbGF5X3dpbm5lcicpXG4gICAgICB0aGlzLmRpc3BsYXlXb3Jkcy50ZXh0Q29udGVudCA9IFwiR29vZCBKb2IhXCJcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNwbGF5LmNsYXNzTGlzdC50b2dnbGUoJ2Rpc3BsYXlfbG9zZXInKVxuICAgICAgdGhpcy5kaXNwbGF5V29yZHMudGV4dENvbnRlbnQgPSBcIlRvbyBCYWQhXCJcbiAgICB9XG4gIH07XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy50aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB0aGlzLnRpbGVfY29udGFpbmVyLnJlbW92ZUNoaWxkKHRpbGUpKTtcbiAgICB0aGlzLnRpbGVzID0gW107XG4gICAgdGhpcy5hbmltYXRlZEVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuZGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5X2xvc2VyJylcbiAgICB0aGlzLmRpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheV93aW5uZXInKVxuICAgIHRoaXMuaGFuZ21hbi5yZXNldCgpXG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuaGFuZ21hbi5kcmF3KCk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IERpY3Rpb25hcnkgZnJvbSBcIi4vbW9kdWxlcy9EaWN0aW9uYXJ5XCI7XG5pbXBvcnQgTW9kZWwgZnJvbSBcIi4vbW9kdWxlcy9Nb2RlbFwiO1xuaW1wb3J0IEhhbmdtYW4gZnJvbSBcIi4vbW9kdWxlcy9IYW5nbWFuXCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi9tb2R1bGVzL1ZpZXdcIjtcbmltcG9ydCBDb250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZ2V0RWxlbWVudCB9IGZyb20gXCIuL21vZHVsZXMvSGVscGVyc1wiO1xuXG5jb25zdCBoYW5nbWFuID0gbmV3IEhhbmdtYW4oKVxuLy8gaGFuZ21hbi5kcmF3KClcbmNvbnN0IHZpZXcgPSBuZXcgVmlldyhoYW5nbWFuKVxuY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwoRGljdGlvbmFyeSlcbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcihtb2RlbCwgdmlldylcblxuY29udHJvbGxlci5pbml0KClcblxuLy8gY29uc3Qgd29yZCA9IG1vZGVsLmRpY3Rpb25hcnkuZmV0Y2hXb3JkKClcbi8vIGNvbnNvbGUubG9nKHdvcmQpO1xuLy8gdmlldy5hZGRMZXR0ZXJzKCdhJylcbi8vIHZpZXcuZmxhc2hSZWQoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==