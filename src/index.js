import Dictionary from "./modules/Dictionary";
import Model from "./modules/Model";
import Hangman from "./modules/Hangman";
// import { createElement, getElement } from "./modules/Helpers";

const hangman = new Hangman()
hangman.draw()
const model = new Model(Dictionary)
console.log(model);