- Canvas API
- NPM 
- Webpack


Hangman

- Get a word from a remote server
- Create a number of tiles to fill with letters
- Have a keyboard buttons
- Have an input form
- Have guess button
- Have a button to start a new game  
- When press a button, if letter is in the word, put the letter(s) in the tiles and flash the screen green.
- Flash red and have a body part appear on the hanging structure.
- If all body parts appear, game is over and render a reset button
- If get all letters or guess the word correctly, flash green, game is over and render a reset button.
- When press reset button, reset game.


Model 

```javascript

class DictionaryAPI{
    constructor(){}
}

class Model{
    constructor(dictionary){
        this.word = null;
        this.numberOfMistakes = null;
        this.limitOfMistakes = null;
        this.letters = [];
        this.gameStatus = null;
        this.dictionary = dictionary;
    }

    // Get word from API and set to word property
    fetchWord(){}

    // Insert letters of word into letters prop
    setLetters(){}

    // 
    setNumOfMistakes(){}

    //
    setLimitOfMistakes(){}

    //
    removeLetter(){}

    //
    setGameStatus(){}

    //
    reset(){}
}

```

Controller

```javascript

class Controller{
    constructor(dictionary, model){
        this.dictionary = dictionary;
        this.model = model;
        this.view = view;
    }

    // Get word from API
    // Return a word
    async getWord(){}

    // Set word and letters properties of Model object
    setWord(){}

    setLetter(){}

    // Need to set limit to know how many mistakes we are allowed before game over
    setMistakeLimit()

    setNumberOfMistakes()

    // Get a letter from the currentTarget
    // Guess the letter of the word. Need to guess te letter.
    guessLetter(e){}

    removeLetterFromLetters(letter){}

    
    // Return true of guess correctly, false if otherwise
    checkLetter(e){}

    // As a score updater 
    updateMistakes(){}

    // Parameter value. Pass true to set previousGuess to correct, incorrect if false
    setPreviousMistake(value){}
    
    // Return true
    guessWord(word){}

    checkWinner(){}

    checkLoser(){}

    //Return true or false
    checkLettersForWinner(){}

    //Return true or false
    checkWordForWinner(){}

    //Reset model
    reset(){}

    init(){}
}

```

View

```javascript

class Controller{
    constructor(){
        this.tiles;
        this.canvas;
        this.startButton;
        this.guessButton;
        this.restartButton;
    }

    createElement(){}
    getElement(){}

    renderTiles(){}

    renderLetters(){}

    resetTitles(){}
    
    renderBodyPart(){}


    chooseLetter(){}
    
    enterWord()

    flashRed(){}

    flashGreen(){}

    showGameOver(){}

    showWinner(){}

    init(){}
}

```