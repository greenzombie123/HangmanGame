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
    } else {
      this.view.flashRed();
      this.view.renderBodyPart();
    }
  };

  checkWinner(isWordCorrect = false) {
    const { letters } = this.model;
    if (!letters.length || isWordCorrect) {
      this.model.setGameStatus("Winner");
    }
  }

  checkLoser() {
    const { numberOfMistakes, limitOfMistakes } = this.model;
    console.log(numberOfMistakes, limitOfMistakes);
    if (numberOfMistakes === limitOfMistakes) {
      this.model.setGameStatus("Loser");
    }
  }

  onGameStatusUpdated = (isWinner) => {
    this.view.displayGameStatus(isWinner)
  }

  startNewGame() {}

  init() {
    this.model.bindOnWordRetrieved(this.getWord);
    this.model.bindOnGameStatusUpdated(this.onGameStatusUpdated);
    this.view.bindOnTileButtonsClicked(this.guessLetter);
    this.view.bindOnWordButtonClicked(this.guessWord);
    this.view.init();
    this.model.init();
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
    const wordlist = ["word", "apple", "dictionary"];
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

    ctx.clearRect(0, 0, 300, 600)

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

    this.onGameStatusUpdated(this.gameStatus)
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
      this.showDisplayer(isWinner)
    } else {
      this.showDisplayer(isWinner)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxvQ0FBb0M7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7QUFDZjtBQUNBLENBQUMsRUFBQzs7QUFFRjs7Ozs7Ozs7Ozs7Ozs7OztBQzlCdUM7O0FBRXhCO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixvREFBVTtBQUMvQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0RBQVU7QUFDL0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDcElBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ044QztBQUNWO0FBQ0k7QUFDTjtBQUNZO0FBQ2dCOztBQUU5RCxvQkFBb0Isd0RBQU87QUFDM0I7QUFDQSxpQkFBaUIscURBQUk7QUFDckIsa0JBQWtCLHNEQUFLLENBQUMsMkRBQVU7QUFDbEMsdUJBQXVCLDJEQUFVOztBQUVqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQiIsInNvdXJjZXMiOlsid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL0RpY3Rpb25hcnkuanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9IYW5nbWFuLmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvSGVscGVycy5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL01vZGVsLmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvVmlldy5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgdmlldykge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICB9XG5cbiAgZ2V0V29yZCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdXb3JkID0gdGhpcy5tb2RlbC5nZXRXb3JkKCk7XG4gICAgY29uc29sZS5sb2cobmV3V29yZCk7XG4gICAgdGhpcy52aWV3LmNyZWF0ZVRpbGVzKG5ld1dvcmQpO1xuICB9O1xuXG4gIGNoZWNrbGV0dGVyKGNob3NlbkxldHRlcikge1xuICAgIHJldHVybiB0aGlzLm1vZGVsLmxldHRlcnMuc29tZSgobGV0dGVyKSA9PiBsZXR0ZXIgPT09IGNob3NlbkxldHRlcik7XG4gIH1cblxuICBjaGVja1dvcmQod29yZCkge1xuICAgIGNvbnNvbGUubG9nKHdvcmQpO1xuICAgIHJldHVybiB0aGlzLm1vZGVsLndvcmQgPT09IHdvcmQudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIGd1ZXNzTGV0dGVyID0gKGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjdXJyZW50VGFyZ2V0OiB7IHRleHRDb250ZW50IH0sXG4gICAgfSA9IGU7XG4gICAgY29uc3QgbGV0dGVyID0gdGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAodGhpcy5jaGVja2xldHRlcihsZXR0ZXIpKSB7XG4gICAgICB0aGlzLm1vZGVsLnJlbW92ZUxldHRlcihsZXR0ZXIpO1xuICAgICAgdGhpcy52aWV3LmFkZExldHRlcnMobGV0dGVyKTtcbiAgICAgIHRoaXMudmlldy5mbGFzaEdyZWVuKCk7XG4gICAgICB0aGlzLmNoZWNrV2lubmVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlldy5mbGFzaFJlZCgpO1xuICAgICAgdGhpcy52aWV3LnJlbmRlckJvZHlQYXJ0KCk7XG4gICAgICB0aGlzLm1vZGVsLmluY3JlYXNlTnVtT2ZNaXN0YWtlcygpO1xuICAgICAgdGhpcy5jaGVja0xvc2VyKCk7XG4gICAgfVxuICB9O1xuXG4gIGd1ZXNzV29yZCA9ICh3b3JkKSA9PiB7XG4gICAgaWYgKHRoaXMuY2hlY2tXb3JkKHdvcmQpKSB7XG4gICAgICB0aGlzLnZpZXcucHJpbnRXb3JkKCk7XG4gICAgICB0aGlzLnZpZXcuZmxhc2hHcmVlbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXcuZmxhc2hSZWQoKTtcbiAgICAgIHRoaXMudmlldy5yZW5kZXJCb2R5UGFydCgpO1xuICAgIH1cbiAgfTtcblxuICBjaGVja1dpbm5lcihpc1dvcmRDb3JyZWN0ID0gZmFsc2UpIHtcbiAgICBjb25zdCB7IGxldHRlcnMgfSA9IHRoaXMubW9kZWw7XG4gICAgaWYgKCFsZXR0ZXJzLmxlbmd0aCB8fCBpc1dvcmRDb3JyZWN0KSB7XG4gICAgICB0aGlzLm1vZGVsLnNldEdhbWVTdGF0dXMoXCJXaW5uZXJcIik7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tMb3NlcigpIHtcbiAgICBjb25zdCB7IG51bWJlck9mTWlzdGFrZXMsIGxpbWl0T2ZNaXN0YWtlcyB9ID0gdGhpcy5tb2RlbDtcbiAgICBjb25zb2xlLmxvZyhudW1iZXJPZk1pc3Rha2VzLCBsaW1pdE9mTWlzdGFrZXMpO1xuICAgIGlmIChudW1iZXJPZk1pc3Rha2VzID09PSBsaW1pdE9mTWlzdGFrZXMpIHtcbiAgICAgIHRoaXMubW9kZWwuc2V0R2FtZVN0YXR1cyhcIkxvc2VyXCIpO1xuICAgIH1cbiAgfVxuXG4gIG9uR2FtZVN0YXR1c1VwZGF0ZWQgPSAoaXNXaW5uZXIpID0+IHtcbiAgICB0aGlzLnZpZXcuZGlzcGxheUdhbWVTdGF0dXMoaXNXaW5uZXIpXG4gIH1cblxuICBzdGFydE5ld0dhbWUoKSB7fVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5tb2RlbC5iaW5kT25Xb3JkUmV0cmlldmVkKHRoaXMuZ2V0V29yZCk7XG4gICAgdGhpcy5tb2RlbC5iaW5kT25HYW1lU3RhdHVzVXBkYXRlZCh0aGlzLm9uR2FtZVN0YXR1c1VwZGF0ZWQpO1xuICAgIHRoaXMudmlldy5iaW5kT25UaWxlQnV0dG9uc0NsaWNrZWQodGhpcy5ndWVzc0xldHRlcik7XG4gICAgdGhpcy52aWV3LmJpbmRPbldvcmRCdXR0b25DbGlja2VkKHRoaXMuZ3Vlc3NXb3JkKTtcbiAgICB0aGlzLnZpZXcuaW5pdCgpO1xuICAgIHRoaXMubW9kZWwuaW5pdCgpO1xuICB9XG59XG4iLCIvLyBHZXQgYSB3b3JkIGZyb20gQVBJLiBSZXR1cm4gd29yZC5cbmNvbnN0IGNvbmZpZyA9IHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVyczoge1xuICAgICAgXCJYLUFwaS1LZXlcIjogXCJKdUt2K3lDWFMxWkdNb3dkOTdBd0VnPT1UQnlPVTNMTjcwYXNzTjFrXCIsXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB9LFxuICB9O1xuXG5hc3luYyBmdW5jdGlvbiBmZXRjaFdvcmQoKSB7XG4gICAgXG4gIHRyeSB7XG4gICAgY29uc3Qgd29yZGxpc3QgPSBbXCJ3b3JkXCIsIFwiYXBwbGVcIiwgXCJkaWN0aW9uYXJ5XCJdO1xuICAgIGNvbnN0IG51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdvcmRsaXN0Lmxlbmd0aCk7XG4gICAgcmV0dXJuIHdvcmRsaXN0W251bV07XG4gICAgLy8gbGV0IHdvcmQgPSBhd2FpdCBmZXRjaChcbiAgICAvLyAgICAgXCJodHRwczovL2FwaS5hcGktbmluamFzLmNvbS92MS9yYW5kb213b3JkXCIsXG4gICAgLy8gICAgIGNvbmZpZ1xuICAgIC8vICk7XG4gICAgLy8gd29yZCA9IGF3YWl0IHdvcmQuanNvbigpO1xuICAgIC8vIHJldHVybiB3b3JkLndvcmQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZmV0Y2hXb3JkLFxufTtcblxuLy9BUEkgSnVLdit5Q1hTMVpHTW93ZDk3QXdFZz09VEJ5T1UzTE43MGFzc04xa1xuIiwiaW1wb3J0IHsgZ2V0RWxlbWVudCB9IGZyb20gXCIuL0hlbHBlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFuZ21hbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubnVtT2ZCb2R5UGFydHMgPSAwO1xuICB9XG5cbiAgLy8gaCAzMDAgdyA2MDBcbiAgZHJhdygpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjdHgudHJhbnNsYXRlKDE1MCwgMCk7XG5cbiAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgfVxuXG4gIGRyYXdCb2R5UGFydCgpIHtcbiAgICB0aGlzLm51bU9mQm9keVBhcnRzICs9IDE7XG4gICAgc3dpdGNoICh0aGlzLm51bU9mQm9keVBhcnRzKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHRoaXMuYW5pbWF0ZUhlYWQoKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgdGhpcy5hbmltYXRlQm9keSgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB0aGlzLmFuaW1hdGVMZWZ0TGVnKClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHRoaXMuYW5pbWF0ZVJpZ2h0TGVnKClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDU6XG4gICAgICAgIHRoaXMuYW5pbWF0ZUxlZnRBcm0oKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgdGhpcy5hbmltYXRlUmlnaHRBcm0oKVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGRyYXdIYW5nZXIoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY29uc3QgaGFuZ2VyID0gbmV3IFBhdGgyRCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgaGFuZ2VyLm1vdmVUbygxMCwgMjkwKTtcbiAgICBoYW5nZXIubGluZVRvKDExMCwgMjkwKTtcbiAgICBoYW5nZXIubGluZVRvKDExMCwgMjcwKTtcbiAgICBoYW5nZXIubGluZVRvKDcwLCAyNzApO1xuICAgIGhhbmdlci5saW5lVG8oNzAsIDUwKTtcbiAgICBoYW5nZXIubGluZVRvKDIyMCwgNTApO1xuICAgIGhhbmdlci5saW5lVG8oMjIwLCA4MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygyMzAsIDgwKTtcbiAgICBoYW5nZXIubGluZVRvKDIzMCwgNDApO1xuICAgIGhhbmdlci5saW5lVG8oNTAsIDQwKTtcbiAgICBoYW5nZXIubGluZVRvKDUwLCAyNzApO1xuICAgIGhhbmdlci5saW5lVG8oMTAsIDI3MCk7XG4gICAgY3R4LmZpbGwoaGFuZ2VyKTtcbiAgfVxuXG4gIGFuaW1hdGVIZWFkKCkge1xuICAgIGxldCBzdGFydCA9IDMwMTtcbiAgICBjb25zdCBFTkQgPSAxMDI7XG4gICAgLy8gOThcblxuICAgIGNvbnN0IGRyYXcgPSAodGltZSkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcblxuICAgICAgLy8gSGVhZFxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5hcmMoMjI1LCBzdGFydCwgMjAsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICAgIGN0eC5hcmMoMjI1LCBzdGFydCwgMTgsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICAgIGN0eC5hcmMoMjE2LCBzdGFydCAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5tb3ZlVG8oMjM4LCAxMDEpO1xuICAgICAgY3R4LmFyYygyMzMsIHN0YXJ0IC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIGN0eC5maWxsUmVjdCgyMTUsIHN0YXJ0ICsgNywgMjAsIDMpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVySGVhZCgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBIZWFkXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYygyMjUsIDEwMiwgMjAsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgY3R4LmFyYygyMjUsIDEwMiwgMTgsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgY3R4LmFyYygyMTYsIDEwMiAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHgubW92ZVRvKDIzOCwgMTAxKTtcbiAgICBjdHguYXJjKDIzMywgMTAyIC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LmZpbGxSZWN0KDIxNSwgMTAyICsgNywgMjAsIDMpO1xuICB9XG5cbiAgYW5pbWF0ZUJvZHkoKSB7XG4gICAgbGV0IHN0YXJ0ID0gMzIxO1xuICAgIGNvbnN0IEVORCA9IDEyNTtcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIC8vIEhlYWRcbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG5cbiAgICAgIGN0eC5maWxsUmVjdCgyMjIsIHN0YXJ0LCA1LCA1MCk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJCb2R5KCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIEJvZHlcblxuICAgIGN0eC5maWxsUmVjdCgyMjIsIDEyMCwgNSwgNTApO1xuICB9XG5cbiAgYW5pbWF0ZUxlZnRMZWcoKSB7XG4gICAgbGV0IHN0YXJ0ID0gMjIxO1xuICAgIGNvbnN0IEVORCA9IC0xMTtcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG4gICAgICB0aGlzLnJlbmRlckJvZHkoKTtcblxuICAgICAgLy8gTGVmdCBMZWdcbiAgICAgIGN0eC5zYXZlKCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogNDUpO1xuICAgICAgY3R4LmZpbGxSZWN0KC0yMiwgc3RhcnQsIDUsIDUwKTtcbiAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJMZWZ0TGVnKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIExlZnQgTGVnXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiA0NSk7XG4gICAgY3R4LmZpbGxSZWN0KC0yMiwgLTIxLCA1LCA1MCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIGFuaW1hdGVSaWdodExlZygpIHtcbiAgICBsZXQgc3RhcnQgPSAyMjE7XG4gICAgY29uc3QgRU5EID0gLTI3O1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gICAgICB0aGlzLnJlbmRlckhlYWQoKTtcbiAgICAgIHRoaXMucmVuZGVyQm9keSgpO1xuICAgICAgdGhpcy5yZW5kZXJMZWZ0TGVnKCk7XG5cbiAgICAgIC8vIExlZnQgTGVnXG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmx1ZVwiO1xuICAgICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogMTM1KTtcbiAgICAgIGN0eC5maWxsUmVjdCgtMjMsIHN0YXJ0LCA1LCA1MCk7XG4gICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyUmlnaHRMZWcoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gUmlnaHQgTGVnXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiAxMzUpO1xuICAgIGN0eC5maWxsUmVjdCgtMjMsIC0yNywgNSwgNTApO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBhbmltYXRlTGVmdEFybSgpIHtcbiAgICBsZXQgc3RhcnQgPSAzMjE7XG4gICAgY29uc3QgRU5EID0gMTQwO1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gICAgICB0aGlzLnJlbmRlckhlYWQoKTtcbiAgICAgIHRoaXMucmVuZGVyQm9keSgpO1xuICAgICAgdGhpcy5yZW5kZXJMZWZ0TGVnKCk7XG4gICAgICB0aGlzLnJlbmRlclJpZ2h0TGVnKCk7XG5cbiAgICAgIC8vIExlZnQgQXJtXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LmZpbGxSZWN0KDE3MSwgc3RhcnQsIDUwLCA1KTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlckxlZnRBcm0oKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gTGVmdCBBcm1cbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5maWxsUmVjdCgxNzEsIDEzMCwgNTAsIDUpO1xuICB9XG5cbiAgYW5pbWF0ZVJpZ2h0QXJtKCkge1xuICAgIGxldCBzdGFydCA9IDMyMTtcbiAgICBjb25zdCBFTkQgPSAxNDA7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuICAgICAgdGhpcy5yZW5kZXJCb2R5KCk7XG4gICAgICB0aGlzLnJlbmRlckxlZnRMZWcoKTtcbiAgICAgIHRoaXMucmVuZGVyUmlnaHRMZWcoKTtcbiAgICAgIHRoaXMucmVuZGVyTGVmdEFybSgpO1xuXG4gICAgICAvLyBSaWdodCBBcm1cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHguZmlsbFJlY3QoMjI3LCBzdGFydCwgNTAsIDUpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyUmlnaHRBcm0oKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gUmlnaHQgQXJtXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguZmlsbFJlY3QoMjI3LCAxNDAsIDUwLCA1KTtcbiAgfVxuXG4gIHJlbmRlcldpbm5lcigpe1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApXG5cbiAgICB0aGlzLmRyYXdIYW5nZXIoKVxuXG4gICAgY3R4LnRyYW5zbGF0ZSgtMTAwLCAwKTtcblxuICAgIC8vIEhlYWRcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKDMyNSwgMjAyLCAyMCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICBjdHguYXJjKDMyNSwgMjAyLCAxOCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICBjdHguYXJjKDMxNiwgMjAyIC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5tb3ZlVG8oMjM4LCAxMDEpO1xuICAgIGN0eC5hcmMoMzMzLCAyMDIgLSAzLCAzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4Lm1vdmVUbygzMzMsIDIyMCk7XG4gICAgY3R4LmZpbGwoKTtcblxuICAgIC8vIFNtaWxlXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oMzE0LCAyMDUpO1xuICAgIGN0eC5hcmMoMzI0LCAyMDUsIDEwLCAwLCBNYXRoLlBJLCBmYWxzZSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgLy8gQm9keVxuXG4gICAgY3R4LmZpbGxSZWN0KDMyMiwgMjIwLCA1LCA1MCk7XG5cbiAgICAgLy8gTGVmdCBMZWdcbiAgICAgY3R4LnNhdmUoKTtcbiAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiA0NSk7XG4gICAgIGN0eC5maWxsUmVjdCgxMjAsIC0yMCwgNSwgNTApO1xuICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgIC8vIFJpZ2h0IExlZ1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogMTM1KTtcbiAgICBjdHguZmlsbFJlY3QoLTIzLCAtMTY5LCA1LCA1MCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcblxuICAgIC8vIExlZnQgQXJtXG4gICAgY3R4LnNhdmUoKTtcbiAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiA0NSk7XG4gICAgIGN0eC5maWxsUmVjdCgxMDAsIC05MCwgNSwgNTApO1xuICAgICBjdHgucmVzdG9yZSgpO1xuXG5cbiAgICAvLyBSaWdodCBBcm1cbiAgICBjdHguc2F2ZSgpO1xuICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDEzNSk7XG4gICAgIGN0eC5maWxsUmVjdCgtNDAsIC0xMDAsIDUsIDUwKTtcbiAgICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxufVxuIiwiZnVuY3Rpb24gY3JlYXRlRWxlbWVudChlbGVtZW50LCBjbGFzc05hbWUpe1xuICAgIGNvbnN0IGVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYCR7ZWxlbWVudH1gKVxuICAgIGlmKGNsYXNzTmFtZSkgZWxlLmNsYXNzTGlzdC5hZGQoYCR7Y2xhc3NOYW1lfWApXG4gICAgcmV0dXJuIGVsZVxufVxuXG5mdW5jdGlvbiBnZXRFbGVtZW50KGNsYXNzTmFtZSl7XG4gICAgY29uc3QgZWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lfWApXG4gICAgcmV0dXJuIGVsZVxufVxuXG5leHBvcnQge2NyZWF0ZUVsZW1lbnQsIGdldEVsZW1lbnR9IiwiLy8gaW1wb3J0IERpY3Rpb25hcnkgZnJvbSBcIi4vRGljdGlvbmFyeVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbCB7XG4gIGNvbnN0cnVjdG9yKGRpY3Rpb25hcnkpIHtcbiAgICB0aGlzLndvcmQgPSBudWxsO1xuICAgIHRoaXMubnVtYmVyT2ZNaXN0YWtlcyA9IDA7XG4gICAgdGhpcy5saW1pdE9mTWlzdGFrZXMgPSA2O1xuICAgIHRoaXMubGV0dGVycyA9IFtdO1xuICAgIHRoaXMuZ2FtZVN0YXR1cyA9IG51bGw7XG4gICAgdGhpcy5kaWN0aW9uYXJ5ID0gZGljdGlvbmFyeTtcbiAgfVxuXG4gIC8vIEdldCB3b3JkIGZyb20gQVBJIGFuZCBzZXQgdG8gd29yZCBwcm9wZXJ0eVxuICBhc3luYyBmZXRjaFdvcmQoKSB7XG4gICAgdGhpcy53b3JkID0gYXdhaXQgdGhpcy5kaWN0aW9uYXJ5LmZldGNoV29yZCgpO1xuICAgIHRoaXMuc2V0TGV0dGVycygpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubGV0dGVycyk7XG4gICAgdGhpcy5vbldvcmRSZXRyaWV2ZWQoKTtcbiAgfVxuXG4gIGdldFdvcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMud29yZDtcbiAgfVxuXG4gIGJpbmRPbldvcmRSZXRyaWV2ZWQoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uV29yZFJldHJpZXZlZCA9IGNhbGxiYWNrO1xuICB9XG5cbiAgYmluZE9uR2FtZVN0YXR1c1VwZGF0ZWQoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uR2FtZVN0YXR1c1VwZGF0ZWQgPSBjYWxsYmFjaztcbiAgfVxuXG4gIC8vIEluc2VydCBsZXR0ZXJzIG9mIHdvcmQgaW50byBsZXR0ZXJzIHByb3BcbiAgc2V0TGV0dGVycygpIHtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy53b3JkLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdGhpcy5sZXR0ZXJzLnB1c2godGhpcy53b3JkLmNoYXJBdChpbmRleCkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNldCBudW1iZXIgb2YgbWlzdGFrZXNcbiAgc2V0TGltaXRvZk1pc3Rha2VzKG51bWJlcikge1xuICAgIHRoaXMubGltaXRPZk1pc3Rha2VzID0gbnVtYmVyO1xuICB9XG5cbiAgaW5jcmVhc2VOdW1PZk1pc3Rha2VzKCkge1xuICAgIHRoaXMubnVtYmVyT2ZNaXN0YWtlcyArPSAxO1xuICB9XG5cbiAgLy8gUmVtb3ZlIGEgbGV0dGVyIGZyb20gbGV0dGVycyBwcm9wXG4gIHJlbW92ZUxldHRlcihsZXR0ZXIpIHtcbiAgICB0aGlzLmxldHRlcnMgPSB0aGlzLmxldHRlcnMuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBsZXR0ZXIpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubGV0dGVycyk7XG4gIH1cblxuICAvLyBTZXQgdmFsdWUgdG8gZ2FtZVN0YXR1cyBwcm9wXG4gIHNldEdhbWVTdGF0dXMoc3RhdHVzKSB7XG4gICAgdGhpcy5nYW1lU3RhdHVzID0gc3RhdHVzO1xuXG4gICAgdGhpcy5vbkdhbWVTdGF0dXNVcGRhdGVkKHRoaXMuZ2FtZVN0YXR1cylcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zZXRMaW1pdG9mTWlzdGFrZXMoNik7XG4gICAgdGhpcy5mZXRjaFdvcmQoKTtcbiAgfVxuXG4gIC8vIFJlc2V0cyB2YWx1ZXMgb2YgcHJvcGVydGllcyBvZiBtb2RlbFxuICByZXNldCgpIHtcbiAgICB0aGlzLndvcmQgPSBudWxsO1xuICAgIHRoaXMubnVtYmVyT2ZNaXN0YWtlcyA9IG51bGw7XG4gICAgdGhpcy5sZXR0ZXJzID0gW107XG4gICAgdGhpcy5nYW1lU3RhdHVzID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZ2V0RWxlbWVudCB9IGZyb20gXCIuL0hlbHBlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG4gIGNvbnN0cnVjdG9yKGhhbmdtYW4pIHtcbiAgICB0aGlzLmhhbmdtYW4gPSBoYW5nbWFuO1xuICAgIHRoaXMudGlsZV9jb250YWluZXIgPSBnZXRFbGVtZW50KFwidGlsZS1jb250YWluZXJcIik7XG4gICAgdGhpcy50aWxlcyA9IFtdO1xuICAgIHRoaXMuYW5pbWF0ZWRFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLmRpc3BsYXkgPSBnZXRFbGVtZW50KFwiZGlzcGxheVwiKTtcbiAgICB0aGlzLmRpc3BsYXlXb3JkcyA9IGdldEVsZW1lbnQoXCJkaXNwbGF5X193b3Jkc1wiKTtcbiAgfVxuXG4gIC8vIEdldCBsZW5ndGggb2YgdGhlIHdvcmRcbiAgY3JlYXRlVGlsZXMod29yZCkge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB3b3JkLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgdGlsZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJ0aWxlLWNvbnRhaW5lcl9fdGlsZVwiKTtcbiAgICAgIHRpbGUuZGF0YXNldC5sZXR0ZXIgPSB3b3JkW2luZGV4XTtcbiAgICAgIHRoaXMudGlsZV9jb250YWluZXIuYXBwZW5kQ2hpbGQodGlsZSk7XG4gICAgICB0aGlzLnRpbGVzLnB1c2godGlsZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTGV0dGVycyhsZXR0ZXIpIHtcbiAgICB0aGlzLnRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgIGlmICh0aWxlLmRhdGFzZXQubGV0dGVyID09PSBsZXR0ZXIpIHRpbGUudGV4dENvbnRlbnQgPSBsZXR0ZXI7XG4gICAgfSk7XG4gIH1cblxuICBwcmludFdvcmQoKSB7XG4gICAgdGhpcy50aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICB0aWxlLnRleHRDb250ZW50ID0gdGlsZS5kYXRhc2V0LmxldHRlcjtcbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRPblRpbGVCdXR0b25zQ2xpY2tlZCA9IChoYW5kbGVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIua2V5Ym9hcmQtY29udGFpbmVyX19idXR0b25cIik7XG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaGFuZGxlcihlKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgYmluZE9uV29yZEJ1dHRvbkNsaWNrZWQgPSAoaGFuZGxlcikgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGdldEVsZW1lbnQoXCJndWVzcy1idXR0b25cIik7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmd1ZXNzLWlucHV0XCIpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaGFuZGxlcihpbnB1dC52YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZmxhc2hSZWQoKSB7XG4gICAgaWYgKHRoaXMuYW5pbWF0ZWRFbGVtZW50KSB7XG4gICAgICBpZiAodGhpcy5hbmltYXRlZEVsZW1lbnQuY3VycmVudFRpbWUpIHRoaXMuYW5pbWF0ZWRFbGVtZW50LmNhbmNlbCgpO1xuICAgIH1cbiAgICBjb25zdCBhbmltYXRpb24gPSBbXG4gICAgICB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwgMCwgMCwgMC4zNDYpXCIsXG4gICAgICB9LFxuXG4gICAgICB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgfSxcbiAgICBdO1xuICAgIGNvbnN0IGFuaW1hdGlvblRpbWUgPSB7IGR1cmF0aW9uOiAxMDAwIH07XG4gICAgdGhpcy5hbmltYXRlZEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LmFuaW1hdGUoYW5pbWF0aW9uLCBhbmltYXRpb25UaW1lKTtcbiAgfVxuXG4gIGZsYXNoR3JlZW4oKSB7XG4gICAgaWYgKHRoaXMuYW5pbWF0ZWRFbGVtZW50KSB7XG4gICAgICBpZiAodGhpcy5hbmltYXRlZEVsZW1lbnQuY3VycmVudFRpbWUpIHRoaXMuYW5pbWF0ZWRFbGVtZW50LmNhbmNlbCgpO1xuICAgIH1cbiAgICBjb25zdCBhbmltYXRpb24gPSBbXG4gICAgICB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDIsIDIxNCwgMiwgMC41MzMpXCIsXG4gICAgICB9LFxuXG4gICAgICB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgfSxcbiAgICBdO1xuICAgIGNvbnN0IGFuaW1hdGlvblRpbWUgPSB7IGR1cmF0aW9uOiAxMDAwIH07XG4gICAgdGhpcy5hbmltYXRlZEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LmFuaW1hdGUoYW5pbWF0aW9uLCBhbmltYXRpb25UaW1lKTtcbiAgfVxuXG4gIGRpc2FibGVCdXR0b24oeyBjdXJyZW50VGFyZ2V0IH0pIHtcbiAgICBjb25zdCBidXR0b24gPSBjdXJyZW50VGFyZ2V0O1xuICAgIGJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIH1cblxuICBlbmFibGVBbGxCdXR0b25zKCkge1xuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmtleWJvYXJkLWNvbnRhaW5lcl9fYnV0dG9uXCIpO1xuICAgIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlckJvZHlQYXJ0KCkge1xuICAgIHRoaXMuaGFuZ21hbi5kcmF3Qm9keVBhcnQoKTtcbiAgfVxuXG4gIGRpc3BsYXlHYW1lU3RhdHVzID0gKGlzV2lubmVyKSA9PiB7XG4gICAgaWYgKGlzV2lubmVyKSB7XG4gICAgICB0aGlzLmhhbmdtYW4ucmVuZGVyV2lubmVyKCk7XG4gICAgICB0aGlzLnNob3dEaXNwbGF5ZXIoaXNXaW5uZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvd0Rpc3BsYXllcihpc1dpbm5lcilcbiAgICB9XG4gIH07XG5cbiAgc2hvd0Rpc3BsYXllciA9IChpc1dpbm5lcikgPT4ge1xuICAgIGlmIChpc1dpbm5lcikge1xuICAgICAgdGhpcy5kaXNwbGF5LmNsYXNzTGlzdC50b2dnbGUoJ2Rpc3BsYXlfd2lubmVyJylcbiAgICAgIHRoaXMuZGlzcGxheVdvcmRzLnRleHRDb250ZW50ID0gXCJHb29kIEpvYiFcIlxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc3BsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnZGlzcGxheV9sb3NlcicpXG4gICAgICB0aGlzLmRpc3BsYXlXb3Jkcy50ZXh0Q29udGVudCA9IFwiVG9vIEJhZCFcIlxuICAgIH1cbiAgfTtcblxuICByZXNldCgpIHtcbiAgICB0aGlzLnRpbGVzLmZvckVhY2goKHRpbGUpID0+IHRoaXMudGlsZV9jb250YWluZXIucmVtb3ZlQ2hpbGQodGlsZSkpO1xuICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICB0aGlzLmFuaW1hdGVkRWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5kaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXlfbG9zZXInKVxuICAgIHRoaXMuZGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5X3dpbm5lcicpXG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuaGFuZ21hbi5kcmF3KCk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IERpY3Rpb25hcnkgZnJvbSBcIi4vbW9kdWxlcy9EaWN0aW9uYXJ5XCI7XG5pbXBvcnQgTW9kZWwgZnJvbSBcIi4vbW9kdWxlcy9Nb2RlbFwiO1xuaW1wb3J0IEhhbmdtYW4gZnJvbSBcIi4vbW9kdWxlcy9IYW5nbWFuXCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi9tb2R1bGVzL1ZpZXdcIjtcbmltcG9ydCBDb250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZ2V0RWxlbWVudCB9IGZyb20gXCIuL21vZHVsZXMvSGVscGVyc1wiO1xuXG5jb25zdCBoYW5nbWFuID0gbmV3IEhhbmdtYW4oKVxuLy8gaGFuZ21hbi5kcmF3KClcbmNvbnN0IHZpZXcgPSBuZXcgVmlldyhoYW5nbWFuKVxuY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwoRGljdGlvbmFyeSlcbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcihtb2RlbCwgdmlldylcblxuY29udHJvbGxlci5pbml0KClcblxuLy8gY29uc3Qgd29yZCA9IG1vZGVsLmRpY3Rpb25hcnkuZmV0Y2hXb3JkKClcbi8vIGNvbnNvbGUubG9nKHdvcmQpO1xuLy8gdmlldy5hZGRMZXR0ZXJzKCdhJylcbi8vIHZpZXcuZmxhc2hSZWQoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==