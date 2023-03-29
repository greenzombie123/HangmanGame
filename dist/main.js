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

    ctx.save()
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

  reset(){
    const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 600, 300)
    ctx.restore()
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
    }
    else if(this.backDrop.classList.contains("backdrop_open")){
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
    this.toggleBackDrop(false)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksVUFBVTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksb0NBQW9DO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBLGlFQUFlO0FBQ2Y7QUFDQSxDQUFDLEVBQUM7O0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QnVDOztBQUV4QjtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixvREFBVTtBQUMvQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0RBQVU7QUFDL0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0RBQVU7QUFDL0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9EQUFVO0FBQy9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvREFBVTtBQUM3Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5WkE7QUFDQSwwQ0FBMEMsUUFBUTtBQUNsRCx1Q0FBdUMsVUFBVTtBQUNqRDtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLFVBQVU7QUFDckQ7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1RBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3pFc0Q7O0FBRXZDO0FBQ2Y7QUFDQTtBQUNBLDBCQUEwQixvREFBVTtBQUNwQztBQUNBO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCLHdCQUF3QixvREFBVTtBQUNsQyx1QkFBdUIsb0RBQVU7QUFDakMsdUJBQXVCLG9EQUFVO0FBQ2pDLG9CQUFvQixvREFBVTtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLHFCQUFxQjtBQUM3QyxtQkFBbUIsdURBQWE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBOztBQUVBLGtCQUFrQixlQUFlO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMxS0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ1Y7QUFDSTtBQUNOO0FBQ1k7QUFDZ0I7O0FBRTlELG9CQUFvQix3REFBTztBQUMzQjtBQUNBLGlCQUFpQixxREFBSTtBQUNyQixrQkFBa0Isc0RBQUssQ0FBQywyREFBVTtBQUNsQyx1QkFBdUIsMkRBQVU7O0FBRWpDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9Db250cm9sbGVyLmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvRGljdGlvbmFyeS5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL0hhbmdtYW4uanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9IZWxwZXJzLmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvTW9kZWwuanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9WaWV3LmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hhbmdtYW5nYW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2hhbmdtYW5nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCB2aWV3KSB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gIH1cblxuICBnZXRXb3JkID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld1dvcmQgPSB0aGlzLm1vZGVsLmdldFdvcmQoKTtcbiAgICBjb25zb2xlLmxvZyhuZXdXb3JkKTtcbiAgICB0aGlzLnZpZXcuY3JlYXRlVGlsZXMobmV3V29yZCk7XG4gIH07XG5cbiAgY2hlY2tsZXR0ZXIoY2hvc2VuTGV0dGVyKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWwubGV0dGVycy5zb21lKChsZXR0ZXIpID0+IGxldHRlciA9PT0gY2hvc2VuTGV0dGVyKTtcbiAgfVxuXG4gIGNoZWNrV29yZCh3b3JkKSB7XG4gICAgY29uc29sZS5sb2cod29yZCk7XG4gICAgcmV0dXJuIHRoaXMubW9kZWwud29yZCA9PT0gd29yZC50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgZ3Vlc3NMZXR0ZXIgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGN1cnJlbnRUYXJnZXQ6IHsgdGV4dENvbnRlbnQgfSxcbiAgICB9ID0gZTtcbiAgICBjb25zdCBsZXR0ZXIgPSB0ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh0aGlzLmNoZWNrbGV0dGVyKGxldHRlcikpIHtcbiAgICAgIHRoaXMubW9kZWwucmVtb3ZlTGV0dGVyKGxldHRlcik7XG4gICAgICB0aGlzLnZpZXcuYWRkTGV0dGVycyhsZXR0ZXIpO1xuICAgICAgdGhpcy52aWV3LmZsYXNoR3JlZW4oKTtcbiAgICAgIHRoaXMuY2hlY2tXaW5uZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWV3LmZsYXNoUmVkKCk7XG4gICAgICB0aGlzLnZpZXcucmVuZGVyQm9keVBhcnQoKTtcbiAgICAgIHRoaXMubW9kZWwuaW5jcmVhc2VOdW1PZk1pc3Rha2VzKCk7XG4gICAgICB0aGlzLmNoZWNrTG9zZXIoKTtcbiAgICB9XG4gIH07XG5cbiAgZ3Vlc3NXb3JkID0gKHdvcmQpID0+IHtcbiAgICBpZiAodGhpcy5jaGVja1dvcmQod29yZCkpIHtcbiAgICAgIHRoaXMudmlldy5wcmludFdvcmQoKTtcbiAgICAgIHRoaXMudmlldy5mbGFzaEdyZWVuKCk7XG4gICAgICB0aGlzLmNoZWNrV2lubmVyKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXcuZmxhc2hSZWQoKTtcbiAgICAgIHRoaXMudmlldy5yZW5kZXJCb2R5UGFydCgpO1xuICAgICAgdGhpcy5jaGVja0xvc2VyKClcbiAgICB9XG4gIH07XG5cbiAgY2hlY2tXaW5uZXIoaXNXb3JkQ29ycmVjdCA9IGZhbHNlKSB7XG4gICAgY29uc3QgeyBsZXR0ZXJzIH0gPSB0aGlzLm1vZGVsO1xuICAgIGlmICghbGV0dGVycy5sZW5ndGggfHwgaXNXb3JkQ29ycmVjdCkge1xuICAgICAgdGhpcy5tb2RlbC5zZXRHYW1lU3RhdHVzKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrTG9zZXIoKSB7XG4gICAgY29uc3QgeyBudW1iZXJPZk1pc3Rha2VzLCBsaW1pdE9mTWlzdGFrZXMgfSA9IHRoaXMubW9kZWw7XG4gICAgaWYgKG51bWJlck9mTWlzdGFrZXMgPT09IGxpbWl0T2ZNaXN0YWtlcykge1xuICAgICAgdGhpcy5tb2RlbC5zZXRHYW1lU3RhdHVzKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBvbkdhbWVTdGF0dXNVcGRhdGVkID0gKGlzV2lubmVyKSA9PiB7XG4gICAgdGhpcy52aWV3LmRpc3BsYXlHYW1lU3RhdHVzKGlzV2lubmVyKVxuICB9XG5cbiAgc3RhcnROZXdHYW1lID0gKCkgPT4ge1xuICAgIHRoaXMucmVzZXQoKVxuICAgIHRoaXMubW9kZWwuaW5pdCgpO1xuICAgIHRoaXMudmlldy5pbml0KCk7XG4gIH1cblxuICBzdGFydEZpcnN0R2FtZSA9ICgpID0+IHtcbiAgICB0aGlzLm1vZGVsLmJpbmRPbldvcmRSZXRyaWV2ZWQodGhpcy5nZXRXb3JkKTtcbiAgICB0aGlzLm1vZGVsLmJpbmRPbkdhbWVTdGF0dXNVcGRhdGVkKHRoaXMub25HYW1lU3RhdHVzVXBkYXRlZCk7XG4gICAgdGhpcy52aWV3LmJpbmRPblRpbGVCdXR0b25zQ2xpY2tlZCh0aGlzLmd1ZXNzTGV0dGVyKTtcbiAgICB0aGlzLnZpZXcuYmluZE9uV29yZEJ1dHRvbkNsaWNrZWQodGhpcy5ndWVzc1dvcmQpO1xuICAgIHRoaXMudmlldy5pbml0KCk7XG4gICAgdGhpcy5tb2RlbC5pbml0KCk7XG5cbiAgICB0aGlzLnZpZXcuY2hhbmdlR2FtZUJ1dHRvbigpXG4gIH1cblxuICByZXNldCgpe1xuICAgIHRoaXMubW9kZWwucmVzZXQoKVxuICAgIHRoaXMudmlldy5yZXNldCgpXG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMudmlldy5iaW5kT25HYW1lQnV0dG9uQ2xpY2tlZCh0aGlzLnN0YXJ0Rmlyc3RHYW1lKVxuICAgIHRoaXMudmlldy5iaW5kT25SZXNldEJ1dHRvbkNsaWNrZWQodGhpcy5zdGFydE5ld0dhbWUpXG4gIH1cbn1cbiIsIi8vIEdldCBhIHdvcmQgZnJvbSBBUEkuIFJldHVybiB3b3JkLlxuY29uc3QgY29uZmlnID0ge1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcIlgtQXBpLUtleVwiOiBcIkp1S3YreUNYUzFaR01vd2Q5N0F3RWc9PVRCeU9VM0xONzBhc3NOMWtcIixcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0sXG4gIH07XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoV29yZCgpIHtcbiAgICBcbiAgdHJ5IHtcbiAgICBjb25zdCB3b3JkbGlzdCA9IFtcIndvcmRcIl07XG4gICAgY29uc3QgbnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd29yZGxpc3QubGVuZ3RoKTtcbiAgICByZXR1cm4gd29yZGxpc3RbbnVtXTtcbiAgICAvLyBsZXQgd29yZCA9IGF3YWl0IGZldGNoKFxuICAgIC8vICAgICBcImh0dHBzOi8vYXBpLmFwaS1uaW5qYXMuY29tL3YxL3JhbmRvbXdvcmRcIixcbiAgICAvLyAgICAgY29uZmlnXG4gICAgLy8gKTtcbiAgICAvLyB3b3JkID0gYXdhaXQgd29yZC5qc29uKCk7XG4gICAgLy8gcmV0dXJuIHdvcmQud29yZDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBmZXRjaFdvcmQsXG59O1xuXG4vL0FQSSBKdUt2K3lDWFMxWkdNb3dkOTdBd0VnPT1UQnlPVTNMTjcwYXNzTjFrXG4iLCJpbXBvcnQgeyBnZXRFbGVtZW50IH0gZnJvbSBcIi4vSGVscGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYW5nbWFuIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5udW1PZkJvZHlQYXJ0cyA9IDA7XG4gIH1cblxuICAvLyBoIDMwMCB3IDYwMFxuICBkcmF3KCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGN0eC5zYXZlKClcbiAgICBjdHgudHJhbnNsYXRlKDE1MCwgMCk7XG5cbiAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgfVxuXG4gIGRyYXdCb2R5UGFydCgpIHtcbiAgICB0aGlzLm51bU9mQm9keVBhcnRzICs9IDE7XG4gICAgc3dpdGNoICh0aGlzLm51bU9mQm9keVBhcnRzKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHRoaXMuYW5pbWF0ZUhlYWQoKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgdGhpcy5hbmltYXRlQm9keSgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB0aGlzLmFuaW1hdGVMZWZ0TGVnKClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHRoaXMuYW5pbWF0ZVJpZ2h0TGVnKClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDU6XG4gICAgICAgIHRoaXMuYW5pbWF0ZUxlZnRBcm0oKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgdGhpcy5hbmltYXRlUmlnaHRBcm0oKVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGRyYXdIYW5nZXIoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY29uc3QgaGFuZ2VyID0gbmV3IFBhdGgyRCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgaGFuZ2VyLm1vdmVUbygxMCwgMjkwKTtcbiAgICBoYW5nZXIubGluZVRvKDExMCwgMjkwKTtcbiAgICBoYW5nZXIubGluZVRvKDExMCwgMjcwKTtcbiAgICBoYW5nZXIubGluZVRvKDcwLCAyNzApO1xuICAgIGhhbmdlci5saW5lVG8oNzAsIDUwKTtcbiAgICBoYW5nZXIubGluZVRvKDIyMCwgNTApO1xuICAgIGhhbmdlci5saW5lVG8oMjIwLCA4MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygyMzAsIDgwKTtcbiAgICBoYW5nZXIubGluZVRvKDIzMCwgNDApO1xuICAgIGhhbmdlci5saW5lVG8oNTAsIDQwKTtcbiAgICBoYW5nZXIubGluZVRvKDUwLCAyNzApO1xuICAgIGhhbmdlci5saW5lVG8oMTAsIDI3MCk7XG4gICAgY3R4LmZpbGwoaGFuZ2VyKTtcbiAgfVxuXG4gIGFuaW1hdGVIZWFkKCkge1xuICAgIGxldCBzdGFydCA9IDMwMTtcbiAgICBjb25zdCBFTkQgPSAxMDI7XG4gICAgLy8gOThcblxuICAgIGNvbnN0IGRyYXcgPSAodGltZSkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcblxuICAgICAgLy8gSGVhZFxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5hcmMoMjI1LCBzdGFydCwgMjAsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICAgIGN0eC5hcmMoMjI1LCBzdGFydCwgMTgsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICAgIGN0eC5hcmMoMjE2LCBzdGFydCAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5tb3ZlVG8oMjM4LCAxMDEpO1xuICAgICAgY3R4LmFyYygyMzMsIHN0YXJ0IC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIGN0eC5maWxsUmVjdCgyMTUsIHN0YXJ0ICsgNywgMjAsIDMpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVySGVhZCgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBIZWFkXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYygyMjUsIDEwMiwgMjAsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgY3R4LmFyYygyMjUsIDEwMiwgMTgsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgY3R4LmFyYygyMTYsIDEwMiAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHgubW92ZVRvKDIzOCwgMTAxKTtcbiAgICBjdHguYXJjKDIzMywgMTAyIC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LmZpbGxSZWN0KDIxNSwgMTAyICsgNywgMjAsIDMpO1xuICB9XG5cbiAgYW5pbWF0ZUJvZHkoKSB7XG4gICAgbGV0IHN0YXJ0ID0gMzIxO1xuICAgIGNvbnN0IEVORCA9IDEyNTtcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIC8vIEhlYWRcbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG5cbiAgICAgIGN0eC5maWxsUmVjdCgyMjIsIHN0YXJ0LCA1LCA1MCk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJCb2R5KCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIEJvZHlcblxuICAgIGN0eC5maWxsUmVjdCgyMjIsIDEyMCwgNSwgNTApO1xuICB9XG5cbiAgYW5pbWF0ZUxlZnRMZWcoKSB7XG4gICAgbGV0IHN0YXJ0ID0gMjIxO1xuICAgIGNvbnN0IEVORCA9IC0xMTtcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG4gICAgICB0aGlzLnJlbmRlckJvZHkoKTtcblxuICAgICAgLy8gTGVmdCBMZWdcbiAgICAgIGN0eC5zYXZlKCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogNDUpO1xuICAgICAgY3R4LmZpbGxSZWN0KC0yMiwgc3RhcnQsIDUsIDUwKTtcbiAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJMZWZ0TGVnKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIExlZnQgTGVnXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiA0NSk7XG4gICAgY3R4LmZpbGxSZWN0KC0yMiwgLTIxLCA1LCA1MCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIGFuaW1hdGVSaWdodExlZygpIHtcbiAgICBsZXQgc3RhcnQgPSAyMjE7XG4gICAgY29uc3QgRU5EID0gLTI3O1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gICAgICB0aGlzLnJlbmRlckhlYWQoKTtcbiAgICAgIHRoaXMucmVuZGVyQm9keSgpO1xuICAgICAgdGhpcy5yZW5kZXJMZWZ0TGVnKCk7XG5cbiAgICAgIC8vIExlZnQgTGVnXG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmx1ZVwiO1xuICAgICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogMTM1KTtcbiAgICAgIGN0eC5maWxsUmVjdCgtMjMsIHN0YXJ0LCA1LCA1MCk7XG4gICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyUmlnaHRMZWcoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gUmlnaHQgTGVnXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiAxMzUpO1xuICAgIGN0eC5maWxsUmVjdCgtMjMsIC0yNywgNSwgNTApO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBhbmltYXRlTGVmdEFybSgpIHtcbiAgICBsZXQgc3RhcnQgPSAzMjE7XG4gICAgY29uc3QgRU5EID0gMTQwO1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gICAgICB0aGlzLnJlbmRlckhlYWQoKTtcbiAgICAgIHRoaXMucmVuZGVyQm9keSgpO1xuICAgICAgdGhpcy5yZW5kZXJMZWZ0TGVnKCk7XG4gICAgICB0aGlzLnJlbmRlclJpZ2h0TGVnKCk7XG5cbiAgICAgIC8vIExlZnQgQXJtXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LmZpbGxSZWN0KDE3MSwgc3RhcnQsIDUwLCA1KTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlckxlZnRBcm0oKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gTGVmdCBBcm1cbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5maWxsUmVjdCgxNzEsIDEzMCwgNTAsIDUpO1xuICB9XG5cbiAgYW5pbWF0ZVJpZ2h0QXJtKCkge1xuICAgIGxldCBzdGFydCA9IDMyMTtcbiAgICBjb25zdCBFTkQgPSAxNDA7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuICAgICAgdGhpcy5yZW5kZXJCb2R5KCk7XG4gICAgICB0aGlzLnJlbmRlckxlZnRMZWcoKTtcbiAgICAgIHRoaXMucmVuZGVyUmlnaHRMZWcoKTtcbiAgICAgIHRoaXMucmVuZGVyTGVmdEFybSgpO1xuXG4gICAgICAvLyBSaWdodCBBcm1cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHguZmlsbFJlY3QoMjI3LCBzdGFydCwgNTAsIDUpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyUmlnaHRBcm0oKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gUmlnaHQgQXJtXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguZmlsbFJlY3QoMjI3LCAxNDAsIDUwLCA1KTtcbiAgfVxuXG4gIHJlc2V0KCl7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCA2MDAsIDMwMClcbiAgICBjdHgucmVzdG9yZSgpXG4gIH1cblxuICByZW5kZXJXaW5uZXIoKXtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjdHgudHJhbnNsYXRlKC0xMDAsIDApO1xuXG4gICAgLy8gSGVhZFxuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoMzI1LCAyMDIsIDIwLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oMjIwLCAxMDEpO1xuICAgIGN0eC5hcmMoMzI1LCAyMDIsIDE4LCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oMjIwLCAxMDEpO1xuICAgIGN0eC5hcmMoMzE2LCAyMDIgLSAzLCAzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4Lm1vdmVUbygyMzgsIDEwMSk7XG4gICAgY3R4LmFyYygzMzMsIDIwMiAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHgubW92ZVRvKDMzMywgMjIwKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgLy8gU21pbGVcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygzMTQsIDIwNSk7XG4gICAgY3R4LmFyYygzMjQsIDIwNSwgMTAsIDAsIE1hdGguUEksIGZhbHNlKTtcbiAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAvLyBCb2R5XG5cbiAgICBjdHguZmlsbFJlY3QoMzIyLCAyMjAsIDUsIDUwKTtcblxuICAgICAvLyBMZWZ0IExlZ1xuICAgICBjdHguc2F2ZSgpO1xuICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDQ1KTtcbiAgICAgY3R4LmZpbGxSZWN0KDEyMCwgLTIwLCA1LCA1MCk7XG4gICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgLy8gUmlnaHQgTGVnXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiAxMzUpO1xuICAgIGN0eC5maWxsUmVjdCgtMjMsIC0xNjksIDUsIDUwKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgLy8gTGVmdCBBcm1cbiAgICBjdHguc2F2ZSgpO1xuICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDQ1KTtcbiAgICAgY3R4LmZpbGxSZWN0KDEwMCwgLTkwLCA1LCA1MCk7XG4gICAgIGN0eC5yZXN0b3JlKCk7XG5cblxuICAgIC8vIFJpZ2h0IEFybVxuICAgIGN0eC5zYXZlKCk7XG4gICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogMTM1KTtcbiAgICAgY3R4LmZpbGxSZWN0KC00MCwgLTEwMCwgNSwgNTApO1xuICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgLy8gIGN0eC50cmFuc2xhdGUoMzAwLCAwKTtcbiAgfVxufVxuIiwiZnVuY3Rpb24gY3JlYXRlRWxlbWVudChlbGVtZW50LCBjbGFzc05hbWUpe1xuICAgIGNvbnN0IGVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYCR7ZWxlbWVudH1gKVxuICAgIGlmKGNsYXNzTmFtZSkgZWxlLmNsYXNzTGlzdC5hZGQoYCR7Y2xhc3NOYW1lfWApXG4gICAgcmV0dXJuIGVsZVxufVxuXG5mdW5jdGlvbiBnZXRFbGVtZW50KGNsYXNzTmFtZSl7XG4gICAgY29uc3QgZWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lfWApXG4gICAgcmV0dXJuIGVsZVxufVxuXG5leHBvcnQge2NyZWF0ZUVsZW1lbnQsIGdldEVsZW1lbnR9IiwiLy8gaW1wb3J0IERpY3Rpb25hcnkgZnJvbSBcIi4vRGljdGlvbmFyeVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbCB7XG4gIGNvbnN0cnVjdG9yKGRpY3Rpb25hcnkpIHtcbiAgICB0aGlzLndvcmQgPSBudWxsO1xuICAgIHRoaXMubnVtYmVyT2ZNaXN0YWtlcyA9IDA7XG4gICAgdGhpcy5saW1pdE9mTWlzdGFrZXMgPSA2O1xuICAgIHRoaXMubGV0dGVycyA9IFtdO1xuICAgIHRoaXMuZ2FtZVN0YXR1cyA9IG51bGw7XG4gICAgdGhpcy5kaWN0aW9uYXJ5ID0gZGljdGlvbmFyeTtcbiAgfVxuXG4gIC8vIEdldCB3b3JkIGZyb20gQVBJIGFuZCBzZXQgdG8gd29yZCBwcm9wZXJ0eVxuICBhc3luYyBmZXRjaFdvcmQoKSB7XG4gICAgdGhpcy53b3JkID0gYXdhaXQgdGhpcy5kaWN0aW9uYXJ5LmZldGNoV29yZCgpO1xuICAgIHRoaXMuc2V0TGV0dGVycygpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubGV0dGVycyk7XG4gICAgdGhpcy5vbldvcmRSZXRyaWV2ZWQoKTtcbiAgfVxuXG4gIGdldFdvcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMud29yZDtcbiAgfVxuXG4gIGJpbmRPbldvcmRSZXRyaWV2ZWQoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uV29yZFJldHJpZXZlZCA9IGNhbGxiYWNrO1xuICB9XG5cbiAgYmluZE9uR2FtZVN0YXR1c1VwZGF0ZWQoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uR2FtZVN0YXR1c1VwZGF0ZWQgPSBjYWxsYmFjaztcbiAgfVxuXG4gIC8vIEluc2VydCBsZXR0ZXJzIG9mIHdvcmQgaW50byBsZXR0ZXJzIHByb3BcbiAgc2V0TGV0dGVycygpIHtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy53b3JkLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdGhpcy5sZXR0ZXJzLnB1c2godGhpcy53b3JkLmNoYXJBdChpbmRleCkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNldCBudW1iZXIgb2YgbWlzdGFrZXNcbiAgc2V0TGltaXRvZk1pc3Rha2VzKG51bWJlcikge1xuICAgIHRoaXMubGltaXRPZk1pc3Rha2VzID0gbnVtYmVyO1xuICB9XG5cbiAgaW5jcmVhc2VOdW1PZk1pc3Rha2VzKCkge1xuICAgIHRoaXMubnVtYmVyT2ZNaXN0YWtlcyArPSAxO1xuICB9XG5cbiAgLy8gUmVtb3ZlIGEgbGV0dGVyIGZyb20gbGV0dGVycyBwcm9wXG4gIHJlbW92ZUxldHRlcihsZXR0ZXIpIHtcbiAgICB0aGlzLmxldHRlcnMgPSB0aGlzLmxldHRlcnMuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBsZXR0ZXIpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubGV0dGVycyk7XG4gIH1cblxuICAvLyBTZXQgdmFsdWUgdG8gZ2FtZVN0YXR1cyBwcm9wXG4gIHNldEdhbWVTdGF0dXMoc3RhdHVzKSB7XG4gICAgdGhpcy5nYW1lU3RhdHVzID0gc3RhdHVzO1xuXG4gICAgdGhpcy5vbkdhbWVTdGF0dXNVcGRhdGVkKHRoaXMuZ2FtZVN0YXR1cyk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc2V0TGltaXRvZk1pc3Rha2VzKDYpO1xuICAgIHRoaXMuZmV0Y2hXb3JkKCk7XG4gIH1cblxuICAvLyBSZXNldHMgdmFsdWVzIG9mIHByb3BlcnRpZXMgb2YgbW9kZWxcbiAgcmVzZXQoKSB7XG4gICAgdGhpcy53b3JkID0gbnVsbDtcbiAgICB0aGlzLm51bWJlck9mTWlzdGFrZXMgPSBudWxsO1xuICAgIHRoaXMubGV0dGVycyA9IFtdO1xuICAgIHRoaXMuZ2FtZVN0YXR1cyA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGdldEVsZW1lbnQgfSBmcm9tIFwiLi9IZWxwZXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihoYW5nbWFuKSB7XG4gICAgdGhpcy5oYW5nbWFuID0gaGFuZ21hbjtcbiAgICB0aGlzLnRpbGVfY29udGFpbmVyID0gZ2V0RWxlbWVudChcInRpbGUtY29udGFpbmVyXCIpO1xuICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICB0aGlzLmFuaW1hdGVkRWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5kaXNwbGF5ID0gZ2V0RWxlbWVudChcImRpc3BsYXlcIik7XG4gICAgdGhpcy5kaXNwbGF5V29yZHMgPSBnZXRFbGVtZW50KFwiZGlzcGxheV9fd29yZHNcIik7XG4gICAgdGhpcy5yZXNldEJ1dHRvbiA9IGdldEVsZW1lbnQoXCJyZXNldC1idXR0b25cIik7XG4gICAgdGhpcy5zdGFydEJ1dHRvbiA9IGdldEVsZW1lbnQoXCJzdGFydC1idXR0b25cIik7XG4gICAgdGhpcy5iYWNrRHJvcCA9IGdldEVsZW1lbnQoXCJiYWNrZHJvcFwiKTtcbiAgfVxuXG4gIC8vIEdldCBsZW5ndGggb2YgdGhlIHdvcmRcbiAgY3JlYXRlVGlsZXMod29yZCkge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB3b3JkLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgdGlsZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJ0aWxlLWNvbnRhaW5lcl9fdGlsZVwiKTtcbiAgICAgIHRpbGUuZGF0YXNldC5sZXR0ZXIgPSB3b3JkW2luZGV4XTtcbiAgICAgIHRoaXMudGlsZV9jb250YWluZXIuYXBwZW5kQ2hpbGQodGlsZSk7XG4gICAgICB0aGlzLnRpbGVzLnB1c2godGlsZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTGV0dGVycyhsZXR0ZXIpIHtcbiAgICB0aGlzLnRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgIGlmICh0aWxlLmRhdGFzZXQubGV0dGVyID09PSBsZXR0ZXIpIHRpbGUudGV4dENvbnRlbnQgPSBsZXR0ZXI7XG4gICAgfSk7XG4gIH1cblxuICBwcmludFdvcmQoKSB7XG4gICAgdGhpcy50aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICB0aWxlLnRleHRDb250ZW50ID0gdGlsZS5kYXRhc2V0LmxldHRlcjtcbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRPblRpbGVCdXR0b25zQ2xpY2tlZCA9IChoYW5kbGVyKSA9PiB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIua2V5Ym9hcmQtY29udGFpbmVyX19idXR0b25cIik7XG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaGFuZGxlcihlKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgYmluZE9uV29yZEJ1dHRvbkNsaWNrZWQgPSAoaGFuZGxlcikgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGdldEVsZW1lbnQoXCJndWVzcy1idXR0b25cIik7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmd1ZXNzLWlucHV0XCIpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaGFuZGxlcihpbnB1dC52YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgYmluZE9uR2FtZUJ1dHRvbkNsaWNrZWQgPSAoaGFuZGxlcikgPT4ge1xuICAgIHRoaXMuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGhhbmRsZXIoKTtcbiAgICB9KTtcbiAgfTtcblxuICBiaW5kT25SZXNldEJ1dHRvbkNsaWNrZWQgPSAoaGFuZGxlcikgPT4ge1xuICAgIHRoaXMucmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGhhbmRsZXIoKTtcbiAgICB9KTtcbiAgfTtcblxuICBjaGFuZ2VHYW1lQnV0dG9uKCkge1xuICAgIHRoaXMucmVzZXRCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB0aGlzLnN0YXJ0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgfVxuXG4gIGZsYXNoUmVkKCkge1xuICAgIGlmICh0aGlzLmFuaW1hdGVkRWxlbWVudCkge1xuICAgICAgaWYgKHRoaXMuYW5pbWF0ZWRFbGVtZW50LmN1cnJlbnRUaW1lKSB0aGlzLmFuaW1hdGVkRWxlbWVudC5jYW5jZWwoKTtcbiAgICB9XG4gICAgY29uc3QgYW5pbWF0aW9uID0gW1xuICAgICAge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsIDAsIDAsIDAuMzQ2KVwiLFxuICAgICAgfSxcblxuICAgICAge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIixcbiAgICAgIH0sXG4gICAgXTtcbiAgICBjb25zdCBhbmltYXRpb25UaW1lID0geyBkdXJhdGlvbjogMTAwMCB9O1xuICAgIHRoaXMuYW5pbWF0ZWRFbGVtZW50ID0gZG9jdW1lbnQuYm9keS5hbmltYXRlKGFuaW1hdGlvbiwgYW5pbWF0aW9uVGltZSk7XG4gIH1cblxuICBmbGFzaEdyZWVuKCkge1xuICAgIGlmICh0aGlzLmFuaW1hdGVkRWxlbWVudCkge1xuICAgICAgaWYgKHRoaXMuYW5pbWF0ZWRFbGVtZW50LmN1cnJlbnRUaW1lKSB0aGlzLmFuaW1hdGVkRWxlbWVudC5jYW5jZWwoKTtcbiAgICB9XG4gICAgY29uc3QgYW5pbWF0aW9uID0gW1xuICAgICAge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyLCAyMTQsIDIsIDAuNTMzKVwiLFxuICAgICAgfSxcblxuICAgICAge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIixcbiAgICAgIH0sXG4gICAgXTtcbiAgICBjb25zdCBhbmltYXRpb25UaW1lID0geyBkdXJhdGlvbjogMTAwMCB9O1xuICAgIHRoaXMuYW5pbWF0ZWRFbGVtZW50ID0gZG9jdW1lbnQuYm9keS5hbmltYXRlKGFuaW1hdGlvbiwgYW5pbWF0aW9uVGltZSk7XG4gIH1cblxuICBkaXNhYmxlQnV0dG9uKHsgY3VycmVudFRhcmdldCB9KSB7XG4gICAgY29uc3QgYnV0dG9uID0gY3VycmVudFRhcmdldDtcbiAgICBidXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICB9XG5cbiAgZW5hYmxlQWxsQnV0dG9ucygpIHtcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5rZXlib2FyZC1jb250YWluZXJfX2J1dHRvblwiKTtcbiAgICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJCb2R5UGFydCgpIHtcbiAgICB0aGlzLmhhbmdtYW4uZHJhd0JvZHlQYXJ0KCk7XG4gIH1cblxuICBkaXNwbGF5R2FtZVN0YXR1cyA9IChpc1dpbm5lcikgPT4ge1xuICAgIGlmIChpc1dpbm5lcikge1xuICAgICAgdGhpcy5oYW5nbWFuLnJlbmRlcldpbm5lcigpO1xuICAgICAgdGhpcy5zaG93RGlzcGxheWVyKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dEaXNwbGF5ZXIoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBzaG93RGlzcGxheWVyID0gKGlzV2lubmVyKSA9PiB7XG4gICAgaWYgKGlzV2lubmVyKSB7XG4gICAgICB0aGlzLmRpc3BsYXkuY2xhc3NMaXN0LnRvZ2dsZShcImRpc3BsYXlfd2lubmVyXCIpO1xuICAgICAgdGhpcy5kaXNwbGF5V29yZHMudGV4dENvbnRlbnQgPSBcIkdvb2QgSm9iIVwiO1xuICAgICAgLy8gdGhpcy5iYWNrRHJvcC5jbGFzc0xpc3QudG9nZ2xlKFwiYmFja2Ryb3Bfb3BlblwiKTtcbiAgICAgIHRoaXMudG9nZ2xlQmFja0Ryb3AodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlzcGxheS5jbGFzc0xpc3QudG9nZ2xlKFwiZGlzcGxheV9sb3NlclwiKTtcbiAgICAgIHRoaXMuZGlzcGxheVdvcmRzLnRleHRDb250ZW50ID0gXCJUb28gQmFkIVwiO1xuICAgICAgLy8gdGhpcy5iYWNrRHJvcC5jbGFzc0xpc3QudG9nZ2xlKFwiYmFja2Ryb3Bfb3BlblwiKTtcbiAgICAgIHRoaXMudG9nZ2xlQmFja0Ryb3AodHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIHRvZ2dsZUJhY2tEcm9wKGlzR2FtZURvbmUpIHtcbiAgICBpZiAoaXNHYW1lRG9uZSkge1xuICAgICAgdGhpcy5iYWNrRHJvcC5jbGFzc0xpc3QudG9nZ2xlKFwiYmFja2Ryb3Bfb3BlblwiKTtcbiAgICAgIHRoaXMucmVzZXRCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcInJlc2V0LWJ1dHRvbl9mbGFzaFwiKTtcbiAgICB9XG4gICAgZWxzZSBpZih0aGlzLmJhY2tEcm9wLmNsYXNzTGlzdC5jb250YWlucyhcImJhY2tkcm9wX29wZW5cIikpe1xuICAgICAgdGhpcy5iYWNrRHJvcC5jbGFzc0xpc3QudG9nZ2xlKFwiYmFja2Ryb3Bfb3BlblwiKTtcbiAgICAgIHRoaXMucmVzZXRCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcInJlc2V0LWJ1dHRvbl9mbGFzaFwiKTtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnRpbGVzLmZvckVhY2goKHRpbGUpID0+IHRoaXMudGlsZV9jb250YWluZXIucmVtb3ZlQ2hpbGQodGlsZSkpO1xuICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICB0aGlzLmFuaW1hdGVkRWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5kaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNwbGF5X2xvc2VyXCIpO1xuICAgIHRoaXMuZGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzcGxheV93aW5uZXJcIik7XG4gICAgdGhpcy5lbmFibGVBbGxCdXR0b25zKCk7XG4gICAgdGhpcy50b2dnbGVCYWNrRHJvcChmYWxzZSlcbiAgICB0aGlzLmhhbmdtYW4ucmVzZXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5oYW5nbWFuLmRyYXcoKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRGljdGlvbmFyeSBmcm9tIFwiLi9tb2R1bGVzL0RpY3Rpb25hcnlcIjtcbmltcG9ydCBNb2RlbCBmcm9tIFwiLi9tb2R1bGVzL01vZGVsXCI7XG5pbXBvcnQgSGFuZ21hbiBmcm9tIFwiLi9tb2R1bGVzL0hhbmdtYW5cIjtcbmltcG9ydCBWaWV3IGZyb20gXCIuL21vZHVsZXMvVmlld1wiO1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSBcIi4vbW9kdWxlcy9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBnZXRFbGVtZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9IZWxwZXJzXCI7XG5cbmNvbnN0IGhhbmdtYW4gPSBuZXcgSGFuZ21hbigpXG4vLyBoYW5nbWFuLmRyYXcoKVxuY29uc3QgdmlldyA9IG5ldyBWaWV3KGhhbmdtYW4pXG5jb25zdCBtb2RlbCA9IG5ldyBNb2RlbChEaWN0aW9uYXJ5KVxuY29uc3QgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKG1vZGVsLCB2aWV3KVxuXG5jb250cm9sbGVyLmluaXQoKVxuXG4vLyBjb25zdCB3b3JkID0gbW9kZWwuZGljdGlvbmFyeS5mZXRjaFdvcmQoKVxuLy8gY29uc29sZS5sb2cod29yZCk7XG4vLyB2aWV3LmFkZExldHRlcnMoJ2EnKVxuLy8gdmlldy5mbGFzaFJlZCgpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9