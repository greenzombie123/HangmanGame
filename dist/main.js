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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksVUFBVTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksb0NBQW9DO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZTtBQUNmO0FBQ0EsQ0FBQyxFQUFDOztBQUVGOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUJ1Qzs7QUFFeEI7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0RBQVU7QUFDL0I7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0RBQVU7QUFDL0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixvREFBVTtBQUMvQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixvREFBVTtBQUMvQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0RBQVU7QUFDL0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdlpBO0FBQ0EsMENBQTBDLFFBQVE7QUFDbEQsdUNBQXVDLFVBQVU7QUFDakQ7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQyxVQUFVO0FBQ3JEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUQTs7QUFFZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QiwwQkFBMEI7QUFDbEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RXNEOztBQUV2QztBQUNmO0FBQ0E7QUFDQSwwQkFBMEIsb0RBQVU7QUFDcEM7QUFDQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qix3QkFBd0Isb0RBQVU7QUFDbEM7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0MsbUJBQW1CLHVEQUFhO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7O0FBRUEsa0JBQWtCLGVBQWU7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNwSUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ1Y7QUFDSTtBQUNOO0FBQ1k7QUFDZ0I7O0FBRTlELG9CQUFvQix3REFBTztBQUMzQjtBQUNBLGlCQUFpQixxREFBSTtBQUNyQixrQkFBa0Isc0RBQUssQ0FBQywyREFBVTtBQUNsQyx1QkFBdUIsMkRBQVU7O0FBRWpDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9Db250cm9sbGVyLmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvRGljdGlvbmFyeS5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL0hhbmdtYW4uanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9IZWxwZXJzLmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvTW9kZWwuanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9WaWV3LmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hhbmdtYW5nYW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2hhbmdtYW5nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCB2aWV3KSB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gIH1cblxuICBnZXRXb3JkID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld1dvcmQgPSB0aGlzLm1vZGVsLmdldFdvcmQoKTtcbiAgICBjb25zb2xlLmxvZyhuZXdXb3JkKTtcbiAgICB0aGlzLnZpZXcuY3JlYXRlVGlsZXMobmV3V29yZCk7XG4gIH07XG5cbiAgY2hlY2tsZXR0ZXIoY2hvc2VuTGV0dGVyKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWwubGV0dGVycy5zb21lKChsZXR0ZXIpID0+IGxldHRlciA9PT0gY2hvc2VuTGV0dGVyKTtcbiAgfVxuXG4gIGNoZWNrV29yZCh3b3JkKSB7XG4gICAgY29uc29sZS5sb2cod29yZCk7XG4gICAgcmV0dXJuIHRoaXMubW9kZWwud29yZCA9PT0gd29yZC50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgZ3Vlc3NMZXR0ZXIgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGN1cnJlbnRUYXJnZXQ6IHsgdGV4dENvbnRlbnQgfSxcbiAgICB9ID0gZTtcbiAgICBjb25zdCBsZXR0ZXIgPSB0ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh0aGlzLmNoZWNrbGV0dGVyKGxldHRlcikpIHtcbiAgICAgIHRoaXMubW9kZWwucmVtb3ZlTGV0dGVyKGxldHRlcik7XG4gICAgICB0aGlzLnZpZXcuYWRkTGV0dGVycyhsZXR0ZXIpO1xuICAgICAgdGhpcy52aWV3LmZsYXNoR3JlZW4oKTtcbiAgICAgIHRoaXMuY2hlY2tXaW5uZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWV3LmZsYXNoUmVkKCk7XG4gICAgICB0aGlzLnZpZXcucmVuZGVyQm9keVBhcnQoKTtcbiAgICAgIHRoaXMubW9kZWwuaW5jcmVhc2VOdW1PZk1pc3Rha2VzKCk7XG4gICAgICB0aGlzLmNoZWNrTG9zZXIoKTtcbiAgICB9XG4gIH07XG5cbiAgZ3Vlc3NXb3JkID0gKHdvcmQpID0+IHtcbiAgICBpZiAodGhpcy5jaGVja1dvcmQod29yZCkpIHtcbiAgICAgIHRoaXMudmlldy5wcmludFdvcmQoKTtcbiAgICAgIHRoaXMudmlldy5mbGFzaEdyZWVuKCk7XG4gICAgICB0aGlzLmNoZWNrV2lubmVyKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXcuZmxhc2hSZWQoKTtcbiAgICAgIHRoaXMudmlldy5yZW5kZXJCb2R5UGFydCgpO1xuICAgICAgdGhpcy5jaGVja0xvc2VyKClcbiAgICB9XG4gIH07XG5cbiAgY2hlY2tXaW5uZXIoaXNXb3JkQ29ycmVjdCA9IGZhbHNlKSB7XG4gICAgY29uc3QgeyBsZXR0ZXJzIH0gPSB0aGlzLm1vZGVsO1xuICAgIGlmICghbGV0dGVycy5sZW5ndGggfHwgaXNXb3JkQ29ycmVjdCkge1xuICAgICAgdGhpcy5tb2RlbC5zZXRHYW1lU3RhdHVzKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrTG9zZXIoKSB7XG4gICAgY29uc3QgeyBudW1iZXJPZk1pc3Rha2VzLCBsaW1pdE9mTWlzdGFrZXMgfSA9IHRoaXMubW9kZWw7XG4gICAgaWYgKG51bWJlck9mTWlzdGFrZXMgPT09IGxpbWl0T2ZNaXN0YWtlcykge1xuICAgICAgdGhpcy5tb2RlbC5zZXRHYW1lU3RhdHVzKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBvbkdhbWVTdGF0dXNVcGRhdGVkID0gKGlzV2lubmVyKSA9PiB7XG4gICAgdGhpcy52aWV3LmRpc3BsYXlHYW1lU3RhdHVzKGlzV2lubmVyKVxuICB9XG5cbiAgc3RhcnROZXdHYW1lKCkge31cblxuICBpbml0KCkge1xuICAgIHRoaXMubW9kZWwuYmluZE9uV29yZFJldHJpZXZlZCh0aGlzLmdldFdvcmQpO1xuICAgIHRoaXMubW9kZWwuYmluZE9uR2FtZVN0YXR1c1VwZGF0ZWQodGhpcy5vbkdhbWVTdGF0dXNVcGRhdGVkKTtcbiAgICB0aGlzLnZpZXcuYmluZE9uVGlsZUJ1dHRvbnNDbGlja2VkKHRoaXMuZ3Vlc3NMZXR0ZXIpO1xuICAgIHRoaXMudmlldy5iaW5kT25Xb3JkQnV0dG9uQ2xpY2tlZCh0aGlzLmd1ZXNzV29yZCk7XG4gICAgdGhpcy52aWV3LmluaXQoKTtcbiAgICB0aGlzLm1vZGVsLmluaXQoKTtcbiAgfVxufVxuIiwiLy8gR2V0IGEgd29yZCBmcm9tIEFQSS4gUmV0dXJuIHdvcmQuXG5jb25zdCBjb25maWcgPSB7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwiWC1BcGktS2V5XCI6IFwiSnVLdit5Q1hTMVpHTW93ZDk3QXdFZz09VEJ5T1UzTE43MGFzc04xa1wiLFxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgfSxcbiAgfTtcblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hXb3JkKCkge1xuICAgIFxuICB0cnkge1xuICAgIGNvbnN0IHdvcmRsaXN0ID0gW1wid29yZFwiXTtcbiAgICBjb25zdCBudW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3b3JkbGlzdC5sZW5ndGgpO1xuICAgIHJldHVybiB3b3JkbGlzdFtudW1dO1xuICAgIC8vIGxldCB3b3JkID0gYXdhaXQgZmV0Y2goXG4gICAgLy8gICAgIFwiaHR0cHM6Ly9hcGkuYXBpLW5pbmphcy5jb20vdjEvcmFuZG9td29yZFwiLFxuICAgIC8vICAgICBjb25maWdcbiAgICAvLyApO1xuICAgIC8vIHdvcmQgPSBhd2FpdCB3b3JkLmpzb24oKTtcbiAgICAvLyByZXR1cm4gd29yZC53b3JkO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGZldGNoV29yZCxcbn07XG5cbi8vQVBJIEp1S3YreUNYUzFaR01vd2Q5N0F3RWc9PVRCeU9VM0xONzBhc3NOMWtcbiIsImltcG9ydCB7IGdldEVsZW1lbnQgfSBmcm9tIFwiLi9IZWxwZXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhbmdtYW4ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm51bU9mQm9keVBhcnRzID0gMDtcbiAgfVxuXG4gIC8vIGggMzAwIHcgNjAwXG4gIGRyYXcoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY3R4LnRyYW5zbGF0ZSgxNTAsIDApO1xuXG4gICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gIH1cblxuICBkcmF3Qm9keVBhcnQoKSB7XG4gICAgdGhpcy5udW1PZkJvZHlQYXJ0cyArPSAxO1xuICAgIHN3aXRjaCAodGhpcy5udW1PZkJvZHlQYXJ0cykge1xuICAgICAgY2FzZSAxOlxuICAgICAgICB0aGlzLmFuaW1hdGVIZWFkKClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHRoaXMuYW5pbWF0ZUJvZHkoKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgdGhpcy5hbmltYXRlTGVmdExlZygpXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICB0aGlzLmFuaW1hdGVSaWdodExlZygpXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA1OlxuICAgICAgICB0aGlzLmFuaW1hdGVMZWZ0QXJtKClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDY6XG4gICAgICAgIHRoaXMuYW5pbWF0ZVJpZ2h0QXJtKClcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBkcmF3SGFuZ2VyKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGNvbnN0IGhhbmdlciA9IG5ldyBQYXRoMkQoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGhhbmdlci5tb3ZlVG8oMTAsIDI5MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygxMTAsIDI5MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygxMTAsIDI3MCk7XG4gICAgaGFuZ2VyLmxpbmVUbyg3MCwgMjcwKTtcbiAgICBoYW5nZXIubGluZVRvKDcwLCA1MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygyMjAsIDUwKTtcbiAgICBoYW5nZXIubGluZVRvKDIyMCwgODApO1xuICAgIGhhbmdlci5saW5lVG8oMjMwLCA4MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygyMzAsIDQwKTtcbiAgICBoYW5nZXIubGluZVRvKDUwLCA0MCk7XG4gICAgaGFuZ2VyLmxpbmVUbyg1MCwgMjcwKTtcbiAgICBoYW5nZXIubGluZVRvKDEwLCAyNzApO1xuICAgIGN0eC5maWxsKGhhbmdlcik7XG4gIH1cblxuICBhbmltYXRlSGVhZCgpIHtcbiAgICBsZXQgc3RhcnQgPSAzMDE7XG4gICAgY29uc3QgRU5EID0gMTAyO1xuICAgIC8vIDk4XG5cbiAgICBjb25zdCBkcmF3ID0gKHRpbWUpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG5cbiAgICAgIC8vIEhlYWRcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHguYXJjKDIyNSwgc3RhcnQsIDIwLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguZmlsbCgpO1xuXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgICBjdHguYXJjKDIyNSwgc3RhcnQsIDE4LCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguZmlsbCgpO1xuXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgICBjdHguYXJjKDIxNiwgc3RhcnQgLSAzLCAzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHgubW92ZVRvKDIzOCwgMTAxKTtcbiAgICAgIGN0eC5hcmMoMjMzLCBzdGFydCAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgICBjdHguZmlsbFJlY3QoMjE1LCBzdGFydCArIDcsIDIwLCAzKTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlckhlYWQoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gSGVhZFxuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoMjI1LCAxMDIsIDIwLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oMjIwLCAxMDEpO1xuICAgIGN0eC5hcmMoMjI1LCAxMDIsIDE4LCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oMjIwLCAxMDEpO1xuICAgIGN0eC5hcmMoMjE2LCAxMDIgLSAzLCAzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4Lm1vdmVUbygyMzgsIDEwMSk7XG4gICAgY3R4LmFyYygyMzMsIDEwMiAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5maWxsUmVjdCgyMTUsIDEwMiArIDcsIDIwLCAzKTtcbiAgfVxuXG4gIGFuaW1hdGVCb2R5KCkge1xuICAgIGxldCBzdGFydCA9IDMyMTtcbiAgICBjb25zdCBFTkQgPSAxMjU7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICAvLyBIZWFkXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuXG4gICAgICBjdHguZmlsbFJlY3QoMjIyLCBzdGFydCwgNSwgNTApO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyQm9keSgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBCb2R5XG5cbiAgICBjdHguZmlsbFJlY3QoMjIyLCAxMjAsIDUsIDUwKTtcbiAgfVxuXG4gIGFuaW1hdGVMZWZ0TGVnKCkge1xuICAgIGxldCBzdGFydCA9IDIyMTtcbiAgICBjb25zdCBFTkQgPSAtMTE7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuICAgICAgdGhpcy5yZW5kZXJCb2R5KCk7XG5cbiAgICAgIC8vIExlZnQgTGVnXG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDQ1KTtcbiAgICAgIGN0eC5maWxsUmVjdCgtMjIsIHN0YXJ0LCA1LCA1MCk7XG4gICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyTGVmdExlZygpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBMZWZ0IExlZ1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogNDUpO1xuICAgIGN0eC5maWxsUmVjdCgtMjIsIC0yMSwgNSwgNTApO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBhbmltYXRlUmlnaHRMZWcoKSB7XG4gICAgbGV0IHN0YXJ0ID0gMjIxO1xuICAgIGNvbnN0IEVORCA9IC0yNztcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG4gICAgICB0aGlzLnJlbmRlckJvZHkoKTtcbiAgICAgIHRoaXMucmVuZGVyTGVmdExlZygpO1xuXG4gICAgICAvLyBMZWZ0IExlZ1xuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsdWVcIjtcbiAgICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDEzNSk7XG4gICAgICBjdHguZmlsbFJlY3QoLTIzLCBzdGFydCwgNSwgNTApO1xuICAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlclJpZ2h0TGVnKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIFJpZ2h0IExlZ1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogMTM1KTtcbiAgICBjdHguZmlsbFJlY3QoLTIzLCAtMjcsIDUsIDUwKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgYW5pbWF0ZUxlZnRBcm0oKSB7XG4gICAgbGV0IHN0YXJ0ID0gMzIxO1xuICAgIGNvbnN0IEVORCA9IDE0MDtcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG4gICAgICB0aGlzLnJlbmRlckJvZHkoKTtcbiAgICAgIHRoaXMucmVuZGVyTGVmdExlZygpO1xuICAgICAgdGhpcy5yZW5kZXJSaWdodExlZygpO1xuXG4gICAgICAvLyBMZWZ0IEFybVxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC5maWxsUmVjdCgxNzEsIHN0YXJ0LCA1MCwgNSk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJMZWZ0QXJtKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIExlZnQgQXJtXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguZmlsbFJlY3QoMTcxLCAxMzAsIDUwLCA1KTtcbiAgfVxuXG4gIGFuaW1hdGVSaWdodEFybSgpIHtcbiAgICBsZXQgc3RhcnQgPSAzMjE7XG4gICAgY29uc3QgRU5EID0gMTQwO1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gICAgICB0aGlzLnJlbmRlckhlYWQoKTtcbiAgICAgIHRoaXMucmVuZGVyQm9keSgpO1xuICAgICAgdGhpcy5yZW5kZXJMZWZ0TGVnKCk7XG4gICAgICB0aGlzLnJlbmRlclJpZ2h0TGVnKCk7XG4gICAgICB0aGlzLnJlbmRlckxlZnRBcm0oKTtcblxuICAgICAgLy8gUmlnaHQgQXJtXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LmZpbGxSZWN0KDIyNywgc3RhcnQsIDUwLCA1KTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlclJpZ2h0QXJtKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIFJpZ2h0IEFybVxuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LmZpbGxSZWN0KDIyNywgMTQwLCA1MCwgNSk7XG4gIH1cblxuICByZW5kZXJXaW5uZXIoKXtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKVxuXG4gICAgdGhpcy5kcmF3SGFuZ2VyKClcblxuICAgIGN0eC50cmFuc2xhdGUoLTEwMCwgMCk7XG5cbiAgICAvLyBIZWFkXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYygzMjUsIDIwMiwgMjAsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgY3R4LmFyYygzMjUsIDIwMiwgMTgsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgY3R4LmFyYygzMTYsIDIwMiAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHgubW92ZVRvKDIzOCwgMTAxKTtcbiAgICBjdHguYXJjKDMzMywgMjAyIC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5tb3ZlVG8oMzMzLCAyMjApO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICAvLyBTbWlsZVxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDMxNCwgMjA1KTtcbiAgICBjdHguYXJjKDMyNCwgMjA1LCAxMCwgMCwgTWF0aC5QSSwgZmFsc2UpO1xuICAgIGN0eC5zdHJva2UoKTtcblxuICAgIC8vIEJvZHlcblxuICAgIGN0eC5maWxsUmVjdCgzMjIsIDIyMCwgNSwgNTApO1xuXG4gICAgIC8vIExlZnQgTGVnXG4gICAgIGN0eC5zYXZlKCk7XG4gICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogNDUpO1xuICAgICBjdHguZmlsbFJlY3QoMTIwLCAtMjAsIDUsIDUwKTtcbiAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgICAvLyBSaWdodCBMZWdcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDEzNSk7XG4gICAgY3R4LmZpbGxSZWN0KC0yMywgLTE2OSwgNSwgNTApO1xuICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAvLyBMZWZ0IEFybVxuICAgIGN0eC5zYXZlKCk7XG4gICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogNDUpO1xuICAgICBjdHguZmlsbFJlY3QoMTAwLCAtOTAsIDUsIDUwKTtcbiAgICAgY3R4LnJlc3RvcmUoKTtcblxuXG4gICAgLy8gUmlnaHQgQXJtXG4gICAgY3R4LnNhdmUoKTtcbiAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiAxMzUpO1xuICAgICBjdHguZmlsbFJlY3QoLTQwLCAtMTAwLCA1LCA1MCk7XG4gICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cbn1cbiIsImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZWxlbWVudCwgY2xhc3NOYW1lKXtcbiAgICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGAke2VsZW1lbnR9YClcbiAgICBpZihjbGFzc05hbWUpIGVsZS5jbGFzc0xpc3QuYWRkKGAke2NsYXNzTmFtZX1gKVxuICAgIHJldHVybiBlbGVcbn1cblxuZnVuY3Rpb24gZ2V0RWxlbWVudChjbGFzc05hbWUpe1xuICAgIGNvbnN0IGVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzTmFtZX1gKVxuICAgIHJldHVybiBlbGVcbn1cblxuZXhwb3J0IHtjcmVhdGVFbGVtZW50LCBnZXRFbGVtZW50fSIsIi8vIGltcG9ydCBEaWN0aW9uYXJ5IGZyb20gXCIuL0RpY3Rpb25hcnlcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWwge1xuICBjb25zdHJ1Y3RvcihkaWN0aW9uYXJ5KSB7XG4gICAgdGhpcy53b3JkID0gbnVsbDtcbiAgICB0aGlzLm51bWJlck9mTWlzdGFrZXMgPSAwO1xuICAgIHRoaXMubGltaXRPZk1pc3Rha2VzID0gNjtcbiAgICB0aGlzLmxldHRlcnMgPSBbXTtcbiAgICB0aGlzLmdhbWVTdGF0dXMgPSBudWxsO1xuICAgIHRoaXMuZGljdGlvbmFyeSA9IGRpY3Rpb25hcnk7XG4gIH1cblxuICAvLyBHZXQgd29yZCBmcm9tIEFQSSBhbmQgc2V0IHRvIHdvcmQgcHJvcGVydHlcbiAgYXN5bmMgZmV0Y2hXb3JkKCkge1xuICAgIHRoaXMud29yZCA9IGF3YWl0IHRoaXMuZGljdGlvbmFyeS5mZXRjaFdvcmQoKTtcbiAgICB0aGlzLnNldExldHRlcnMoKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmxldHRlcnMpO1xuICAgIHRoaXMub25Xb3JkUmV0cmlldmVkKCk7XG4gIH1cblxuICBnZXRXb3JkKCkge1xuICAgIHJldHVybiB0aGlzLndvcmQ7XG4gIH1cblxuICBiaW5kT25Xb3JkUmV0cmlldmVkKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbldvcmRSZXRyaWV2ZWQgPSBjYWxsYmFjaztcbiAgfVxuXG4gIGJpbmRPbkdhbWVTdGF0dXNVcGRhdGVkKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbkdhbWVTdGF0dXNVcGRhdGVkID0gY2FsbGJhY2s7XG4gIH1cblxuICAvLyBJbnNlcnQgbGV0dGVycyBvZiB3b3JkIGludG8gbGV0dGVycyBwcm9wXG4gIHNldExldHRlcnMoKSB7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMud29yZC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHRoaXMubGV0dGVycy5wdXNoKHRoaXMud29yZC5jaGFyQXQoaW5kZXgpKTtcbiAgICB9XG4gIH1cblxuICAvLyBTZXQgbnVtYmVyIG9mIG1pc3Rha2VzXG4gIHNldExpbWl0b2ZNaXN0YWtlcyhudW1iZXIpIHtcbiAgICB0aGlzLmxpbWl0T2ZNaXN0YWtlcyA9IG51bWJlcjtcbiAgfVxuXG4gIGluY3JlYXNlTnVtT2ZNaXN0YWtlcygpIHtcbiAgICB0aGlzLm51bWJlck9mTWlzdGFrZXMgKz0gMTtcbiAgfVxuXG4gIC8vIFJlbW92ZSBhIGxldHRlciBmcm9tIGxldHRlcnMgcHJvcFxuICByZW1vdmVMZXR0ZXIobGV0dGVyKSB7XG4gICAgdGhpcy5sZXR0ZXJzID0gdGhpcy5sZXR0ZXJzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gbGV0dGVyKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmxldHRlcnMpO1xuICB9XG5cbiAgLy8gU2V0IHZhbHVlIHRvIGdhbWVTdGF0dXMgcHJvcFxuICBzZXRHYW1lU3RhdHVzKHN0YXR1cykge1xuICAgIHRoaXMuZ2FtZVN0YXR1cyA9IHN0YXR1cztcblxuICAgIHRoaXMub25HYW1lU3RhdHVzVXBkYXRlZCh0aGlzLmdhbWVTdGF0dXMpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnNldExpbWl0b2ZNaXN0YWtlcyg2KTtcbiAgICB0aGlzLmZldGNoV29yZCgpO1xuICB9XG5cbiAgLy8gUmVzZXRzIHZhbHVlcyBvZiBwcm9wZXJ0aWVzIG9mIG1vZGVsXG4gIHJlc2V0KCkge1xuICAgIHRoaXMud29yZCA9IG51bGw7XG4gICAgdGhpcy5udW1iZXJPZk1pc3Rha2VzID0gbnVsbDtcbiAgICB0aGlzLmxldHRlcnMgPSBbXTtcbiAgICB0aGlzLmdhbWVTdGF0dXMgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBnZXRFbGVtZW50IH0gZnJvbSBcIi4vSGVscGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IHtcbiAgY29uc3RydWN0b3IoaGFuZ21hbikge1xuICAgIHRoaXMuaGFuZ21hbiA9IGhhbmdtYW47XG4gICAgdGhpcy50aWxlX2NvbnRhaW5lciA9IGdldEVsZW1lbnQoXCJ0aWxlLWNvbnRhaW5lclwiKTtcbiAgICB0aGlzLnRpbGVzID0gW107XG4gICAgdGhpcy5hbmltYXRlZEVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuZGlzcGxheSA9IGdldEVsZW1lbnQoXCJkaXNwbGF5XCIpO1xuICAgIHRoaXMuZGlzcGxheVdvcmRzID0gZ2V0RWxlbWVudChcImRpc3BsYXlfX3dvcmRzXCIpO1xuICB9XG5cbiAgLy8gR2V0IGxlbmd0aCBvZiB0aGUgd29yZFxuICBjcmVhdGVUaWxlcyh3b3JkKSB7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHdvcmQubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCB0aWxlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcInRpbGUtY29udGFpbmVyX190aWxlXCIpO1xuICAgICAgdGlsZS5kYXRhc2V0LmxldHRlciA9IHdvcmRbaW5kZXhdO1xuICAgICAgdGhpcy50aWxlX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aWxlKTtcbiAgICAgIHRoaXMudGlsZXMucHVzaCh0aWxlKTtcbiAgICB9XG4gIH1cblxuICBhZGRMZXR0ZXJzKGxldHRlcikge1xuICAgIHRoaXMudGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgICAgaWYgKHRpbGUuZGF0YXNldC5sZXR0ZXIgPT09IGxldHRlcikgdGlsZS50ZXh0Q29udGVudCA9IGxldHRlcjtcbiAgICB9KTtcbiAgfVxuXG4gIHByaW50V29yZCgpIHtcbiAgICB0aGlzLnRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgIHRpbGUudGV4dENvbnRlbnQgPSB0aWxlLmRhdGFzZXQubGV0dGVyO1xuICAgIH0pO1xuICB9XG5cbiAgYmluZE9uVGlsZUJ1dHRvbnNDbGlja2VkID0gKGhhbmRsZXIpID0+IHtcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5rZXlib2FyZC1jb250YWluZXJfX2J1dHRvblwiKTtcbiAgICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBoYW5kbGVyKGUpO1xuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24oZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBiaW5kT25Xb3JkQnV0dG9uQ2xpY2tlZCA9IChoYW5kbGVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZ2V0RWxlbWVudChcImd1ZXNzLWJ1dHRvblwiKTtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3Vlc3MtaW5wdXRcIik7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBoYW5kbGVyKGlucHV0LnZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBmbGFzaFJlZCgpIHtcbiAgICBpZiAodGhpcy5hbmltYXRlZEVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmFuaW1hdGVkRWxlbWVudC5jdXJyZW50VGltZSkgdGhpcy5hbmltYXRlZEVsZW1lbnQuY2FuY2VsKCk7XG4gICAgfVxuICAgIGNvbnN0IGFuaW1hdGlvbiA9IFtcbiAgICAgIHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LCAwLCAwLCAwLjM0NilcIixcbiAgICAgIH0sXG5cbiAgICAgIHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCIsXG4gICAgICB9LFxuICAgIF07XG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IHsgZHVyYXRpb246IDEwMDAgfTtcbiAgICB0aGlzLmFuaW1hdGVkRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuYW5pbWF0ZShhbmltYXRpb24sIGFuaW1hdGlvblRpbWUpO1xuICB9XG5cbiAgZmxhc2hHcmVlbigpIHtcbiAgICBpZiAodGhpcy5hbmltYXRlZEVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmFuaW1hdGVkRWxlbWVudC5jdXJyZW50VGltZSkgdGhpcy5hbmltYXRlZEVsZW1lbnQuY2FuY2VsKCk7XG4gICAgfVxuICAgIGNvbnN0IGFuaW1hdGlvbiA9IFtcbiAgICAgIHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMiwgMjE0LCAyLCAwLjUzMylcIixcbiAgICAgIH0sXG5cbiAgICAgIHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCIsXG4gICAgICB9LFxuICAgIF07XG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IHsgZHVyYXRpb246IDEwMDAgfTtcbiAgICB0aGlzLmFuaW1hdGVkRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuYW5pbWF0ZShhbmltYXRpb24sIGFuaW1hdGlvblRpbWUpO1xuICB9XG5cbiAgZGlzYWJsZUJ1dHRvbih7IGN1cnJlbnRUYXJnZXQgfSkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGN1cnJlbnRUYXJnZXQ7XG4gICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGVuYWJsZUFsbEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIua2V5Ym9hcmQtY29udGFpbmVyX19idXR0b25cIik7XG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyQm9keVBhcnQoKSB7XG4gICAgdGhpcy5oYW5nbWFuLmRyYXdCb2R5UGFydCgpO1xuICB9XG5cbiAgZGlzcGxheUdhbWVTdGF0dXMgPSAoaXNXaW5uZXIpID0+IHtcbiAgICBpZiAoaXNXaW5uZXIpIHtcbiAgICAgIHRoaXMuaGFuZ21hbi5yZW5kZXJXaW5uZXIoKTtcbiAgICAgIHRoaXMuc2hvd0Rpc3BsYXllcihpc1dpbm5lcilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93RGlzcGxheWVyKGlzV2lubmVyKVxuICAgIH1cbiAgfTtcblxuICBzaG93RGlzcGxheWVyID0gKGlzV2lubmVyKSA9PiB7XG4gICAgaWYgKGlzV2lubmVyKSB7XG4gICAgICB0aGlzLmRpc3BsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnZGlzcGxheV93aW5uZXInKVxuICAgICAgdGhpcy5kaXNwbGF5V29yZHMudGV4dENvbnRlbnQgPSBcIkdvb2QgSm9iIVwiXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlzcGxheS5jbGFzc0xpc3QudG9nZ2xlKCdkaXNwbGF5X2xvc2VyJylcbiAgICAgIHRoaXMuZGlzcGxheVdvcmRzLnRleHRDb250ZW50ID0gXCJUb28gQmFkIVwiXG4gICAgfVxuICB9O1xuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMudGlsZXMuZm9yRWFjaCgodGlsZSkgPT4gdGhpcy50aWxlX2NvbnRhaW5lci5yZW1vdmVDaGlsZCh0aWxlKSk7XG4gICAgdGhpcy50aWxlcyA9IFtdO1xuICAgIHRoaXMuYW5pbWF0ZWRFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLmRpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheV9sb3NlcicpXG4gICAgdGhpcy5kaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXlfd2lubmVyJylcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5oYW5nbWFuLmRyYXcoKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRGljdGlvbmFyeSBmcm9tIFwiLi9tb2R1bGVzL0RpY3Rpb25hcnlcIjtcbmltcG9ydCBNb2RlbCBmcm9tIFwiLi9tb2R1bGVzL01vZGVsXCI7XG5pbXBvcnQgSGFuZ21hbiBmcm9tIFwiLi9tb2R1bGVzL0hhbmdtYW5cIjtcbmltcG9ydCBWaWV3IGZyb20gXCIuL21vZHVsZXMvVmlld1wiO1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSBcIi4vbW9kdWxlcy9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBnZXRFbGVtZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9IZWxwZXJzXCI7XG5cbmNvbnN0IGhhbmdtYW4gPSBuZXcgSGFuZ21hbigpXG4vLyBoYW5nbWFuLmRyYXcoKVxuY29uc3QgdmlldyA9IG5ldyBWaWV3KGhhbmdtYW4pXG5jb25zdCBtb2RlbCA9IG5ldyBNb2RlbChEaWN0aW9uYXJ5KVxuY29uc3QgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKG1vZGVsLCB2aWV3KVxuXG5jb250cm9sbGVyLmluaXQoKVxuXG4vLyBjb25zdCB3b3JkID0gbW9kZWwuZGljdGlvbmFyeS5mZXRjaFdvcmQoKVxuLy8gY29uc29sZS5sb2cod29yZCk7XG4vLyB2aWV3LmFkZExldHRlcnMoJ2EnKVxuLy8gdmlldy5mbGFzaFJlZCgpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9