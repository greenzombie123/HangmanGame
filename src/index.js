import Dictionary from "./modules/Dictionary";
import Model from "./modules/Model";
import Hangman from "./modules/Hangman";
import View from "./modules/View";
import { createElement, getElement } from "./modules/Helpers";

const hangman = new Hangman()
// hangman.draw()
const view = new View(hangman)
const model = new Model(Dictionary)
console.log(model);
view.createTiles()
view.init()
view.printWord()
// view.addLetters('a')
// view.flashRed()