const board = (() => {
  "use strict";

  this.spaces = new Array(9);

  function setPiece(loc, piece) {
    spaces[loc[0]][loc[1]] = piece;
  }

  function makeBoard() {
    const squares = document.getElementById("board");
    console.log(squares);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let square = document.createElement("div");
        square.setAttribute("id", `${i}-${j}`);
        square.classList.add("square");
        squares.appendChild(square);

        square.addEventListener("click", () => {});
      }
    }
  }

  function clearBoard() {
    for (let i = 0; i < 9; i++) {
      spaces[i] = null;
    }
  }

  return { makeBoard, clearBoard };
})();

const makePlayer = (name, score) => ({
  name,
  score,
  win() {
    this.score++;
  },
  getScore() {
    return this.score;
  },
});

function setup() {
  board.makeBoard();
  board.clearBoard();
  
  
}



playerOne = makePlayer("Dave", 0);
playerTwo = makePlayer("Mary", 0);

console.log(playerOne.name, playerOne.score);
