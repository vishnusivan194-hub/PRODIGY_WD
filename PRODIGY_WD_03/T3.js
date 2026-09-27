let board = [
    "", "", "",
    "", "", "",
    "", ""
];

let currentPlayer = "X";

let gameOver = false;

let gameMode = "pvp";

const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");


// Set game mode
function setMode(mode) {

    gameMode = mode;

    resetGame();

    if (mode === "pvp") {

        statusText.textContent = "Player X's Turn";

    } else {

        statusText.textContent = "Your Turn - X";
    }
}



function makeMove(index) {

    
    if (board[index] !== "" || gameOver) {
        return;
    }

    
    if (gameMode === "ai" && currentPlayer === "O") {
        return;
    }

    board[index] = currentPlayer;

    cells[index].textContent = currentPlayer;

    checkGame();

    if (
        gameMode === "ai" &&
        !gameOver &&
        currentPlayer === "O"
    ) {

        setTimeout(aiMove, 500);
    }
}



function checkGame() {

    const winningPatterns = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]

    ];


    for (let pattern of winningPatterns) {

        const [a, b, c] = pattern;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            gameOver = true;

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            statusText.textContent =
                `🎉 Player ${currentPlayer} Wins!`;

            return;
        }
    }


   
    if (!board.includes("")) {

        gameOver = true;

        statusText.textContent =
            "🤝 It's a Draw!";

        return;
    }


    
    currentPlayer =
        currentPlayer === "X" ? "O" : "X";


    if (gameMode === "ai") {

        if (currentPlayer === "X") {

            statusText.textContent =
                "Your Turn - X";

        } else {

            statusText.textContent =
                "AI's Turn - O";
        }

    } else {

        statusText.textContent =
            `Player ${currentPlayer}'s Turn`;
    }
}


function aiMove() {

    if (gameOver) {
        return;
    }

    const emptyCells = [];

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {
            emptyCells.push(i);
        }
    }

    if (emptyCells.length === 0) {
        return;
    }


    
    const randomIndex =
        Math.floor(Math.random() * emptyCells.length);

    const move = emptyCells[randomIndex];


    board[move] = "O";

    cells[move].textContent = "O";

    checkGame();
}



function resetGame() {

    board = [
        "", "", "",
        "", "", "",
        "", ""
    ];

    currentPlayer = "X";

    gameOver = false;


    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove("winner");

    });


    if (gameMode === "ai") {

        statusText.textContent =
            "Your Turn - X";

    } else {

        statusText.textContent =
            "Player X's Turn";
    }
}