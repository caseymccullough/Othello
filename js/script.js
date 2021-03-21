// 

let gameBoard = document.getElementById("board");

// 

let grid = [];
let numBlackTiles = 0;
let numWhiteTiles = 0;
let currentPlayer;


const init = () => {

    grid.push ([1, -1, 0, 0, 0, 0, 0, 0]);
    grid.push ([-1, 1, 0, 0, 0, 0, 0, 0]);
    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    currentPlayer= -1;

    for (let row = 0; row < grid.length; row++)
    {
        for (let col = 0; col < grid[row].length; col++)
        {
            let square = document.createElement("div");
            
            square.id = "r" + row + "c" + col;
            square.innerText = "r" + row + "c" + col;

            square.addEventListener('click', processSquareSelection);
            gameBoard.appendChild(square);
        }
    }
    // set up board for first time.
    updateHTML();
}

const processSquareSelection = (event) => {
    console.log ("Square played for " + currentPlayer);
    const location = event.target.id;
    
    let rowClicked = location.charAt(1);
    let colClicked = location.charAt(3);

    // change grid for given row and column
    grid[rowClicked][colClicked] = currentPlayer;
    updateHTML();
}

const updateHTML = () => {

    numBlackTiles = 0;
    numWhiteTiles = 0;

    for (let row = 0; row < grid.length; row++)
    {
        for (let col = 0; col < grid[row].length; col++)
        {
            changeSquareDivs(row, col);

        }

    } // end nested loops

    console.log("White tiles: " + numWhiteTiles);
    console.log("Black tiles: " + numBlackTiles);
    currentPlayer *= -1; // flip -1 to +1 and vice versa
    console.log ("current: " + currentPlayer);
} // end updateHTML()

function changeSquareDivs(row, col) {
    if (grid[row][col] == -1) {
        let squareId = "r" + row + "c" + col;
        let squareToWhite = document.getElementById(squareId);
        squareToWhite.classList.remove("black");
        squareToWhite.classList.add("white");
        numWhiteTiles++;
    }
    else if (grid[row][col] == 1) {
        let squareId = "r" + row + "c" + col;
        let squareToBlack = document.getElementById(squareId);
        squareToBlack.classList.remove("white");
        squareToBlack.classList.add("black");
        numBlackTiles++;
    }
}

init();

