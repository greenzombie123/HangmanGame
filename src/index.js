import Dictionary from "./modules/Dictionary";
import Model from "./modules/Model";

const model = new Model(Dictionary)

model.fetchWord()
model.setLetters()
model.setNumOfMistakes()
model.removeLetter("w")

console.log(model);