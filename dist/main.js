/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
function fetchWord() {
//   const wordlist = ["word", "apple", "dictionary"];
  const wordlist = ["word"];
  const num = Math.floor(Math.random() * wordlist.length);
  return wordlist[num];
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
    this.numOfBodyParts = 0;
  }

  // h 300 w 600
  draw() {
    const canvas = (0,_Helpers__WEBPACK_IMPORTED_MODULE_0__.getElement)("canvas");
    const ctx = canvas.getContext("2d");

    ctx.translate(150, 0);

    this.drawHanger();

    this.animateRightArm();
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
    fetchWord(){
        this.word = this.dictionary.fetchWord()
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
  }

  // Get length of the word
  getWord() {
    return "banana";
  }

  createTiles() {
    const word = this.getWord();
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
/* harmony import */ var _modules_Helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/Helpers */ "./src/modules/Helpers.js");






const hangman = new _modules_Hangman__WEBPACK_IMPORTED_MODULE_2__["default"]()
// hangman.draw()
const view = new _modules_View__WEBPACK_IMPORTED_MODULE_3__["default"](hangman)
const model = new _modules_Model__WEBPACK_IMPORTED_MODULE_1__["default"](_modules_Dictionary__WEBPACK_IMPORTED_MODULE_0__["default"])
console.log(model);
view.createTiles()
view.addLetters('a')
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0NzRDs7QUFFdkM7QUFDZjtBQUNBO0FBQ0EsMEJBQTBCLG9EQUFVO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0MsbUJBQW1CLHVEQUFhO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7OztVQzlCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ044QztBQUNWO0FBQ0k7QUFDTjtBQUM0Qjs7QUFFOUQsb0JBQW9CLHdEQUFPO0FBQzNCO0FBQ0EsaUJBQWlCLHFEQUFJO0FBQ3JCLGtCQUFrQixzREFBSyxDQUFDLDJEQUFVO0FBQ2xDO0FBQ0E7QUFDQSxvQiIsInNvdXJjZXMiOlsid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvRGljdGlvbmFyeS5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL0hhbmdtYW4uanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9IZWxwZXJzLmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvTW9kZWwuanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9WaWV3LmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hhbmdtYW5nYW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2hhbmdtYW5nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gR2V0IGEgd29yZCBmcm9tIEFQSS4gUmV0dXJuIHdvcmQuXG5mdW5jdGlvbiBmZXRjaFdvcmQoKSB7XG4vLyAgIGNvbnN0IHdvcmRsaXN0ID0gW1wid29yZFwiLCBcImFwcGxlXCIsIFwiZGljdGlvbmFyeVwiXTtcbiAgY29uc3Qgd29yZGxpc3QgPSBbXCJ3b3JkXCJdO1xuICBjb25zdCBudW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3b3JkbGlzdC5sZW5ndGgpO1xuICByZXR1cm4gd29yZGxpc3RbbnVtXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBmZXRjaFdvcmQsXG59O1xuIiwiaW1wb3J0IHsgZ2V0RWxlbWVudCB9IGZyb20gXCIuL0hlbHBlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFuZ21hbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubnVtT2ZCb2R5UGFydHMgPSAwO1xuICB9XG5cbiAgLy8gaCAzMDAgdyA2MDBcbiAgZHJhdygpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjdHgudHJhbnNsYXRlKDE1MCwgMCk7XG5cbiAgICB0aGlzLmRyYXdIYW5nZXIoKTtcblxuICAgIHRoaXMuYW5pbWF0ZVJpZ2h0QXJtKCk7XG4gIH1cblxuICBkcmF3SGFuZ2VyKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGNvbnN0IGhhbmdlciA9IG5ldyBQYXRoMkQoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGhhbmdlci5tb3ZlVG8oMTAsIDI5MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygxMTAsIDI5MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygxMTAsIDI3MCk7XG4gICAgaGFuZ2VyLmxpbmVUbyg3MCwgMjcwKTtcbiAgICBoYW5nZXIubGluZVRvKDcwLCA1MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygyMjAsIDUwKTtcbiAgICBoYW5nZXIubGluZVRvKDIyMCwgODApO1xuICAgIGhhbmdlci5saW5lVG8oMjMwLCA4MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygyMzAsIDQwKTtcbiAgICBoYW5nZXIubGluZVRvKDUwLCA0MCk7XG4gICAgaGFuZ2VyLmxpbmVUbyg1MCwgMjcwKTtcbiAgICBoYW5nZXIubGluZVRvKDEwLCAyNzApO1xuICAgIGN0eC5maWxsKGhhbmdlcik7XG4gIH1cblxuICBhbmltYXRlSGVhZCgpIHtcbiAgICBsZXQgc3RhcnQgPSAzMDE7XG4gICAgY29uc3QgRU5EID0gMTAyO1xuICAgIC8vIDk4XG5cbiAgICBjb25zdCBkcmF3ID0gKHRpbWUpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG5cbiAgICAgIC8vIEhlYWRcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHguYXJjKDIyNSwgc3RhcnQsIDIwLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguZmlsbCgpO1xuXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgICBjdHguYXJjKDIyNSwgc3RhcnQsIDE4LCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguZmlsbCgpO1xuXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygyMjAsIDEwMSk7XG4gICAgICBjdHguYXJjKDIxNiwgc3RhcnQgLSAzLCAzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHgubW92ZVRvKDIzOCwgMTAxKTtcbiAgICAgIGN0eC5hcmMoMjMzLCBzdGFydCAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgICBjdHguZmlsbFJlY3QoMjE1LCBzdGFydCArIDcsIDIwLCAzKTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlckhlYWQoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gSGVhZFxuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoMjI1LCAxMDIsIDIwLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oMjIwLCAxMDEpO1xuICAgIGN0eC5hcmMoMjI1LCAxMDIsIDE4LCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oMjIwLCAxMDEpO1xuICAgIGN0eC5hcmMoMjE2LCAxMDIgLSAzLCAzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4Lm1vdmVUbygyMzgsIDEwMSk7XG4gICAgY3R4LmFyYygyMzMsIDEwMiAtIDMsIDMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5maWxsUmVjdCgyMTUsIDEwMiArIDcsIDIwLCAzKTtcbiAgfVxuXG4gIGFuaW1hdGVCb2R5KCkge1xuICAgIGxldCBzdGFydCA9IDMyMTtcbiAgICBjb25zdCBFTkQgPSAxMjU7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICAvLyBIZWFkXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuXG4gICAgICBjdHguZmlsbFJlY3QoMjIyLCBzdGFydCwgNSwgNTApO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyQm9keSgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBIZWFkXG5cbiAgICBjdHguZmlsbFJlY3QoMjIyLCAxMjAsIDUsIDUwKTtcbiAgfVxuXG4gIGFuaW1hdGVMZWZ0TGVnKCkge1xuICAgIGxldCBzdGFydCA9IDIyMTtcbiAgICBjb25zdCBFTkQgPSAtMTE7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuICAgICAgdGhpcy5yZW5kZXJCb2R5KCk7XG5cbiAgICAgIC8vIExlZnQgTGVnXG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDQ1KTtcbiAgICAgIGN0eC5maWxsUmVjdCgtMjIsIHN0YXJ0LCA1LCA1MCk7XG4gICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyTGVmdExlZygpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBMZWZ0IExlZ1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogNDUpO1xuICAgIGN0eC5maWxsUmVjdCgtMjIsIC0yMSwgNSwgNTApO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBhbmltYXRlUmlnaHRMZWcoKSB7XG4gICAgbGV0IHN0YXJ0ID0gMjIxO1xuICAgIGNvbnN0IEVORCA9IC0yNztcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG4gICAgICB0aGlzLnJlbmRlckJvZHkoKTtcbiAgICAgIHRoaXMucmVuZGVyTGVmdExlZygpO1xuXG4gICAgICAvLyBMZWZ0IExlZ1xuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsdWVcIjtcbiAgICAgIGN0eC50cmFuc2xhdGUoMjI0LjUsIDE5NSk7XG4gICAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDEzNSk7XG4gICAgICBjdHguZmlsbFJlY3QoLTIzLCBzdGFydCwgNSwgNTApO1xuICAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlclJpZ2h0TGVnKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIFJpZ2h0IExlZ1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgIGN0eC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogMTM1KTtcbiAgICBjdHguZmlsbFJlY3QoLTIzLCAtMjcsIDUsIDUwKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgYW5pbWF0ZUxlZnRBcm0oKSB7XG4gICAgbGV0IHN0YXJ0ID0gMzIxO1xuICAgIGNvbnN0IEVORCA9IDE0MDtcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG4gICAgICB0aGlzLnJlbmRlckJvZHkoKTtcbiAgICAgIHRoaXMucmVuZGVyTGVmdExlZygpO1xuICAgICAgdGhpcy5yZW5kZXJSaWdodExlZygpO1xuXG4gICAgICAvLyBMZWZ0IEFybVxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC5maWxsUmVjdCgxNzEsIHN0YXJ0LCA1MCwgNSk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJMZWZ0QXJtKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LmZpbGxSZWN0KDE3MSwgMTMwLCA1MCwgNSk7XG4gIH1cblxuICBhbmltYXRlUmlnaHRBcm0oKSB7XG4gICAgbGV0IHN0YXJ0ID0gMzIxO1xuICAgIGNvbnN0IEVORCA9IDE0MDtcblxuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuICAgICAgdGhpcy5yZW5kZXJIZWFkKCk7XG4gICAgICB0aGlzLnJlbmRlckJvZHkoKTtcbiAgICAgIHRoaXMucmVuZGVyTGVmdExlZygpO1xuICAgICAgdGhpcy5yZW5kZXJSaWdodExlZygpO1xuICAgICAgdGhpcy5yZW5kZXJMZWZ0QXJtKCk7XG5cbiAgICAgIC8vIFJpZ2h0IEFybVxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC5maWxsUmVjdCgyMjcsIHN0YXJ0LCA1MCwgNSk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJSaWdodEFybSgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5maWxsUmVjdCgyMjcsIDE0MCwgNTAsIDUpO1xuICB9XG59XG4iLCJmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGVsZW1lbnQsIGNsYXNzTmFtZSl7XG4gICAgY29uc3QgZWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgJHtlbGVtZW50fWApXG4gICAgaWYoY2xhc3NOYW1lKSBlbGUuY2xhc3NMaXN0LmFkZChgJHtjbGFzc05hbWV9YClcbiAgICByZXR1cm4gZWxlXG59XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnQoY2xhc3NOYW1lKXtcbiAgICBjb25zdCBlbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc05hbWV9YClcbiAgICByZXR1cm4gZWxlXG59XG5cbmV4cG9ydCB7Y3JlYXRlRWxlbWVudCwgZ2V0RWxlbWVudH0iLCIvLyBpbXBvcnQgRGljdGlvbmFyeSBmcm9tIFwiLi9EaWN0aW9uYXJ5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGVse1xuICAgIGNvbnN0cnVjdG9yKGRpY3Rpb25hcnkpe1xuICAgICAgICB0aGlzLndvcmQgPSBudWxsO1xuICAgICAgICB0aGlzLm51bWJlck9mTWlzdGFrZXMgPSBudWxsO1xuICAgICAgICB0aGlzLmxldHRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5nYW1lU3RhdHVzID0gbnVsbDtcbiAgICAgICAgdGhpcy5kaWN0aW9uYXJ5ID0gZGljdGlvbmFyeTtcbiAgICB9XG5cbiAgICAvLyBHZXQgd29yZCBmcm9tIEFQSSBhbmQgc2V0IHRvIHdvcmQgcHJvcGVydHlcbiAgICBmZXRjaFdvcmQoKXtcbiAgICAgICAgdGhpcy53b3JkID0gdGhpcy5kaWN0aW9uYXJ5LmZldGNoV29yZCgpXG4gICAgfVxuXG4gICAgLy8gSW5zZXJ0IGxldHRlcnMgb2Ygd29yZCBpbnRvIGxldHRlcnMgcHJvcFxuICAgIHNldExldHRlcnMoKXtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMud29yZC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHRoaXMubGV0dGVycy5wdXNoKHRoaXMud29yZC5jaGFyQXQoaW5kZXgpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0IG51bWJlciBvZiBtaXN0YWtlc1xuICAgIHNldE51bU9mTWlzdGFrZXMoKXtcbiAgICAgICAgdGhpcy5udW1iZXJPZk1pc3Rha2VzID0gNjtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgYSBsZXR0ZXIgZnJvbSBsZXR0ZXJzIHByb3BcbiAgICByZW1vdmVMZXR0ZXIobGV0dGVyKXtcbiAgICAgICAgdGhpcy5sZXR0ZXJzID0gdGhpcy5sZXR0ZXJzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGxldHRlcilcbiAgICB9XG5cbiAgICAvLyBTZXQgdmFsdWUgdG8gZ2FtZVN0YXR1cyBwcm9wXG4gICAgc2V0R2FtZVN0YXR1cyhzdGF0dXMpe1xuICAgICAgICB0aGlzLmdhbWVTdGF0dXMgPSBzdGF0dXNcbiAgICB9XG5cbiAgICAvLyBSZXNldHMgdmFsdWVzIG9mIHByb3BlcnRpZXMgb2YgbW9kZWxcbiAgICByZXNldCgpe1xuICAgICAgICB0aGlzLndvcmQgPSBudWxsO1xuICAgICAgICB0aGlzLm51bWJlck9mTWlzdGFrZXMgPSBudWxsO1xuICAgICAgICB0aGlzLmxldHRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5nYW1lU3RhdHVzID0gbnVsbDtcbiAgICB9XG59IiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZ2V0RWxlbWVudCB9IGZyb20gXCIuL0hlbHBlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG4gIGNvbnN0cnVjdG9yKGhhbmdtYW4pIHtcbiAgICB0aGlzLmhhbmdtYW4gPSBoYW5nbWFuO1xuICAgIHRoaXMudGlsZV9jb250YWluZXIgPSBnZXRFbGVtZW50KFwidGlsZS1jb250YWluZXJcIik7XG4gICAgdGhpcy50aWxlcyA9IFtdO1xuICB9XG5cbiAgLy8gR2V0IGxlbmd0aCBvZiB0aGUgd29yZFxuICBnZXRXb3JkKCkge1xuICAgIHJldHVybiBcImJhbmFuYVwiO1xuICB9XG5cbiAgY3JlYXRlVGlsZXMoKSB7XG4gICAgY29uc3Qgd29yZCA9IHRoaXMuZ2V0V29yZCgpO1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB3b3JkLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgdGlsZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJ0aWxlLWNvbnRhaW5lcl9fdGlsZVwiKTtcbiAgICAgIHRpbGUuZGF0YXNldC5sZXR0ZXIgPSB3b3JkW2luZGV4XTtcbiAgICAgIHRoaXMudGlsZV9jb250YWluZXIuYXBwZW5kQ2hpbGQodGlsZSk7XG4gICAgICB0aGlzLnRpbGVzLnB1c2godGlsZSk7XG4gICAgfVxuICB9XG5cbiAgLy8hIEZpeCB2YXJpYWJsZSBhc3NpZ25tZW50XG4gIGFkZExldHRlcnMobGV0dGVyKSB7XG4gICAgdGhpcy50aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICBpZiAodGlsZS5kYXRhc2V0LmxldHRlciA9PT0gbGV0dGVyKSB0aWxlLnRleHRDb250ZW50ID0gbGV0dGVyO1xuICAgIH0pO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBEaWN0aW9uYXJ5IGZyb20gXCIuL21vZHVsZXMvRGljdGlvbmFyeVwiO1xuaW1wb3J0IE1vZGVsIGZyb20gXCIuL21vZHVsZXMvTW9kZWxcIjtcbmltcG9ydCBIYW5nbWFuIGZyb20gXCIuL21vZHVsZXMvSGFuZ21hblwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4vbW9kdWxlcy9WaWV3XCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBnZXRFbGVtZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9IZWxwZXJzXCI7XG5cbmNvbnN0IGhhbmdtYW4gPSBuZXcgSGFuZ21hbigpXG4vLyBoYW5nbWFuLmRyYXcoKVxuY29uc3QgdmlldyA9IG5ldyBWaWV3KGhhbmdtYW4pXG5jb25zdCBtb2RlbCA9IG5ldyBNb2RlbChEaWN0aW9uYXJ5KVxuY29uc29sZS5sb2cobW9kZWwpO1xudmlldy5jcmVhdGVUaWxlcygpXG52aWV3LmFkZExldHRlcnMoJ2EnKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==