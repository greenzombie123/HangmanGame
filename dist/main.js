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

  guessLetter = (e) => {
    // {currentTarget:{dataset:{letter}}}
    const {
      currentTarget: { textContent },
    } = e;
    const letter = textContent.toLowerCase();
    console.log(letter);
    if (this.checkletter(letter)) console.log("Nice");
    else console.log("failed!");
  };

  init() {
    this.model.bindOnWordRetrieved(this.getWord);
    this.view.bindOnTileButtonsClicked(this.guessLetter);
    this.view.init();
    this.model.fetchWord();
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

    // Head

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

    ctx.fillStyle = "black";
    ctx.fillRect(227, 140, 50, 5);
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

class Model{
    constructor(dictionary){
        this.word = null;
        this.numberOfMistakes = null;
        this.letters = [];
        this.gameStatus = null;
        this.dictionary = dictionary;
    }

    // Get word from API and set to word property
    async fetchWord(){
        this.word = await this.dictionary.fetchWord()
        this.setLetters()
        console.log(this.letters);
        this.onWordRetrieved()
    }

    getWord(){
        return this.word
    }

    bindOnWordRetrieved(callback){
        this.onWordRetrieved = callback
    }


    // Insert letters of word into letters prop
    setLetters(){
        for (let index = 0; index < this.word.length; index++) {
            this.letters.push(this.word.charAt(index))
        }
    }

    // Set number of mistakes
    setNumOfMistakes(){
        this.numberOfMistakes = 6;
    }

    // Remove a letter from letters prop
    removeLetter(letter){
        this.letters = this.letters.filter(item => item !== letter)
    }

    // Set value to gameStatus prop
    setGameStatus(status){
        this.gameStatus = status
    }

    // Resets values of properties of model
    reset(){
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
    this.counter = 0;
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

  async flashRed() {
    document.body.classList.toggle("redFlash");
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });
    document.body.classList.toggle("redFlash");
  }

  async flashGreen() {
    document.body.classList.toggle("greenFleash");
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });
    document.body.classList.toggle("greenFleash");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLGVBQWUsU0FBUztBQUNoQztBQUNBLHVCQUF1QixhQUFhO0FBQ3BDLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7QUFDZjtBQUNBLENBQUMsRUFBQzs7QUFFRjs7Ozs7Ozs7Ozs7Ozs7OztBQzlCdUM7O0FBRXhCO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixvREFBVTtBQUMvQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0RBQVU7QUFDL0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0RBQVU7QUFDL0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixvREFBVTtBQUMvQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzFVQTtBQUNBLDBDQUEwQyxRQUFRO0FBQ2xELHVDQUF1QyxVQUFVO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMsVUFBVTtBQUNyRDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDVEE7O0FBRWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsNEJBQTRCLDBCQUEwQjtBQUN0RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDekRzRDs7QUFFdkM7QUFDZjtBQUNBO0FBQ0EsMEJBQTBCLG9EQUFVO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLHFCQUFxQjtBQUM3QyxtQkFBbUIsdURBQWE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsa0JBQWtCLGVBQWU7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzlFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOOEM7QUFDVjtBQUNJO0FBQ047QUFDWTtBQUNnQjs7QUFFOUQsb0JBQW9CLHdEQUFPO0FBQzNCO0FBQ0EsaUJBQWlCLHFEQUFJO0FBQ3JCLGtCQUFrQixzREFBSyxDQUFDLDJEQUFVO0FBQ2xDLHVCQUF1QiwyREFBVTs7QUFFakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL0NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9EaWN0aW9uYXJ5LmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvSGFuZ21hbi5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL0hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9Nb2RlbC5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL1ZpZXcuanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2hhbmdtYW5nYW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobW9kZWwsIHZpZXcpIHtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgfVxuXG4gIGdldFdvcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3V29yZCA9IHRoaXMubW9kZWwuZ2V0V29yZCgpO1xuICAgIGNvbnNvbGUubG9nKG5ld1dvcmQpO1xuICAgIHRoaXMudmlldy5jcmVhdGVUaWxlcyhuZXdXb3JkKTtcbiAgfTtcblxuICBjaGVja2xldHRlcihjaG9zZW5MZXR0ZXIpIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5sZXR0ZXJzLnNvbWUoKGxldHRlcikgPT4gbGV0dGVyID09PSBjaG9zZW5MZXR0ZXIpO1xuICB9XG5cbiAgZ3Vlc3NMZXR0ZXIgPSAoZSkgPT4ge1xuICAgIC8vIHtjdXJyZW50VGFyZ2V0OntkYXRhc2V0OntsZXR0ZXJ9fX1cbiAgICBjb25zdCB7XG4gICAgICBjdXJyZW50VGFyZ2V0OiB7IHRleHRDb250ZW50IH0sXG4gICAgfSA9IGU7XG4gICAgY29uc3QgbGV0dGVyID0gdGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zb2xlLmxvZyhsZXR0ZXIpO1xuICAgIGlmICh0aGlzLmNoZWNrbGV0dGVyKGxldHRlcikpIGNvbnNvbGUubG9nKFwiTmljZVwiKTtcbiAgICBlbHNlIGNvbnNvbGUubG9nKFwiZmFpbGVkIVwiKTtcbiAgfTtcblxuICBpbml0KCkge1xuICAgIHRoaXMubW9kZWwuYmluZE9uV29yZFJldHJpZXZlZCh0aGlzLmdldFdvcmQpO1xuICAgIHRoaXMudmlldy5iaW5kT25UaWxlQnV0dG9uc0NsaWNrZWQodGhpcy5ndWVzc0xldHRlcik7XG4gICAgdGhpcy52aWV3LmluaXQoKTtcbiAgICB0aGlzLm1vZGVsLmZldGNoV29yZCgpO1xuICB9XG59XG4iLCIvLyBHZXQgYSB3b3JkIGZyb20gQVBJLiBSZXR1cm4gd29yZC5cbmNvbnN0IGNvbmZpZyA9IHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVyczoge1xuICAgICAgXCJYLUFwaS1LZXlcIjogXCJKdUt2K3lDWFMxWkdNb3dkOTdBd0VnPT1UQnlPVTNMTjcwYXNzTjFrXCIsXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB9LFxuICB9O1xuXG5hc3luYyBmdW5jdGlvbiBmZXRjaFdvcmQoKSB7XG4gICAgXG4gIHRyeSB7XG4gICAgY29uc3Qgd29yZGxpc3QgPSBbXCJ3b3JkXCIsIFwiYXBwbGVcIiwgXCJkaWN0aW9uYXJ5XCJdO1xuICAgIGNvbnN0IG51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdvcmRsaXN0Lmxlbmd0aCk7XG4gICAgcmV0dXJuIHdvcmRsaXN0W251bV07XG4gICAgLy8gbGV0IHdvcmQgPSBhd2FpdCBmZXRjaChcbiAgICAvLyAgICAgXCJodHRwczovL2FwaS5hcGktbmluamFzLmNvbS92MS9yYW5kb213b3JkXCIsXG4gICAgLy8gICAgIGNvbmZpZ1xuICAgIC8vICk7XG4gICAgLy8gd29yZCA9IGF3YWl0IHdvcmQuanNvbigpO1xuICAgIC8vIHJldHVybiB3b3JkLndvcmQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZmV0Y2hXb3JkLFxufTtcblxuLy9BUEkgSnVLdit5Q1hTMVpHTW93ZDk3QXdFZz09VEJ5T1UzTE43MGFzc04xa1xuIiwiaW1wb3J0IHsgZ2V0RWxlbWVudCB9IGZyb20gXCIuL0hlbHBlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFuZ21hbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubnVtT2ZCb2R5UGFydHMgPSAwO1xuICB9XG5cbiAgLy8gaCAzMDAgdyA2MDBcbiAgZHJhdygpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjdHgudHJhbnNsYXRlKDE1MCwgMCk7XG5cbiAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgfVxuXG4gIGRyYXdCb2R5UGFydCgpIHtcbiAgICB0aGlzLm51bU9mQm9keVBhcnRzICs9IDE7XG4gICAgc3dpdGNoICh0aGlzLm51bU9mQm9keVBhcnRzKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHRoaXMuYW5pbWF0ZUhlYWQoKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgdGhpcy5hbmltYXRlQm9keSgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB0aGlzLmFuaW1hdGVMZWZ0TGVnKClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHRoaXMuYW5pbWF0ZVJpZ2h0TGVnKClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDU6XG4gICAgICAgIHRoaXMuYW5pbWF0ZUxlZnRBcm0oKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgdGhpcy5hbmltYXRlUmlnaHRBcm0oKVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGRyYXdIYW5nZXIoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY29uc3QgaGFuZ2VyID0gbmV3IFBhdGgyRCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgaGFuZ2VyLm1vdmVUbygxMCwgMjkwKTtcbiAgICBoYW5nZXIubGluZVRvKDExMCwgMjkwKTtcbiAgICBoYW5nZXIubGluZVRvKDExMCwgMjcwKTtcbiAgICBoYW5nZXIubGluZVRvKDcwLCAyNzApO1xuICAgIGhhbmdlci5saW5lVG8oNzAsIDUwKTtcbiAgICBoYW5nZXIubGluZVRvKDIyMCwgNTApO1xuICAgIGhhbmdlci5saW5lVG8oMjIwLCA4MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygyMzAsIDgwKTtcbiAgICBoYW5nZXIubGluZVRvKDIzMCwgNDApO1xuICAgIGhhbmdlci5saW5lVG8oNTAsIDQwKTtcbiAgICBoYW5nZXIubGluZVRvKDUwLCAyNzApO1xuICAgIGhhbmdlci5saW5lVG8oMTAsIDI3MCk7XG4gICAgY3R4LmZpbGwoaGFuZ2VyKTtcbiAgfVxuXG4gIGFuaW1hdGVIZWFkKCkge1xuICAgIGxldCBzdGFydCA9IDMwMTtcbiAgICBjb25zdCBFTkQgPSAxMDI7XG4gICAgLy8gOThcblxuICAgIGNvbnN0IGRyYXcgPSAodGltZSkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcblxuICAgICAgLy8gSGVhZFxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5hcmMoMjI1LCBzdGFydCwgMjAsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICAgIGN0eC5hcmMoMjI1LCBzdGFydCwgMTgsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICAgIGN0eC5hcmMoMjE2LCBzdGFydCAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5tb3ZlVG8oMjM4LCAxMDEpO1xuICAgICAgY3R4LmFyYygyMzMsIHN0YXJ0IC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIGN0eC5maWxsUmVjdCgyMTUsIHN0YXJ0ICsgNywgMjAsIDMpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVySGVhZCgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBIZWFkXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYygyMjUsIDEwMiwgMjAsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgY3R4LmFyYygyMjUsIDEwMiwgMTgsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgY3R4LmFyYygyMTYsIDEwMiAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHgubW92ZVRvKDIzOCwgMTAxKTtcbiAgICBjdHguYXJjKDIzMywgMTAyIC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LmZpbGxSZWN0KDIxNSwgMTAyICsgNywgMjAsIDMpO1xuICB9XG5cbiAgYW5pbWF0ZUJvZHkoKSB7XG4gICAgbGV0IHN0YXJ0ID0gMzIxO1xuICAgIGNvbnN0IEVORCA9IDEyNTtcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIC8vIEhlYWRcbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG5cbiAgICAgIGN0eC5maWxsUmVjdCgyMjIsIHN0YXJ0LCA1LCA1MCk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJCb2R5KCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIEhlYWRcblxuICAgIGN0eC5maWxsUmVjdCgyMjIsIDEyMCwgNSwgNTApO1xuICB9XG5cbiAgYW5pbWF0ZUxlZnRMZWcoKSB7XG4gICAgbGV0IHN0YXJ0ID0gMjIxO1xuICAgIGNvbnN0IEVORCA9IC0xMTtcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG4gICAgICB0aGlzLnJlbmRlckJvZHkoKTtcblxuICAgICAgLy8gTGVmdCBMZWdcbiAgICAgIGN0eC5zYXZlKCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogNDUpO1xuICAgICAgY3R4LmZpbGxSZWN0KC0yMiwgc3RhcnQsIDUsIDUwKTtcbiAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJMZWZ0TGVnKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIExlZnQgTGVnXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiA0NSk7XG4gICAgY3R4LmZpbGxSZWN0KC0yMiwgLTIxLCA1LCA1MCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIGFuaW1hdGVSaWdodExlZygpIHtcbiAgICBsZXQgc3RhcnQgPSAyMjE7XG4gICAgY29uc3QgRU5EID0gLTI3O1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gICAgICB0aGlzLnJlbmRlckhlYWQoKTtcbiAgICAgIHRoaXMucmVuZGVyQm9keSgpO1xuICAgICAgdGhpcy5yZW5kZXJMZWZ0TGVnKCk7XG5cbiAgICAgIC8vIExlZnQgTGVnXG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmx1ZVwiO1xuICAgICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogMTM1KTtcbiAgICAgIGN0eC5maWxsUmVjdCgtMjMsIHN0YXJ0LCA1LCA1MCk7XG4gICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyUmlnaHRMZWcoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gUmlnaHQgTGVnXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiAxMzUpO1xuICAgIGN0eC5maWxsUmVjdCgtMjMsIC0yNywgNSwgNTApO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBhbmltYXRlTGVmdEFybSgpIHtcbiAgICBsZXQgc3RhcnQgPSAzMjE7XG4gICAgY29uc3QgRU5EID0gMTQwO1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gICAgICB0aGlzLnJlbmRlckhlYWQoKTtcbiAgICAgIHRoaXMucmVuZGVyQm9keSgpO1xuICAgICAgdGhpcy5yZW5kZXJMZWZ0TGVnKCk7XG4gICAgICB0aGlzLnJlbmRlclJpZ2h0TGVnKCk7XG5cbiAgICAgIC8vIExlZnQgQXJtXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LmZpbGxSZWN0KDE3MSwgc3RhcnQsIDUwLCA1KTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlckxlZnRBcm0oKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguZmlsbFJlY3QoMTcxLCAxMzAsIDUwLCA1KTtcbiAgfVxuXG4gIGFuaW1hdGVSaWdodEFybSgpIHtcbiAgICBsZXQgc3RhcnQgPSAzMjE7XG4gICAgY29uc3QgRU5EID0gMTQwO1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gICAgICB0aGlzLnJlbmRlckhlYWQoKTtcbiAgICAgIHRoaXMucmVuZGVyQm9keSgpO1xuICAgICAgdGhpcy5yZW5kZXJMZWZ0TGVnKCk7XG4gICAgICB0aGlzLnJlbmRlclJpZ2h0TGVnKCk7XG4gICAgICB0aGlzLnJlbmRlckxlZnRBcm0oKTtcblxuICAgICAgLy8gUmlnaHQgQXJtXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LmZpbGxSZWN0KDIyNywgc3RhcnQsIDUwLCA1KTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlclJpZ2h0QXJtKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LmZpbGxSZWN0KDIyNywgMTQwLCA1MCwgNSk7XG4gIH1cbn1cbiIsImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZWxlbWVudCwgY2xhc3NOYW1lKXtcbiAgICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGAke2VsZW1lbnR9YClcbiAgICBpZihjbGFzc05hbWUpIGVsZS5jbGFzc0xpc3QuYWRkKGAke2NsYXNzTmFtZX1gKVxuICAgIHJldHVybiBlbGVcbn1cblxuZnVuY3Rpb24gZ2V0RWxlbWVudChjbGFzc05hbWUpe1xuICAgIGNvbnN0IGVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzTmFtZX1gKVxuICAgIHJldHVybiBlbGVcbn1cblxuZXhwb3J0IHtjcmVhdGVFbGVtZW50LCBnZXRFbGVtZW50fSIsIi8vIGltcG9ydCBEaWN0aW9uYXJ5IGZyb20gXCIuL0RpY3Rpb25hcnlcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWx7XG4gICAgY29uc3RydWN0b3IoZGljdGlvbmFyeSl7XG4gICAgICAgIHRoaXMud29yZCA9IG51bGw7XG4gICAgICAgIHRoaXMubnVtYmVyT2ZNaXN0YWtlcyA9IG51bGw7XG4gICAgICAgIHRoaXMubGV0dGVycyA9IFtdO1xuICAgICAgICB0aGlzLmdhbWVTdGF0dXMgPSBudWxsO1xuICAgICAgICB0aGlzLmRpY3Rpb25hcnkgPSBkaWN0aW9uYXJ5O1xuICAgIH1cblxuICAgIC8vIEdldCB3b3JkIGZyb20gQVBJIGFuZCBzZXQgdG8gd29yZCBwcm9wZXJ0eVxuICAgIGFzeW5jIGZldGNoV29yZCgpe1xuICAgICAgICB0aGlzLndvcmQgPSBhd2FpdCB0aGlzLmRpY3Rpb25hcnkuZmV0Y2hXb3JkKClcbiAgICAgICAgdGhpcy5zZXRMZXR0ZXJzKClcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5sZXR0ZXJzKTtcbiAgICAgICAgdGhpcy5vbldvcmRSZXRyaWV2ZWQoKVxuICAgIH1cblxuICAgIGdldFdvcmQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMud29yZFxuICAgIH1cblxuICAgIGJpbmRPbldvcmRSZXRyaWV2ZWQoY2FsbGJhY2spe1xuICAgICAgICB0aGlzLm9uV29yZFJldHJpZXZlZCA9IGNhbGxiYWNrXG4gICAgfVxuXG5cbiAgICAvLyBJbnNlcnQgbGV0dGVycyBvZiB3b3JkIGludG8gbGV0dGVycyBwcm9wXG4gICAgc2V0TGV0dGVycygpe1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy53b3JkLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgdGhpcy5sZXR0ZXJzLnB1c2godGhpcy53b3JkLmNoYXJBdChpbmRleCkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZXQgbnVtYmVyIG9mIG1pc3Rha2VzXG4gICAgc2V0TnVtT2ZNaXN0YWtlcygpe1xuICAgICAgICB0aGlzLm51bWJlck9mTWlzdGFrZXMgPSA2O1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSBhIGxldHRlciBmcm9tIGxldHRlcnMgcHJvcFxuICAgIHJlbW92ZUxldHRlcihsZXR0ZXIpe1xuICAgICAgICB0aGlzLmxldHRlcnMgPSB0aGlzLmxldHRlcnMuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gbGV0dGVyKVxuICAgIH1cblxuICAgIC8vIFNldCB2YWx1ZSB0byBnYW1lU3RhdHVzIHByb3BcbiAgICBzZXRHYW1lU3RhdHVzKHN0YXR1cyl7XG4gICAgICAgIHRoaXMuZ2FtZVN0YXR1cyA9IHN0YXR1c1xuICAgIH1cblxuICAgIC8vIFJlc2V0cyB2YWx1ZXMgb2YgcHJvcGVydGllcyBvZiBtb2RlbFxuICAgIHJlc2V0KCl7XG4gICAgICAgIHRoaXMud29yZCA9IG51bGw7XG4gICAgICAgIHRoaXMubnVtYmVyT2ZNaXN0YWtlcyA9IG51bGw7XG4gICAgICAgIHRoaXMubGV0dGVycyA9IFtdO1xuICAgICAgICB0aGlzLmdhbWVTdGF0dXMgPSBudWxsO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBnZXRFbGVtZW50IH0gZnJvbSBcIi4vSGVscGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IHtcbiAgY29uc3RydWN0b3IoaGFuZ21hbikge1xuICAgIHRoaXMuaGFuZ21hbiA9IGhhbmdtYW47XG4gICAgdGhpcy50aWxlX2NvbnRhaW5lciA9IGdldEVsZW1lbnQoXCJ0aWxlLWNvbnRhaW5lclwiKTtcbiAgICB0aGlzLnRpbGVzID0gW107XG4gICAgdGhpcy5jb3VudGVyID0gMDtcbiAgfVxuXG4gIC8vIEdldCBsZW5ndGggb2YgdGhlIHdvcmRcbiAgY3JlYXRlVGlsZXMod29yZCkge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB3b3JkLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgdGlsZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJ0aWxlLWNvbnRhaW5lcl9fdGlsZVwiKTtcbiAgICAgIHRpbGUuZGF0YXNldC5sZXR0ZXIgPSB3b3JkW2luZGV4XTtcbiAgICAgIHRoaXMudGlsZV9jb250YWluZXIuYXBwZW5kQ2hpbGQodGlsZSk7XG4gICAgICB0aGlzLnRpbGVzLnB1c2godGlsZSk7XG4gICAgfVxuICB9XG5cbiAgLy8hIEZpeCB2YXJpYWJsZSBhc3NpZ25tZW50XG4gIGFkZExldHRlcnMobGV0dGVyKSB7XG4gICAgdGhpcy50aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICBpZiAodGlsZS5kYXRhc2V0LmxldHRlciA9PT0gbGV0dGVyKSB0aWxlLnRleHRDb250ZW50ID0gbGV0dGVyO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpbnRXb3JkKCkge1xuICAgIHRoaXMudGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgICAgdGlsZS50ZXh0Q29udGVudCA9IHRpbGUuZGF0YXNldC5sZXR0ZXI7XG4gICAgfSk7XG4gIH1cblxuICBiaW5kT25UaWxlQnV0dG9uc0NsaWNrZWQgPSAoaGFuZGxlcikgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmtleWJvYXJkLWNvbnRhaW5lcl9fYnV0dG9uXCIpO1xuICAgIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGhhbmRsZXIoZSk7XG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbihlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGFzeW5jIGZsYXNoUmVkKCkge1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcInJlZEZsYXNoXCIpO1xuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUoKSwgMjAwMCk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwicmVkRmxhc2hcIik7XG4gIH1cblxuICBhc3luYyBmbGFzaEdyZWVuKCkge1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcImdyZWVuRmxlYXNoXCIpO1xuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUoKSwgMjAwMCk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiZ3JlZW5GbGVhc2hcIik7XG4gIH1cblxuICBkaXNhYmxlQnV0dG9uKHsgY3VycmVudFRhcmdldCB9KSB7XG4gICAgY29uc3QgYnV0dG9uID0gY3VycmVudFRhcmdldDtcbiAgICBidXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICB9XG5cbiAgZW5hYmxlQWxsQnV0dG9ucygpIHtcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5rZXlib2FyZC1jb250YWluZXJfX2J1dHRvblwiKTtcbiAgICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJCb2R5UGFydCgpIHtcbiAgICB0aGlzLmhhbmdtYW4uZHJhd0JvZHlQYXJ0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuaGFuZ21hbi5kcmF3KCk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IERpY3Rpb25hcnkgZnJvbSBcIi4vbW9kdWxlcy9EaWN0aW9uYXJ5XCI7XG5pbXBvcnQgTW9kZWwgZnJvbSBcIi4vbW9kdWxlcy9Nb2RlbFwiO1xuaW1wb3J0IEhhbmdtYW4gZnJvbSBcIi4vbW9kdWxlcy9IYW5nbWFuXCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi9tb2R1bGVzL1ZpZXdcIjtcbmltcG9ydCBDb250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZ2V0RWxlbWVudCB9IGZyb20gXCIuL21vZHVsZXMvSGVscGVyc1wiO1xuXG5jb25zdCBoYW5nbWFuID0gbmV3IEhhbmdtYW4oKVxuLy8gaGFuZ21hbi5kcmF3KClcbmNvbnN0IHZpZXcgPSBuZXcgVmlldyhoYW5nbWFuKVxuY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwoRGljdGlvbmFyeSlcbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcihtb2RlbCwgdmlldylcblxuY29udHJvbGxlci5pbml0KClcblxuLy8gY29uc3Qgd29yZCA9IG1vZGVsLmRpY3Rpb25hcnkuZmV0Y2hXb3JkKClcbi8vIGNvbnNvbGUubG9nKHdvcmQpO1xuLy8gdmlldy5hZGRMZXR0ZXJzKCdhJylcbi8vIHZpZXcuZmxhc2hSZWQoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==