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
      this.checkWinner()
    } else {
      this.view.flashRed();
      this.view.renderBodyPart();
      this.model.increaseNumOfMistakes()
      this.checkLoser()
    }
  };

  guessWord = (word) => {
    if (this.checkWord(word)) {
      this.view.printWord();
      this.view.flashGreen();
    } else {
      this.view.flashRed();
      this.view.renderBodyPart();
    }
  };

  checkWinner(isWordCorrect = false){
    const {letters} = this.model
    if(!letters.length || isWordCorrect){
        this.model.setGameStatus('Winner')
        console.log(this.model.gameStatus);
    }
  }

  checkLoser(){
    const {numberOfMistakes, limitOfMistakes} = this.model
    console.log(numberOfMistakes, limitOfMistakes);
    if(numberOfMistakes === limitOfMistakes){
        this.model.setGameStatus("Loser")
        console.log('YOu are a ' + this.model.gameStatus);
    }
  }

  startNewGame(){

  }

  init() {
    this.model.bindOnWordRetrieved(this.getWord);
    this.view.bindOnTileButtonsClicked(this.guessLetter);
    this.view.bindOnWordButtonClicked(this.guessWord);
    this.view.init();
    this.model.init();
  }
}
