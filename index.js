const cells = document.querySelectorAll(".col");
const resetButton = document.getElementById("resetButton");
const gameStatus = document.getElementById("gameStatus");

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let currentPlayer = "O";
let boardSquares = ["","","","","","","","",""];
let running = false;

startGame();

function startGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClick));
    resetButton.addEventListener("click", resetGame);
    gameStatus.textContent = `${currentPlayer}'s Turn.`;
    running = true;
}

function cellClick(){
    const cellIndex = this.getAttribute("cellIndex");

    if(boardSquares[cellIndex] !== "" || !running){
            return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    boardSquares[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "O") ? "X" : "O";
    gameStatus.textContent = `${currentPlayer}'s Turn.`;
}

function checkWinner(){
    let winner = false;
    for(let i = 0; i < winConditions.length; i++){
        const conditions = winConditions[i];
        const A = boardSquares[conditions[0]];
        const B = boardSquares[conditions[1]];
        const C = boardSquares[conditions[2]];

        if(A === "" || B === "" || C === ""){
            continue;
        } 
        if (A === B && B === C){
            winner = true;
            break;
        } 
    }
    if(winner){
        gameStatus.textContent = `${currentPlayer} Wins.`;
        running = false;
    } else if (!boardSquares.includes("")){
        gameStatus.textContent = "Draw.";
        running = false;
    } else {
        changePlayer();
    }
}

function resetGame(){
    boardSquares = ["","","","","","","","",""];
    running = true;
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "O"
    gameStatus.textContent = `${currentPlayer}'s Turn.`;
}