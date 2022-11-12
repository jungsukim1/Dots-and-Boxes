//Setting up game board
let game = document.getElementById("game");
let board = document.createElement("table");
board.setAttribute("id", "gameBoard");
let counterSpanCol = 0;
let counterVedge = 0;
let counterSquare = 0;
for(let i = 1; i <= 11; i++){
    let row = document.createElement("tr");
    if(i % 2 == 0){
        row.setAttribute("class", "verRow");
    }else{
        row.setAttribute("class", "horRow");
    }
    board.appendChild(row);
    for(let j = 1; j <= 11; j++){
        let col = document.createElement("td");
        if(i % 2 != 0){
            if(j % 2 == 0){
                col.setAttribute("class", "spanCol");
                col.setAttribute("id", "h"+counterSpanCol);
                counterSpanCol++;
            }else{
                col.setAttribute("class", "cornerCol");
            }
        }else{
            if(j % 2 == 0){
                col.setAttribute("class", "hedgeCol");
                col.setAttribute("class", "square");
                counterSquare++;
            }else{
                col.setAttribute("class", "vedgeCol");
                col.setAttribute("id", "v"+counterVedge);
                counterVedge++;
            }
        }
        
        row.appendChild(col);
    }
}
game.appendChild(board);

//Setting up global variables
const VEDGE = document.getElementsByClassName("vedgeCol");
const SPANCOL = document.getElementsByClassName("spanCol");
const SQUARE = document.getElementsByClassName("square");
const BOARD = document.getElementById("gameBoard");
const WINNER = document.getElementById("winner");
let PLAYER1SCORE = document.getElementById('player1Score');
let PLAYER2SCORE = document.getElementById('player2Score');
let PLAYER3SCORE = document.getElementById('player3Score');
const PLAYER1 = {name: "Player 1", color: "blue", score: 0};
const PLAYER2 = {name: "Player 2", color: "green", score: 0};
const PLAYER3 = {name: "Player 3", color: "red", score: 0};
const ROOT = document.querySelector(':root');

//Queue to handle turn logic
let turns = [PLAYER1, PLAYER2, PLAYER3];

//Setting up EventListeners
for(let i = 0; i < VEDGE.length; i++){
    VEDGE[i].addEventListener('click', changeColor);
}

for(let i = 0; i < SPANCOL.length; i++){
    SPANCOL[i].addEventListener('click', changeColor);
}

//Function that the event calls
function changeColor(){
    let player = turns[0];
    this.style.backgroundColor = player.color;
    checkSquare(player);
    this.removeEventListener('click', changeColor);
}

//Checks if the move made by the player makes a square
function checkSquare(player){
    let square = false;
    //In case there is a double square made
    for(let i = 0; i < SQUARE.length; i++){
        let col = SQUARE[i].cellIndex;
        let row = SQUARE[i].closest('tr').rowIndex;
        let row1 = BOARD.rows[row-1].cells[col].style.backgroundColor;
        let row2 = BOARD.rows[row+1].cells[col].style.backgroundColor;
        let col1 = BOARD.rows[row].cells[col-1].style.backgroundColor;
        let col2 = BOARD.rows[row].cells[col+1].style.backgroundColor;
        if(row1 !== '' && row2 !== '' && col1 !== '' && col2 !== ''){
            SQUARE[i].style.backgroundColor = player.color;
            SQUARE[i].removeAttribute('class');
            player.score++;
            square = true;
            console.log(i);
            i--;
        }
    }
    if(square === false){
        turns.shift();
        turns.push(player);
        ROOT.style.setProperty('--PLAYER', turns[0].color);
    }
    if(SQUARE.length === 0){
        openPopup();
    }
    updatePlayerScore();
}

//Updating the player scores
function updatePlayerScore(){
    PLAYER1SCORE.innerHTML = "Player 1: " + PLAYER1.score;
    PLAYER2SCORE.innerHTML = "Player 2: " + PLAYER2.score;
    PLAYER3SCORE.innerHTML = "Player 3: " + PLAYER3.score;
}

//Pop-up screen for when the game ends
function openPopup(){
    popup.classList.add("open-popup");
    popupcontainer.classList.add("turnoff");
    if(PLAYER1.score > PLAYER2.score && PLAYER1.score > PLAYER3.score){
        WINNER.innerHTML = "Winner is: " + PLAYER1.name;
    }else if(PLAYER2.score > PLAYER1.score && PLAYER2.score > PLAYER3.score){
        WINNER.innerHTML = "Winner is: " + PLAYER2.name;
    }else if(PLAYER3.score > PLAYER1.score && PLAYER3.score > PLAYER2.score){
        WINNER.innerHTML = "Winner is: " + PLAYER3.name;
    }else if(PLAYER1.score === PLAYER2.score){
        WINNER.innerHTML = "It is a Draw: " + PLAYER1.name + "And" + PLAYER2.name;
    }else if(PLAYER2.score === PLAYER3.score){
        WINNER.innerHTML = "It is a Draw: " + PLAYER2.name + "And" + PLAYER3.name;
    }else{
        WINNER.innerHTML = "It is a Draw: " + PLAYER1.name + "And" + PLAYER3.name;
    }
}

//Closes the pop-up screen
function closePopup(){
    popup.classList.remove("open-popup");
    popupcontainer.classList.remove("turnoff");
}