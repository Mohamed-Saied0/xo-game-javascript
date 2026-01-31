const scoreElX = document.querySelector(".player-x span");
const scoreElO = document.querySelector(".player-o span");
const btnReset = document.querySelector(".btn-reset");
const boardElement = document.querySelector(".game-board");
const btnStart = document.querySelector(".btn-start");
const gameWrapper = document.querySelector(".game-wrapper");
const msgWinX = document.querySelector(".msg-win-x");
const msgWinO = document.querySelector(".msg-win-o");
const msgDraw = document.querySelector(".msg-draw");

let isPlayerXTurn = true;
let turnsCount = 0;

let boardState = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

btnStart.addEventListener("click", () => {
    btnStart.classList.add("hidden");
    gameWrapper.classList.remove("hidden");
});

btnReset.addEventListener("click", function () {
    scoreElX.innerText = 0;
    scoreElO.innerText = 0;
});

boardElement.addEventListener("click", function (e) {
    const clickedCell = e.target;

    if (clickedCell.tagName === "TD" && clickedCell.innerText === "") {
        clickedCell.innerText = (isPlayerXTurn ? "X" : "O");
        clickedCell.classList.add("filled");

        let pos = clickedCell.dataset.position.split("-");
        let row = pos[0];
        let col = pos[1];

        boardState[row][col] = isPlayerXTurn ? "x" : "o";

        let isWinner = checkWinCondition();

        if (isWinner) {
            if (isPlayerXTurn) {
                scoreElX.innerText = Number(scoreElX.innerText) + 1;
                resetBoard();
                showStatusMessage(1);
            }
            else {
                scoreElO.innerText = Number(scoreElO.innerText) + 1;
                resetBoard();
                showStatusMessage(2);
            }
        }

        if (++turnsCount === 9 && !isWinner) {
            resetBoard();
            showStatusMessage(0);
        }

        isPlayerXTurn = !isPlayerXTurn;
    }
});

function checkWinCondition() {
    let rowMatch = true;
    let diagonalMatch = true;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
            if (boardState[i][j] !== boardState[i][j + 1] || boardState[i][j] === '') {
                rowMatch = false;
                break;
            }
        }
        if (rowMatch) {
            return true;
        }
        rowMatch = true;

        if (i < 2 && diagonalMatch) {
            if (boardState[i][i] !== boardState[i + 1][i + 1] || boardState[i][i] === '') {
                diagonalMatch = false;
            }
        }
    }

    if (diagonalMatch) {
        return true;
    }
    rowMatch = true;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
            if (boardState[j][i] !== boardState[j + 1][i] || boardState[j][i] === '') {
                rowMatch = false;
                break;
            }
        }
        if (rowMatch) {
            return true;
        }
        rowMatch = true;
    }

    if (boardState[2][0] === boardState[0][2] && boardState[2][0] === boardState[1][1] && boardState[2][0] !== '') {
        return true;
    }
    return false;
}

function resetBoard() {
    boardState = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    setTimeout(function () {
        const allCells = document.querySelectorAll(".game-board td");
        for (let i = 0; i < allCells.length; i++) {
            allCells[i].innerText = "";
            allCells[i].classList.remove("filled");
        }
    }, 1000);
    turnsCount = 0;
}

function showStatusMessage(type) {
    if (type === 1) {
        msgWinX.classList.remove("hidden");
        setTimeout(() => msgWinX.classList.add("hidden"), 1000);
    }
    else if (type === 2) {
        msgWinO.classList.remove("hidden");
        setTimeout(() => msgWinO.classList.add("hidden"), 1000);
    }
    else if (type === 0) {
        msgDraw.classList.remove("hidden");
        setTimeout(() => msgDraw.classList.add("hidden"), 1000);
    }
}