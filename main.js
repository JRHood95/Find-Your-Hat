// Allows user to exit the game using ctrl + c
const prompt = require("prompt-sync")({ sigint: true });

// Game Board Characters
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

// Starting index inside the game boards nested arrays 
let startUpAndDown = 0;
let startLeftAndRight = 0;

// Field class that takes in one parameter of an 
class Field {
  constructor(gridArray) {
    this._gridArray = gridArray;
  }
  // Method to print the game field
  print() {
    for (let i = 0; i < this._gridArray.length; i++) {
      console.log(this._gridArray[i].join(""));
    }
  }
  // Method to move character 
  move() {
    let direction = prompt("Which way? > ");
    direction = direction.toLowerCase();
    // Make sure the user input is valid first 
    if (direction === 'u' || direction === 'd' || direction === 'l' || direction === 'r') {
      // Move the current index dependant on user input and check if they have moved outside of the game field!
      if (direction === "u") {
        startUpAndDown --;
        if (startUpAndDown < 0) {
          console.log('Uh oh! You have left the field and can\'t find your way back..... Game Over!!!');
          return;
        }
      } else if (direction === "d") {
        startUpAndDown ++;
        if (startUpAndDown > this._gridArray.length - 1) {
          console.log('Uh oh! You have left the field and can\'t find your way back..... Game Over!!!');
          return;
        }
      } else if (direction === "l") {
        startLeftAndRight --;
        if (startLeftAndRight < 0) {
          console.log('Uh oh! You have left the field and can\'t find your way back..... Game Over!!!');
          return;
        }
      } else if (direction === "r") {
        startLeftAndRight ++;
        if (startLeftAndRight > this._gridArray[startUpAndDown].length - 1) {
          console.log('Uh oh! You have left the field and can\'t find your way back..... Game Over!!!');
          return;
        }
      }
      
      // Check the newly moved index in the field array and continue the game
      if (this._gridArray[startUpAndDown][startLeftAndRight] === fieldCharacter) {
        this._gridArray[startUpAndDown][startLeftAndRight] = pathCharacter;
        this.print();
        this.move();
      } else if (this._gridArray[startUpAndDown][startLeftAndRight] === hat) {
        console.log('Congrats!!!! You found your hat! YOU WIN!');
      } else if (this._gridArray[startUpAndDown][startLeftAndRight] === hole) {
        console.log('Ooops You\'ve fallen in to a hole..... Game Over!!!');
        // If user tries to go back on themselves, tell user to retry move and adjust indexes to reset to their current position
      } else if (this._gridArray[startUpAndDown][startLeftAndRight] === pathCharacter) {
        console.log('There\'s no turning back... Try another move!');
        if (direction === 'd') {
          startUpAndDown --;
        } else if (direction === 'u') {
          startUpAndDown ++;
        } else if (direction === 'l') {
          startLeftAndRight ++;
        } else if (direction === 'r') {
          startLeftAndRight --;
        }
        this.print();
        this.move();
      }
      
      
    } else {
      console.log('Invalid input you illiterate wank.... Try again');
      this.move();
    }
  }
  
  static generateField(width, height) {
    // Start with an empty array that represents the game board 
    let gridArray = [];
    // Returns a random character of either field or hole 
    const returnRandChar = () => {
      // Haven't yet figured out how best to layout the game-board but this way seems to produce decent results
      const dnaBases = ["░", "░", "░", "░", "O"];
      return dnaBases[Math.floor(Math.random() * 5)];
    };
    // Create 1 game board row using width and add it to the game board array
    const createBoardRow = () => {
      const widthArr = [];
      for (let i = 0; i < width; i++) {
        widthArr.push(returnRandChar());
      }
      // Push the game board row in to the game board array
      gridArray.push(widthArr);
    }
    // Create and add game board rows dependant on height
    for (let i = 0; i < height; i++) {
      createBoardRow();
    }
    // Function that randomly places the hat in the field
    const placeHat = () => {
      const gridRandomIndex = Math.floor(Math.random() * gridArray.length);
      const rowRandomIndex = Math.floor(Math.random() * gridArray[0].length);
      // Make sure that the hat doesn't replace your characters starting point
      if (gridArray[gridRandomIndex][rowRandomIndex] !== "*") {
        gridArray[gridRandomIndex][rowRandomIndex] = "^";
      }
    }
    // Place the path character at the starting point
    gridArray[0][0] = "*";
    
    placeHat();
    return gridArray;
  }
}

// PLAYING THE GAME
// Start of the game intro after running main.js
console.log(
  "\nOk, the game is about to begin. Will you be able to find you're hat? \nTo play you must either move (U: Up, D: Down, L: Left, R: Right)\nWe wish you good luck!\n\n**********BEGIN GAME***********\n"
);

// Create instance of the Field Class to start the game 
const startGame = new Field(Field.generateField(8, 14));
startGame.print();
startGame.move();