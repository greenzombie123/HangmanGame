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



// import { createElement, getElement } from "./modules/Helpers";

const hangman = new _modules_Hangman__WEBPACK_IMPORTED_MODULE_2__["default"]()
hangman.draw()
const model = new _modules_Model__WEBPACK_IMPORTED_MODULE_1__["default"](_modules_Dictionary__WEBPACK_IMPORTED_MODULE_0__["default"])
console.log(model);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDN0NBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ044QztBQUNWO0FBQ0k7QUFDeEMsWUFBWSw0QkFBNEI7O0FBRXhDLG9CQUFvQix3REFBTztBQUMzQjtBQUNBLGtCQUFrQixzREFBSyxDQUFDLDJEQUFVO0FBQ2xDLG1CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9EaWN0aW9uYXJ5LmpzIiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL21vZHVsZXMvSGFuZ21hbi5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS8uL3NyYy9tb2R1bGVzL0hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvLi9zcmMvbW9kdWxlcy9Nb2RlbC5qcyIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaGFuZ21hbmdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9oYW5nbWFuZ2FtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hhbmdtYW5nYW1lLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEdldCBhIHdvcmQgZnJvbSBBUEkuIFJldHVybiB3b3JkLlxuZnVuY3Rpb24gZmV0Y2hXb3JkKCkge1xuLy8gICBjb25zdCB3b3JkbGlzdCA9IFtcIndvcmRcIiwgXCJhcHBsZVwiLCBcImRpY3Rpb25hcnlcIl07XG4gIGNvbnN0IHdvcmRsaXN0ID0gW1wid29yZFwiXTtcbiAgY29uc3QgbnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd29yZGxpc3QubGVuZ3RoKTtcbiAgcmV0dXJuIHdvcmRsaXN0W251bV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZmV0Y2hXb3JkLFxufTtcbiIsImltcG9ydCB7IGdldEVsZW1lbnQgfSBmcm9tIFwiLi9IZWxwZXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhbmdtYW4ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm51bU9mQm9keVBhcnRzID0gMDtcbiAgfVxuXG4gIC8vIGggMzAwIHcgNjAwXG4gIGRyYXcoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY3R4LnRyYW5zbGF0ZSgxNTAsIDApO1xuXG4gICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG5cbiAgICB0aGlzLmFuaW1hdGVSaWdodEFybSgpO1xuICB9XG5cbiAgZHJhd0hhbmdlcigpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjb25zdCBoYW5nZXIgPSBuZXcgUGF0aDJEKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBoYW5nZXIubW92ZVRvKDEwLCAyOTApO1xuICAgIGhhbmdlci5saW5lVG8oMTEwLCAyOTApO1xuICAgIGhhbmdlci5saW5lVG8oMTEwLCAyNzApO1xuICAgIGhhbmdlci5saW5lVG8oNzAsIDI3MCk7XG4gICAgaGFuZ2VyLmxpbmVUbyg3MCwgNTApO1xuICAgIGhhbmdlci5saW5lVG8oMjIwLCA1MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygyMjAsIDgwKTtcbiAgICBoYW5nZXIubGluZVRvKDIzMCwgODApO1xuICAgIGhhbmdlci5saW5lVG8oMjMwLCA0MCk7XG4gICAgaGFuZ2VyLmxpbmVUbyg1MCwgNDApO1xuICAgIGhhbmdlci5saW5lVG8oNTAsIDI3MCk7XG4gICAgaGFuZ2VyLmxpbmVUbygxMCwgMjcwKTtcbiAgICBjdHguZmlsbChoYW5nZXIpO1xuICB9XG5cbiAgYW5pbWF0ZUhlYWQoKSB7XG4gICAgbGV0IHN0YXJ0ID0gMzAxO1xuICAgIGNvbnN0IEVORCA9IDEwMjtcbiAgICAvLyA5OFxuXG4gICAgY29uc3QgZHJhdyA9ICh0aW1lKSA9PiB7XG4gICAgICBpZiAoc3RhcnQgPCBFTkQpIHJldHVybjtcbiAgICAgIHN0YXJ0IC09IDEwO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG5cbiAgICAgIHRoaXMuZHJhd0hhbmdlcigpO1xuXG4gICAgICAvLyBIZWFkXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYygyMjUsIHN0YXJ0LCAyMCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oMjIwLCAxMDEpO1xuICAgICAgY3R4LmFyYygyMjUsIHN0YXJ0LCAxOCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oMjIwLCAxMDEpO1xuICAgICAgY3R4LmFyYygyMTYsIHN0YXJ0IC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4Lm1vdmVUbygyMzgsIDEwMSk7XG4gICAgICBjdHguYXJjKDIzMywgc3RhcnQgLSAzLCAzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguZmlsbCgpO1xuICAgICAgY3R4LmZpbGxSZWN0KDIxNSwgc3RhcnQgKyA3LCAyMCwgMyk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJIZWFkKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIEhlYWRcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKDIyNSwgMTAyLCAyMCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICBjdHguYXJjKDIyNSwgMTAyLCAxOCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDIyMCwgMTAxKTtcbiAgICBjdHguYXJjKDIxNiwgMTAyIC0gMywgMywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5tb3ZlVG8oMjM4LCAxMDEpO1xuICAgIGN0eC5hcmMoMjMzLCAxMDIgLSAzLCAzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguZmlsbFJlY3QoMjE1LCAxMDIgKyA3LCAyMCwgMyk7XG4gIH1cblxuICBhbmltYXRlQm9keSgpIHtcbiAgICBsZXQgc3RhcnQgPSAzMjE7XG4gICAgY29uc3QgRU5EID0gMTI1O1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgLy8gSGVhZFxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gICAgICB0aGlzLnJlbmRlckhlYWQoKTtcblxuICAgICAgY3R4LmZpbGxSZWN0KDIyMiwgc3RhcnQsIDUsIDUwKTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlckJvZHkoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gSGVhZFxuXG4gICAgY3R4LmZpbGxSZWN0KDIyMiwgMTIwLCA1LCA1MCk7XG4gIH1cblxuICBhbmltYXRlTGVmdExlZygpIHtcbiAgICBsZXQgc3RhcnQgPSAyMjE7XG4gICAgY29uc3QgRU5EID0gLTExO1xuXG4gICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgIGlmIChzdGFydCA8IEVORCkgcmV0dXJuO1xuICAgICAgc3RhcnQgLT0gMTA7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcblxuICAgICAgdGhpcy5kcmF3SGFuZ2VyKCk7XG4gICAgICB0aGlzLnJlbmRlckhlYWQoKTtcbiAgICAgIHRoaXMucmVuZGVyQm9keSgpO1xuXG4gICAgICAvLyBMZWZ0IExlZ1xuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiA0NSk7XG4gICAgICBjdHguZmlsbFJlY3QoLTIyLCBzdGFydCwgNSwgNTApO1xuICAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICB9O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIHJlbmRlckxlZnRMZWcoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgLy8gTGVmdCBMZWdcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDQ1KTtcbiAgICBjdHguZmlsbFJlY3QoLTIyLCAtMjEsIDUsIDUwKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgYW5pbWF0ZVJpZ2h0TGVnKCkge1xuICAgIGxldCBzdGFydCA9IDIyMTtcbiAgICBjb25zdCBFTkQgPSAtMjc7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuICAgICAgdGhpcy5yZW5kZXJCb2R5KCk7XG4gICAgICB0aGlzLnJlbmRlckxlZnRMZWcoKTtcblxuICAgICAgLy8gTGVmdCBMZWdcbiAgICAgIGN0eC5zYXZlKCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibHVlXCI7XG4gICAgICBjdHgudHJhbnNsYXRlKDIyNC41LCAxOTUpO1xuICAgICAgY3R4LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiAxMzUpO1xuICAgICAgY3R4LmZpbGxSZWN0KC0yMywgc3RhcnQsIDUsIDUwKTtcbiAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICByZW5kZXJSaWdodExlZygpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAvLyBSaWdodCBMZWdcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LnRyYW5zbGF0ZSgyMjQuNSwgMTk1KTtcbiAgICBjdHgucm90YXRlKChNYXRoLlBJIC8gMTgwKSAqIDEzNSk7XG4gICAgY3R4LmZpbGxSZWN0KC0yMywgLTI3LCA1LCA1MCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIGFuaW1hdGVMZWZ0QXJtKCkge1xuICAgIGxldCBzdGFydCA9IDMyMTtcbiAgICBjb25zdCBFTkQgPSAxNDA7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuICAgICAgdGhpcy5yZW5kZXJCb2R5KCk7XG4gICAgICB0aGlzLnJlbmRlckxlZnRMZWcoKTtcbiAgICAgIHRoaXMucmVuZGVyUmlnaHRMZWcoKTtcblxuICAgICAgLy8gTGVmdCBBcm1cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHguZmlsbFJlY3QoMTcxLCBzdGFydCwgNTAsIDUpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyTGVmdEFybSgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBnZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5maWxsUmVjdCgxNzEsIDEzMCwgNTAsIDUpO1xuICB9XG5cbiAgYW5pbWF0ZVJpZ2h0QXJtKCkge1xuICAgIGxldCBzdGFydCA9IDMyMTtcbiAgICBjb25zdCBFTkQgPSAxNDA7XG5cbiAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgaWYgKHN0YXJ0IDwgRU5EKSByZXR1cm47XG4gICAgICBzdGFydCAtPSAxMDtcblxuICAgICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xuXG4gICAgICB0aGlzLmRyYXdIYW5nZXIoKTtcbiAgICAgIHRoaXMucmVuZGVySGVhZCgpO1xuICAgICAgdGhpcy5yZW5kZXJCb2R5KCk7XG4gICAgICB0aGlzLnJlbmRlckxlZnRMZWcoKTtcbiAgICAgIHRoaXMucmVuZGVyUmlnaHRMZWcoKTtcbiAgICAgIHRoaXMucmVuZGVyTGVmdEFybSgpO1xuXG4gICAgICAvLyBSaWdodCBBcm1cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHguZmlsbFJlY3QoMjI3LCBzdGFydCwgNTAsIDUpO1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgcmVuZGVyUmlnaHRBcm0oKSB7XG4gICAgY29uc3QgY2FudmFzID0gZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjdHguZmlsbFJlY3QoMjI3LCAxNDAsIDUwLCA1KTtcbiAgfVxufVxuIiwiZnVuY3Rpb24gY3JlYXRlRWxlbWVudChlbGVtZW50LCBjbGFzc05hbWUpe1xuICAgIGNvbnN0IGVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYCR7ZWxlbWVudH1gKVxuICAgIGlmKGNsYXNzTmFtZSkgZWxlLmNsYXNzTGlzdC5hZGQoYCR7Y2xhc3NOYW1lfWApXG4gICAgcmV0dXJuIGVsZVxufVxuXG5mdW5jdGlvbiBnZXRFbGVtZW50KGNsYXNzTmFtZSl7XG4gICAgY29uc3QgZWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lfWApXG4gICAgcmV0dXJuIGVsZVxufVxuXG5leHBvcnQge2NyZWF0ZUVsZW1lbnQsIGdldEVsZW1lbnR9IiwiLy8gaW1wb3J0IERpY3Rpb25hcnkgZnJvbSBcIi4vRGljdGlvbmFyeVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbHtcbiAgICBjb25zdHJ1Y3RvcihkaWN0aW9uYXJ5KXtcbiAgICAgICAgdGhpcy53b3JkID0gbnVsbDtcbiAgICAgICAgdGhpcy5udW1iZXJPZk1pc3Rha2VzID0gbnVsbDtcbiAgICAgICAgdGhpcy5sZXR0ZXJzID0gW107XG4gICAgICAgIHRoaXMuZ2FtZVN0YXR1cyA9IG51bGw7XG4gICAgICAgIHRoaXMuZGljdGlvbmFyeSA9IGRpY3Rpb25hcnk7XG4gICAgfVxuXG4gICAgLy8gR2V0IHdvcmQgZnJvbSBBUEkgYW5kIHNldCB0byB3b3JkIHByb3BlcnR5XG4gICAgZmV0Y2hXb3JkKCl7XG4gICAgICAgIHRoaXMud29yZCA9IHRoaXMuZGljdGlvbmFyeS5mZXRjaFdvcmQoKVxuICAgIH1cblxuICAgIC8vIEluc2VydCBsZXR0ZXJzIG9mIHdvcmQgaW50byBsZXR0ZXJzIHByb3BcbiAgICBzZXRMZXR0ZXJzKCl7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLndvcmQubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICB0aGlzLmxldHRlcnMucHVzaCh0aGlzLndvcmQuY2hhckF0KGluZGV4KSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCBudW1iZXIgb2YgbWlzdGFrZXNcbiAgICBzZXROdW1PZk1pc3Rha2VzKCl7XG4gICAgICAgIHRoaXMubnVtYmVyT2ZNaXN0YWtlcyA9IDY7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGEgbGV0dGVyIGZyb20gbGV0dGVycyBwcm9wXG4gICAgcmVtb3ZlTGV0dGVyKGxldHRlcil7XG4gICAgICAgIHRoaXMubGV0dGVycyA9IHRoaXMubGV0dGVycy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBsZXR0ZXIpXG4gICAgfVxuXG4gICAgLy8gU2V0IHZhbHVlIHRvIGdhbWVTdGF0dXMgcHJvcFxuICAgIHNldEdhbWVTdGF0dXMoc3RhdHVzKXtcbiAgICAgICAgdGhpcy5nYW1lU3RhdHVzID0gc3RhdHVzXG4gICAgfVxuXG4gICAgLy8gUmVzZXRzIHZhbHVlcyBvZiBwcm9wZXJ0aWVzIG9mIG1vZGVsXG4gICAgcmVzZXQoKXtcbiAgICAgICAgdGhpcy53b3JkID0gbnVsbDtcbiAgICAgICAgdGhpcy5udW1iZXJPZk1pc3Rha2VzID0gbnVsbDtcbiAgICAgICAgdGhpcy5sZXR0ZXJzID0gW107XG4gICAgICAgIHRoaXMuZ2FtZVN0YXR1cyA9IG51bGw7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IERpY3Rpb25hcnkgZnJvbSBcIi4vbW9kdWxlcy9EaWN0aW9uYXJ5XCI7XG5pbXBvcnQgTW9kZWwgZnJvbSBcIi4vbW9kdWxlcy9Nb2RlbFwiO1xuaW1wb3J0IEhhbmdtYW4gZnJvbSBcIi4vbW9kdWxlcy9IYW5nbWFuXCI7XG4vLyBpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBnZXRFbGVtZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9IZWxwZXJzXCI7XG5cbmNvbnN0IGhhbmdtYW4gPSBuZXcgSGFuZ21hbigpXG5oYW5nbWFuLmRyYXcoKVxuY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwoRGljdGlvbmFyeSlcbmNvbnNvbGUubG9nKG1vZGVsKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=