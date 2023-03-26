export default class Controller {
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
