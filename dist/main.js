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
    const {
      currentTarget: { textContent },
    } = e;
    const letter = textContent.toLowerCase();
    if (this.checkletter(letter)) {
      this.model.removeLetter(letter);
      this.view.addLetters(letter);
      this.view.flashGreen()
    } else {
      this.view.flashRed();
      this.view.renderBodyPart()
    }
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
        console.log(this.letters);
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
    this.timerID = null;
    this.animatedElement = null;
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

  // TODO Finish implementation
  bindOnWordButtonClicked = (handler) => {
    const button = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("guess-button");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7QUFDZjtBQUNBLENBQUMsRUFBQzs7QUFFRjs7Ozs7Ozs7Ozs7Ozs7OztBQzlCdUM7O0FBRXhCO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixvREFBVTtBQUMvQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0RBQVU7QUFDL0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0RBQVU7QUFDL0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixvREFBVTtBQUMvQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzFVQTtBQUNBLDBDQUEwQyxRQUFRO0FBQ2xELHVDQUF1QyxVQUFVO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMsVUFBVTtBQUNyRDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDVEE7O0FBRWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsNEJBQTRCLDBCQUEwQjtBQUN0RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxRHNEOztBQUV2QztBQUNmO0FBQ0E7QUFDQSwwQkFBMEIsb0RBQVU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLHFCQUFxQjtBQUM3QyxtQkFBbUIsdURBQWE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7O0FBRUEsa0JBQWtCLGVBQWU7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzNHQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOOEM7QUFDVjtBQUNJO0FBQ047QUFDWTtBQUNnQjs7QUFFOUQsb0JBQW9CLHdEQUFPO0FBQzNCO0FBQ0EsaUJBQWlCLHFEQUFJO0FBQ3JCLGtCQUFrQixzREFBSyxDQUFDLDJEQUFVO0FBQ2xDLHVCQUF1QiwyREFBVTs7QUFFakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL0NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9EaWN0aW9uYXJ5LmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvSGFuZ21hbi5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL0hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9Nb2RlbC5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL1ZpZXcuanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2hhbmdtYW5nYW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobW9kZWwsIHZpZXcpIHtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgfVxuXG4gIGdldFdvcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3V29yZCA9IHRoaXMubW9kZWwuZ2V0V29yZCgpO1xuICAgIGNvbnNvbGUubG9nKG5ld1dvcmQpO1xuICAgIHRoaXMudmlldy5jcmVhdGVUaWxlcyhuZXdXb3JkKTtcbiAgfTtcblxuICBjaGVja2xldHRlcihjaG9zZW5MZXR0ZXIpIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5sZXR0ZXJzLnNvbWUoKGxldHRlcikgPT4gbGV0dGVyID09PSBjaG9zZW5MZXR0ZXIpO1xuICB9XG5cbiAgZ3Vlc3NMZXR0ZXIgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGN1cnJlbnRUYXJnZXQ6IHsgdGV4dENvbnRlbnQgfSxcbiAgICB9ID0gZTtcbiAgICBjb25zdCBsZXR0ZXIgPSB0ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh0aGlzLmNoZWNrbGV0dGVyKGxldHRlcikpIHtcbiAgICAgIHRoaXMubW9kZWwucmVtb3ZlTGV0dGVyKGxldHRlcik7XG4gICAgICB0aGlzLnZpZXcuYWRkTGV0dGVycyhsZXR0ZXIpO1xuICAgICAgdGhpcy52aWV3LmZsYXNoR3JlZW4oKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXcuZmxhc2hSZWQoKTtcbiAgICAgIHRoaXMudmlldy5yZW5kZXJCb2R5UGFydCgpXG4gICAgfVxuICB9O1xuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5tb2RlbC5iaW5kT25Xb3JkUmV0cmlldmVkKHRoaXMuZ2V0V29yZCk7XG4gICAgdGhpcy52aWV3LmJpbmRPblRpbGVCdXR0b25zQ2xpY2tlZCh0aGlzLmd1ZXNzTGV0dGVyKTtcbiAgICB0aGlzLnZpZXcuaW5pdCgpO1xuICAgIHRoaXMubW9kZWwuZmV0Y2hXb3JkKCk7XG4gIH1cbn1cbiIsIi8vIEdldCBhIHdvcmQgZnJvbSBBUEkuIFJldHVybiB3b3JkLlxuY29uc3QgY29uZmlnID0ge1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcIlgtQXBpLUtleVwiOiBcIkp1S3YreUNYUzFaR01vd2Q5N0F3RWc9PVRCeU9VM0xONzBhc3NOMWtcIixcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0sXG4gIH07XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoV29yZCgpIHtcbiAgICBcbiAgdHJ5IHtcbiAgICBjb25zdCB3b3JkbGlzdCA9IFtcIndvcmRcIiwgXCJhcHBsZVwiLCBcImRpY3Rpb25hcnlcIl07XG4gICAgY29uc3QgbnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd29yZGxpc3QubGVuZ3RoKTtcbiAgICByZXR1cm4gd29yZGxpc3RbbnVtXTtcbiAgICAvLyBsZXQgd29yZCA9IGF3YWl0IGZldGNoKFxuICAgIC8vICAgICBcImh0dHBzOi8vYXBpLmFwaS1uaW5qYXMuY29tL3YxL3JhbmRvbXdvcmRcIixcbiAgICAvLyAgICAgY29uZmlnXG4gICAgLy8gKTtcbiAgICAvLyB3b3JkID0gYXdhaXQgd29yZC5qc29uKCk7XG4gICAgLy8gcmV0dXJuIHdvcmQud29yZDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBmZXRjaFdvcmQsXG59O1xuXG4vL0FQSSBKdUt2K3lDWFMxWkdNb3dkOTdBd0VnPT1UQnlPVTNMTjcwYXNzTjFrXG4iLCJpbXBvcnQgeyBnZXRFbGVtZW50IH0gZnJvbSBcIi4vSGVscGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYW5nbWFuIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5udW1PZkJvZHlQYXJ0cyA9IDA7XG4gIH1cblxuICAvLyBoIDMwMCB3IDYwMFxuICBkcmF3KCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGN0eC50cmFuc2xhdGUoMTUwLCAwKTtcblxuICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICB9XG5cbiAgZHJhd0JvZHlQYXJ0KCkge1xuICAgIHRoaXMubnVtT2ZCb2R5UGFydHMgKz0gMTtcbiAgICBzd2l0Y2ggKHRoaXMubnVtT2ZCb2R5UGFydHMpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdGhpcy5hbmltYXRlSGVhZCgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICB0aGlzLmFuaW1hdGVCb2R5KClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHRoaXMuYW5pbWF0ZUxlZnRMZWcoKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgdGhpcy5hbmltYXRlUmlnaHRMZWcoKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgdGhpcy5hbmltYXRlTGVmdEFybSgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA2OlxuICAgICAgICB0aGlzLmFuaW1hdGVSaWdodEFybSgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZHJhd0hhbmdlcigpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjb25zdCBoYW5nZXIgPSBuZXcgUGF0aDJEKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBoYW5nZXIubW92ZVRvKDEwLCAyOTApO1xuICAgIGhhbmdlci5saW5lVG8oMTEwLCAyOTApO1xuICAgIGhhbmdlci5saW5lVG8oMTEwLCAyNzApO1xuICAgIGhhbmdlci5saW5lVG8oNzAsIDI3MCk7XG4gICAgaGFuZ2VyLmxpbmVUbyg3MCwgNTApO1xuICAgIGhhbmdlci5saW5lVG8oMjIwLCA1MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygyMjAsIDgwKTtcbiAgICBoYW5nZXIubGluZVRvKDIzMCwgODApO1xuICAgIGhhbmdlci5saW5lVG8oMjMwLCA0MCk7XG4gICAgaGFuZ2VyLmxpbmVUbyg1MCwgNDApO1xuICAgIGhhbmdlci5saW5lVG8oNTAsIDI3MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygxMCwgMjcwKTtcbiAgICBjdHguZmlsbChoYW5nZXIpO1xuICB9XG5cbiAgYW5pbWF0ZUhlYWQoKSB7XG4gICAgbGV0IHN0YXJ0ID0gMzAxO1xuICAgIGNvbnN0IEVORCA9IDEwMjtcbiAgICAvLyA5OFxuXG4gICAgY29uc3QgZHJhdyA9ICh0aW1lKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuXG4gICAgICAvLyBIZWFkXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYygyMjUsIHN0YXJ0LCAyMCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oMjIwLCAxMDEpO1xuICAgICAgY3R4LmFyYygyMjUsIHN0YXJ0LCAxOCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oMjIwLCAxMDEpO1xuICAgICAgY3R4LmFyYygyMTYsIHN0YXJ0IC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4Lm1vdmVUbygyMzgsIDEwMSk7XG4gICAgICBjdHguYXJjKDIzMywgc3RhcnQgLSAzLCAzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguZmlsbCgpO1xuICAgICAgY3R4LmZpbGxSZWN0KDIxNSwgc3RhcnQgKyA3LCAyMCwgMyk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJIZWFkKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIEhlYWRcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKDIyNSwgMTAyLCAyMCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICBjdHguYXJjKDIyNSwgMTAyLCAxOCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICBjdHguYXJjKDIxNiwgMTAyIC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5tb3ZlVG8oMjM4LCAxMDEpO1xuICAgIGN0eC5hcmMoMjMzLCAxMDIgLSAzLCAzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguZmlsbFJlY3QoMjE1LCAxMDIgKyA3LCAyMCwgMyk7XG4gIH1cblxuICBhbmltYXRlQm9keSgpIHtcbiAgICBsZXQgc3RhcnQgPSAzMjE7XG4gICAgY29uc3QgRU5EID0gMTI1O1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgLy8gSGVhZFxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gICAgICB0aGlzLnJlbmRlckhlYWQoKTtcblxuICAgICAgY3R4LmZpbGxSZWN0KDIyMiwgc3RhcnQsIDUsIDUwKTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlckJvZHkoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gSGVhZFxuXG4gICAgY3R4LmZpbGxSZWN0KDIyMiwgMTIwLCA1LCA1MCk7XG4gIH1cblxuICBhbmltYXRlTGVmdExlZygpIHtcbiAgICBsZXQgc3RhcnQgPSAyMjE7XG4gICAgY29uc3QgRU5EID0gLTExO1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gICAgICB0aGlzLnJlbmRlckhlYWQoKTtcbiAgICAgIHRoaXMucmVuZGVyQm9keSgpO1xuXG4gICAgICAvLyBMZWZ0IExlZ1xuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiA0NSk7XG4gICAgICBjdHguZmlsbFJlY3QoLTIyLCBzdGFydCwgNSwgNTApO1xuICAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlckxlZnRMZWcoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gTGVmdCBMZWdcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDQ1KTtcbiAgICBjdHguZmlsbFJlY3QoLTIyLCAtMjEsIDUsIDUwKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgYW5pbWF0ZVJpZ2h0TGVnKCkge1xuICAgIGxldCBzdGFydCA9IDIyMTtcbiAgICBjb25zdCBFTkQgPSAtMjc7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuICAgICAgdGhpcy5yZW5kZXJCb2R5KCk7XG4gICAgICB0aGlzLnJlbmRlckxlZnRMZWcoKTtcblxuICAgICAgLy8gTGVmdCBMZWdcbiAgICAgIGN0eC5zYXZlKCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibHVlXCI7XG4gICAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiAxMzUpO1xuICAgICAgY3R4LmZpbGxSZWN0KC0yMywgc3RhcnQsIDUsIDUwKTtcbiAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJSaWdodExlZygpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBSaWdodCBMZWdcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDEzNSk7XG4gICAgY3R4LmZpbGxSZWN0KC0yMywgLTI3LCA1LCA1MCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIGFuaW1hdGVMZWZ0QXJtKCkge1xuICAgIGxldCBzdGFydCA9IDMyMTtcbiAgICBjb25zdCBFTkQgPSAxNDA7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuICAgICAgdGhpcy5yZW5kZXJCb2R5KCk7XG4gICAgICB0aGlzLnJlbmRlckxlZnRMZWcoKTtcbiAgICAgIHRoaXMucmVuZGVyUmlnaHRMZWcoKTtcblxuICAgICAgLy8gTGVmdCBBcm1cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHguZmlsbFJlY3QoMTcxLCBzdGFydCwgNTAsIDUpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyTGVmdEFybSgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5maWxsUmVjdCgxNzEsIDEzMCwgNTAsIDUpO1xuICB9XG5cbiAgYW5pbWF0ZVJpZ2h0QXJtKCkge1xuICAgIGxldCBzdGFydCA9IDMyMTtcbiAgICBjb25zdCBFTkQgPSAxNDA7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuICAgICAgdGhpcy5yZW5kZXJCb2R5KCk7XG4gICAgICB0aGlzLnJlbmRlckxlZnRMZWcoKTtcbiAgICAgIHRoaXMucmVuZGVyUmlnaHRMZWcoKTtcbiAgICAgIHRoaXMucmVuZGVyTGVmdEFybSgpO1xuXG4gICAgICAvLyBSaWdodCBBcm1cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHguZmlsbFJlY3QoMjI3LCBzdGFydCwgNTAsIDUpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyUmlnaHRBcm0oKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguZmlsbFJlY3QoMjI3LCAxNDAsIDUwLCA1KTtcbiAgfVxufVxuIiwiZnVuY3Rpb24gY3JlYXRlRWxlbWVudChlbGVtZW50LCBjbGFzc05hbWUpe1xuICAgIGNvbnN0IGVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYCR7ZWxlbWVudH1gKVxuICAgIGlmKGNsYXNzTmFtZSkgZWxlLmNsYXNzTGlzdC5hZGQoYCR7Y2xhc3NOYW1lfWApXG4gICAgcmV0dXJuIGVsZVxufVxuXG5mdW5jdGlvbiBnZXRFbGVtZW50KGNsYXNzTmFtZSl7XG4gICAgY29uc3QgZWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lfWApXG4gICAgcmV0dXJuIGVsZVxufVxuXG5leHBvcnQge2NyZWF0ZUVsZW1lbnQsIGdldEVsZW1lbnR9IiwiLy8gaW1wb3J0IERpY3Rpb25hcnkgZnJvbSBcIi4vRGljdGlvbmFyeVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbHtcbiAgICBjb25zdHJ1Y3RvcihkaWN0aW9uYXJ5KXtcbiAgICAgICAgdGhpcy53b3JkID0gbnVsbDtcbiAgICAgICAgdGhpcy5udW1iZXJPZk1pc3Rha2VzID0gbnVsbDtcbiAgICAgICAgdGhpcy5sZXR0ZXJzID0gW107XG4gICAgICAgIHRoaXMuZ2FtZVN0YXR1cyA9IG51bGw7XG4gICAgICAgIHRoaXMuZGljdGlvbmFyeSA9IGRpY3Rpb25hcnk7XG4gICAgfVxuXG4gICAgLy8gR2V0IHdvcmQgZnJvbSBBUEkgYW5kIHNldCB0byB3b3JkIHByb3BlcnR5XG4gICAgYXN5bmMgZmV0Y2hXb3JkKCl7XG4gICAgICAgIHRoaXMud29yZCA9IGF3YWl0IHRoaXMuZGljdGlvbmFyeS5mZXRjaFdvcmQoKVxuICAgICAgICB0aGlzLnNldExldHRlcnMoKVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxldHRlcnMpO1xuICAgICAgICB0aGlzLm9uV29yZFJldHJpZXZlZCgpXG4gICAgfVxuXG4gICAgZ2V0V29yZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy53b3JkXG4gICAgfVxuXG4gICAgYmluZE9uV29yZFJldHJpZXZlZChjYWxsYmFjayl7XG4gICAgICAgIHRoaXMub25Xb3JkUmV0cmlldmVkID0gY2FsbGJhY2tcbiAgICB9XG5cblxuICAgIC8vIEluc2VydCBsZXR0ZXJzIG9mIHdvcmQgaW50byBsZXR0ZXJzIHByb3BcbiAgICBzZXRMZXR0ZXJzKCl7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLndvcmQubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICB0aGlzLmxldHRlcnMucHVzaCh0aGlzLndvcmQuY2hhckF0KGluZGV4KSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCBudW1iZXIgb2YgbWlzdGFrZXNcbiAgICBzZXROdW1PZk1pc3Rha2VzKCl7XG4gICAgICAgIHRoaXMubnVtYmVyT2ZNaXN0YWtlcyA9IDY7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGEgbGV0dGVyIGZyb20gbGV0dGVycyBwcm9wXG4gICAgcmVtb3ZlTGV0dGVyKGxldHRlcil7XG4gICAgICAgIHRoaXMubGV0dGVycyA9IHRoaXMubGV0dGVycy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBsZXR0ZXIpXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGV0dGVycyk7XG4gICAgfVxuXG4gICAgLy8gU2V0IHZhbHVlIHRvIGdhbWVTdGF0dXMgcHJvcFxuICAgIHNldEdhbWVTdGF0dXMoc3RhdHVzKXtcbiAgICAgICAgdGhpcy5nYW1lU3RhdHVzID0gc3RhdHVzXG4gICAgfVxuXG4gICAgLy8gUmVzZXRzIHZhbHVlcyBvZiBwcm9wZXJ0aWVzIG9mIG1vZGVsXG4gICAgcmVzZXQoKXtcbiAgICAgICAgdGhpcy53b3JkID0gbnVsbDtcbiAgICAgICAgdGhpcy5udW1iZXJPZk1pc3Rha2VzID0gbnVsbDtcbiAgICAgICAgdGhpcy5sZXR0ZXJzID0gW107XG4gICAgICAgIHRoaXMuZ2FtZVN0YXR1cyA9IG51bGw7XG4gICAgfVxufSIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGdldEVsZW1lbnQgfSBmcm9tIFwiLi9IZWxwZXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihoYW5nbWFuKSB7XG4gICAgdGhpcy5oYW5nbWFuID0gaGFuZ21hbjtcbiAgICB0aGlzLnRpbGVfY29udGFpbmVyID0gZ2V0RWxlbWVudChcInRpbGUtY29udGFpbmVyXCIpO1xuICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgIHRoaXMudGltZXJJRCA9IG51bGw7XG4gICAgdGhpcy5hbmltYXRlZEVsZW1lbnQgPSBudWxsO1xuICB9XG5cbiAgLy8gR2V0IGxlbmd0aCBvZiB0aGUgd29yZFxuICBjcmVhdGVUaWxlcyh3b3JkKSB7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHdvcmQubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCB0aWxlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcInRpbGUtY29udGFpbmVyX190aWxlXCIpO1xuICAgICAgdGlsZS5kYXRhc2V0LmxldHRlciA9IHdvcmRbaW5kZXhdO1xuICAgICAgdGhpcy50aWxlX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aWxlKTtcbiAgICAgIHRoaXMudGlsZXMucHVzaCh0aWxlKTtcbiAgICB9XG4gIH1cblxuICAvLyEgRml4IHZhcmlhYmxlIGFzc2lnbm1lbnRcbiAgYWRkTGV0dGVycyhsZXR0ZXIpIHtcbiAgICB0aGlzLnRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgIGlmICh0aWxlLmRhdGFzZXQubGV0dGVyID09PSBsZXR0ZXIpIHRpbGUudGV4dENvbnRlbnQgPSBsZXR0ZXI7XG4gICAgfSk7XG4gIH1cblxuICBwcmludFdvcmQoKSB7XG4gICAgdGhpcy50aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICB0aWxlLnRleHRDb250ZW50ID0gdGlsZS5kYXRhc2V0LmxldHRlcjtcbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRPblRpbGVCdXR0b25zQ2xpY2tlZCA9IChoYW5kbGVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIua2V5Ym9hcmQtY29udGFpbmVyX19idXR0b25cIik7XG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaGFuZGxlcihlKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gVE9ETyBGaW5pc2ggaW1wbGVtZW50YXRpb25cbiAgYmluZE9uV29yZEJ1dHRvbkNsaWNrZWQgPSAoaGFuZGxlcikgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGdldEVsZW1lbnQoXCJndWVzcy1idXR0b25cIik7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgICBoYW5kbGVyKGlucHV0LnRleHRDb250ZW50KTtcbiAgICB9KTtcbiAgfTtcblxuICBmbGFzaFJlZCgpIHtcbiAgICBpZiAodGhpcy5hbmltYXRlZEVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmFuaW1hdGVkRWxlbWVudC5jdXJyZW50VGltZSkgdGhpcy5hbmltYXRlZEVsZW1lbnQuY2FuY2VsKCk7XG4gICAgfVxuICAgIGNvbnN0IGFuaW1hdGlvbiA9IFtcbiAgICAgIHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LCAwLCAwLCAwLjM0NilcIixcbiAgICAgIH0sXG5cbiAgICAgIHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCIsXG4gICAgICB9LFxuICAgIF07XG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IHsgZHVyYXRpb246IDEwMDAgfTtcbiAgICB0aGlzLmFuaW1hdGVkRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuYW5pbWF0ZShhbmltYXRpb24sIGFuaW1hdGlvblRpbWUpO1xuICB9XG5cbiAgZmxhc2hHcmVlbigpIHtcbiAgICBpZiAodGhpcy5hbmltYXRlZEVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmFuaW1hdGVkRWxlbWVudC5jdXJyZW50VGltZSkgdGhpcy5hbmltYXRlZEVsZW1lbnQuY2FuY2VsKCk7XG4gICAgfVxuICAgIGNvbnN0IGFuaW1hdGlvbiA9IFtcbiAgICAgIHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMiwgMjE0LCAyLCAwLjUzMylcIixcbiAgICAgIH0sXG5cbiAgICAgIHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCIsXG4gICAgICB9LFxuICAgIF07XG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IHsgZHVyYXRpb246IDEwMDAgfTtcbiAgICB0aGlzLmFuaW1hdGVkRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuYW5pbWF0ZShhbmltYXRpb24sIGFuaW1hdGlvblRpbWUpO1xuICB9XG5cbiAgZGlzYWJsZUJ1dHRvbih7IGN1cnJlbnRUYXJnZXQgfSkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGN1cnJlbnRUYXJnZXQ7XG4gICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGVuYWJsZUFsbEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIua2V5Ym9hcmQtY29udGFpbmVyX19idXR0b25cIik7XG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyQm9keVBhcnQoKSB7XG4gICAgdGhpcy5oYW5nbWFuLmRyYXdCb2R5UGFydCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmhhbmdtYW4uZHJhdygpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBEaWN0aW9uYXJ5IGZyb20gXCIuL21vZHVsZXMvRGljdGlvbmFyeVwiO1xuaW1wb3J0IE1vZGVsIGZyb20gXCIuL21vZHVsZXMvTW9kZWxcIjtcbmltcG9ydCBIYW5nbWFuIGZyb20gXCIuL21vZHVsZXMvSGFuZ21hblwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4vbW9kdWxlcy9WaWV3XCI7XG5pbXBvcnQgQ29udHJvbGxlciBmcm9tIFwiLi9tb2R1bGVzL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGdldEVsZW1lbnQgfSBmcm9tIFwiLi9tb2R1bGVzL0hlbHBlcnNcIjtcblxuY29uc3QgaGFuZ21hbiA9IG5ldyBIYW5nbWFuKClcbi8vIGhhbmdtYW4uZHJhdygpXG5jb25zdCB2aWV3ID0gbmV3IFZpZXcoaGFuZ21hbilcbmNvbnN0IG1vZGVsID0gbmV3IE1vZGVsKERpY3Rpb25hcnkpXG5jb25zdCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIobW9kZWwsIHZpZXcpXG5cbmNvbnRyb2xsZXIuaW5pdCgpXG5cbi8vIGNvbnN0IHdvcmQgPSBtb2RlbC5kaWN0aW9uYXJ5LmZldGNoV29yZCgpXG4vLyBjb25zb2xlLmxvZyh3b3JkKTtcbi8vIHZpZXcuYWRkTGV0dGVycygnYScpXG4vLyB2aWV3LmZsYXNoUmVkKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=