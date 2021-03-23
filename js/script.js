// 

let gameBoard = document.getElementById("board");
let restartButton = document.getElementById("restart-btn");
/*
let ding = document.getElementById("ding");
can't get this to work . . . 
*/

// 

let grid = [];
let currentPlayer;


const init = () => {

    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push ([0, 0, 0, 1, -1, 0, 0, 0]);
    grid.push ([0, 0, 0, -1, 1, 0, 0, 0]);
    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    currentPlayer= -1;

    restartButton.addEventListener('click', restartGame);

    for (let row = 0; row < grid.length; row++)
    {
        for (let col = 0; col < grid[row].length; col++)
        {
            let square = document.createElement("div");
            
            square.id = "r" + row + "c" + col;
            square.classList.add("square");
            square.innerText = "r" + row + "c" + col;

            square.addEventListener('click', processSquareSelection);
            gameBoard.appendChild(square);
        }
    }
    // set up board for first time.
    updateHTML();
}



const processSquareSelection = (event) => {

    // // play sound
    // ding.play();

    console.log ("Square played for " + currentPlayer);
    const location = event.target.id;
    
    let rowClicked = location.charAt(1);
    let colClicked = location.charAt(3);

    // change grid for given row and column
    grid[rowClicked][colClicked] = currentPlayer;
    flipTiles(rowClicked, colClicked);

    updateHTML();
}

/*
    adjusts grid based on placement of new tile.
    @row the row into which the new tile was placed
    @col the col into which the new tile was placed
*/
const flipTiles = (row, col) => {

    flipTilesNorth(row, col);
   // flipTilesSouth(row, col);    
}

const flipTilesNorth = (row, col) =>{

    let numTilesToFlip = countTilesNorth(row, col);
    console.log("Tiles to the north: " + numTilesToFlip);

    for (let flips = 0; flips < numTilesToFlip; flips++)
    {
        grid[row - 1 - flips][col] *= -1; // flip color
    }
}

/*
    col will be dropping, row stays the same. 
*/
const countTilesNorth = (newTileRow, newTileCol) =>
{
    let tilesToChange = 0;
    const attackingColor = grid[newTileRow][newTileCol]; // -1 or +1
    console.log ("attacking color: " + attackingColor);
    const colorToChange = -attackingColor;
    console.log("color to change to: " + colorToChange);
    let currentRow = newTileRow - 1; // move to first row above 
    while (currentRow > 0 && grid[currentRow][newTileCol] === colorToChange)
    {
        console.log ("adding at " + currentRow + ", " + newTileCol);
        tilesToChange++;
        
        currentRow--;
    }
    if (grid[currentRow][newTileCol] == attackingColor) // enemy line is "sandwiched"
    {
        console.log ("tiles to change: " + tilesToChange);
        return tilesToChange;
    }
    else // enemy line ends with empty space or edge. 
    {
        console.log ("no changes required");
        return 0; 
    }
}


const updateHTML = () => {
    
    blackTileCount = 0;
    whiteTileCount = 0;

    for (let row = 0; row < grid.length; row++)
    {
        for (let col = 0; col < grid[row].length; col++)
        {
            
            if (grid[row][col] == -1) {
                makeSquareWhite(row, col);
                whiteTileCount++;
            }
            else if (grid[row][col] == 1)
            {
                makeSquareBlack(row,col);
                blackTileCount++;
            }

        }

    } // end nested loops

    document.getElementById("num-black-tiles").innerHTML = blackTileCount;
    document.getElementById("num-white-tiles").innerHTML = whiteTileCount;
    
    setNextTurn();


} // end updateHTML()

/*
    Place gold border around one of the player's, indicating it is their turn. 
*/
const setNextTurn = () => {
    currentPlayer *= -1; // flip -1 to +1 and vice versa

    if (currentPlayer > 0) // black's turn
    {
        document.getElementById("black-tiles-div").classList.add("gold-border");
        document.getElementById("white-tiles-div").classList.remove("gold-border");
    }
    else // white's turn
    {
        document.getElementById("white-tiles-div").classList.add("gold-border");
        document.getElementById("black-tiles-div").classList.remove("gold-border");
    }
}

function makeSquareWhite (row, col) {
    
        let squareId = "r" + row + "c" + col;
        let squareToWhite = document.getElementById(squareId);
        squareToWhite.classList.remove("black");
        squareToWhite.classList.add("white");

}
function makeSquareBlack(row, col) {
    
        let squareId = "r" + row + "c" + col;
        let squareToBlack = document.getElementById(squareId);
        squareToBlack.classList.remove("white");
        squareToBlack.classList.add("black");
}

const restartGame = () => {

    console.log ("RESTART");
}



init();

