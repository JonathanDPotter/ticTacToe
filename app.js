const game = (() => {
  "use strict";

  this.spaces = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];

  this.activePlayer = {};

  function makeBoard() {
    const squares = document.getElementById("board");

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let square = document.createElement("div");
        square.setAttribute("id", `${i}-${j}`);
        square.classList.add("square");
        squares.appendChild(square);
        square.addEventListener("click", (event) => {
          if (square.textContent == "") {
            square.textContent = activePlayer.mark;
            spaces[square.id[0]][square.id[2]] = activePlayer.mark;
            activePlayer == playerOne
              ? (activePlayer = playerTwo)
              : (activePlayer = playerOne);
            checkWin();
          }
        });
      }
    }
  }

  function checkWin() {
    const playerOneScore = document.getElementById("oneScore");
    const playerTwoScore = document.getElementById("twoScore");

    // check rows and columns for three-in-a-row
    for (let i = 0; i < 3; i++) {
      // first rows
      if (spaces[i].every((obj) => obj == "X")) {
        playerOne.win();
      } else if (spaces[i].every((obj) => obj == "O")) {
        playerTwo.win();
      }

      // then columns
      if (
        [spaces[0][i], spaces[1][i], spaces[2][i]].every((obj) => obj == "X")
      ) {
        playerOne.win();
      } else if (
        [spaces[0][i], spaces[1][i], spaces[2][i]].every((obj) => obj == "O")
      ) {
        playerTwo.win();
      }
    }
    // check diagonals more tediously (no loop)
    if ([spaces[0][0], spaces[1][1], spaces[2][2]].every((obj) => obj == "X")) {
      playerOne.win();
    } else if (
      [spaces[0][0], spaces[1][1], spaces[2][2]].every((obj) => obj == "O")
    ) {
      playerTwo.win();
    }
    if ([spaces[0][2], spaces[1][1], spaces[2][0]].every((obj) => obj == "X")) {
      playerOne.win();
    } else if (
      [spaces[0][2], spaces[1][1], spaces[2][0]].every((obj) => obj == "O")
    ) {
      playerTwo.win();
    }

    // check for a tie
    if (
      ![...spaces[0], ...spaces[1], ...spaces[2]].some((i) => i == undefined)
    ) {
      const winText = document.getElementById("win");
      winText.textContent = `I's a tie!`;
      window.setTimeout(() => {
        winText.textContent = "";
        game.clearBoard();
      }, 1000);
    }
    playerOneScore.textContent = playerOne.score;
    playerTwoScore.textContent = playerTwo.score;
  }

  function clearBoard() {
    spaces = [
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ];
    document.querySelectorAll(".square").forEach((i) => (i.textContent = ""));
  }

  return { makeBoard, spaces, activePlayer, clearBoard };
})();

const setup = () => {
  const form = document.forms[0];
  const board = document.getElementById("board");
  const scores = document.getElementById("scores");
  const nameOne = document.getElementById("name-one");
  const nameTwo = document.getElementById("name-two");

  game.makeBoard();

  const makePlayer = (name, score, mark) => ({
    name,
    score,
    mark,
    win() {
      this.score++;
      const winText = document.getElementById("win");
      winText.textContent = `${this.name} wins!`;
      window.setTimeout(() => {
        winText.textContent = "";
        game.clearBoard();
      }, 1000);
    },
    getScore() {
      return this.score;
    },
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    playerOne = makePlayer(form.one.value, 0, "X");
    playerTwo = makePlayer(form.two.value, 0, "O");
    nameOne.textContent = playerOne.name;
    nameTwo.textContent = playerTwo.name;
    form.style.opacity = 0;
    scores.style.opacity = 1;
    board.style.opacity = 1;
    game.activePlayer = playerOne;
  });
};

setup();
