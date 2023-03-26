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

  checkletter(letter){

  }

  init() {
    this.model.bindOnWordRetrieved(this.getWord);
    this.view.init();
    this.model.fetchWord();
  }
}
