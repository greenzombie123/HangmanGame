// import Dictionary from "./Dictionary";

export default class Model{
    constructor(dictionary){
        this.word = null;
        this.numberOfMistakes = null;
        this.letters = [];
        this.gameStatus = null;
        this.dictionary = dictionary;
    }

    // Get word from API and set to word property
    async fetchWord(){
        this.word = await this.dictionary.fetchWord()
        this.setLetters()
        console.log(this.letters);
        this.onWordRetrieved()
    }

    getWord(){
        return this.word
    }

    bindOnWordRetrieved(callback){
        this.onWordRetrieved = callback
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
        console.log(this.letters);
    }

    // Set value to gameStatus prop
    setGameStatus(status){
        this.gameStatus = status
    }

    init(){
        this.setNumOfMistakes() 
        this.fetchWord()
    }

    // Resets values of properties of model
    reset(){
        this.word = null;
        this.numberOfMistakes = null;
        this.letters = [];
        this.gameStatus = null;
    }
}