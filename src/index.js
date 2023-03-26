import Dictionary from "./modules/Dictionary";
import Model from "./modules/Model";
import Hangman from "./modules/Hangman";
import View from "./modules/View";
import Controller from "./modules/Controller";
import { createElement, getElement } from "./modules/Helpers";

const hangman = new Hangman()
// hangman.draw()
const view = new View(hangman)
const model = new Model(Dictionary)
const controller = new Controller(model, view)

controller.init()

// const word = model.dictionary.fetchWord()
// console.log(word);
// view.addLetters('a')
// view.flashRed()