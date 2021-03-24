// 
let grid;
let gameBoard = document.getElementById("board");
let restartButton = document.getElementById("restart-btn");

let dingSound;
let restartSound;

let dingSoundOn = false;
/*
let ding = document.getElementById("ding");
can't get this to work . . . 
*/

// or make game class that holds state of the game. . . . 


let currentPlayer;


const init = () => {

    grid = [];
    dingSound = new sound ("sounds/ding.wav");
    restartSound = new sound ("sounds/fairy-restart.wav");
    
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

    // option to play sound
    if (dingSoundOn)
    {
        dingSound.play();
    }
    
    const location = event.target.id;
    
    /* id has format "r#c#" */
    let rowClicked = location.charAt(1);
    let colClicked = location.charAt(3);

    console.log ("Square played at (" + rowClicked + " , " + colClicked + ")" );

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
    flipTilesNorthEast(row, col);
    flipTilesEast(row, col);
    flipTilesSouthEast(row, col);
    flipTilesSouth(row, col);
    flipTilesSouthWest(row, col);
    flipTilesWest(row, col);
    flipTilesNorthWest(row, col);   
}

const flipTilesNorth = (row, col) =>{

    let numTilesToFlip = countTilesNorth(row, col);
    console.log ("\tTiles to North: " + numTilesToFlip);

    for (let flips = 0; flips < numTilesToFlip; flips++)
    {
        grid[row - 1 - flips][col] *= -1; // flip color
    }
}

const flipTilesNorthEast = (row, col) =>{

    let numTilesToFlip = countTilesNorthEast(row, col);
    console.log ("\tTiles to NorthEast: " + numTilesToFlip);

    for (let flips = 0; flips < numTilesToFlip; flips++)
    {
        grid[row - 1 - flips][parseInt(col) + 1 + flips] *= -1; // flip color
    }
}

const flipTilesEast = (row, col) =>{

    let numTilesToFlip = countTilesEast(row, col);
    console.log ("\tTiles to East: " + numTilesToFlip);

    for (let flips = 0; flips < numTilesToFlip; flips++)
    {
        grid[row][parseInt(col) + 1 + flips] *= -1; // flip color
    }
}

const flipTilesSouthEast = (row, col) =>{

    let numTilesToFlip = countTilesSouthEast(row, col);
    console.log ("\tTiles to SouthEast: " + numTilesToFlip);

    for (let flips = 0; flips < numTilesToFlip; flips++)
    {
        grid[parseInt(row) + 1 + flips][parseInt(col) + 1 + flips] *= -1; // flip color
    }
}

const flipTilesSouth = (row, col) =>{

    let numTilesToFlip = countTilesSouth(row, col);
    console.log ("\tTiles to South: " + numTilesToFlip);

    for (let flips = 0; flips < numTilesToFlip; flips++)
    {
        grid[parseInt(row) + 1 + flips][col] *= -1; // flip color
    }
}

const flipTilesSouthWest = (row, col) =>{

    let numTilesToFlip = countTilesSouthWest(row, col);
    console.log ("\tTiles to SouthWest: " + numTilesToFlip);

    for (let flips = 0; flips < numTilesToFlip; flips++)
    {
        grid[parseInt(row) + 1 + flips][parseInt(col) - 1 - flips] *= -1; // flip color
    }
}

const flipTilesWest = (row, col) =>{

    let numTilesToFlip = countTilesWest(row, col);
    console.log ("\tTiles to West: " + numTilesToFlip);

    for (let flips = 0; flips < numTilesToFlip; flips++)
    {
        grid[row][parseInt(col) - 1 - flips] *= -1; // flip color
    }
}

const flipTilesNorthWest = (row, col) =>{

    let numTilesToFlip = countTilesNorthWest(row, col);
    console.log ("\tTiles to NorthWest: " + numTilesToFlip);

    for (let flips = 0; flips < numTilesToFlip; flips++)
    {
        grid[parseInt(row) -1 - flips][parseInt(col) - 1 - flips] *= -1; // flip color
    }
}

/*
    col will be dropping, row stays the same. 
*/
const countTilesNorth = (newTileRow, newTileCol) =>
{
    let tilesToChange = 0;
    const attackingColor = grid[newTileRow][newTileCol]; // -1 or +1
    const colorToChange = -attackingColor;
    let currentRow = newTileRow - 1; // move to first row above 
    while (currentRow >= 0 && grid[currentRow][newTileCol] === colorToChange)
    {
        console.log ("adding at " + currentRow + ", " + newTileCol);
        tilesToChange++;
        
        currentRow--;
    }
    if (currentRow < 0 || grid[currentRow][newTileCol] == 0) // prevents trying to assess element past edge
    {
        return 0; // reached edge of board without another attacking piece
  
    }
    else // (grid[currentRow][newTileCol] == attackingColor) // enemy line is "sandwiched"
    {
        return tilesToChange;
    }
}

/*
    col will be increasing, row decreasing. 
*/
const countTilesNorthEast = (newTileRow, newTileCol) =>
{
    let tilesToChange = 0;
    const attackingColor = grid[newTileRow][newTileCol]; // -1 or +1
    const colorToChange = -attackingColor;
    let currentRow = newTileRow - 1; // move to upper right
    let currentCol = parseInt(newTileCol) + 1; // of newTile
    
    while (currentRow >= 0 && currentCol < grid[0].length &&
        grid[currentRow][currentCol] === colorToChange)
    {
        console.log ("adding at " + currentRow + ", " + currentCol);
        tilesToChange++;
        
        currentRow--;
        currentCol++; 
    }
    if (currentRow < 0 || currentCol >= grid[0].length || grid[currentRow][currentCol] == 0) // prevents trying to assess element past edge
    {
        return 0; // reached edge of board without another attacking piece
  
    }
    else // (grid[currentRow][newTileCol] == attackingColor) // enemy line is "sandwiched"
    {
        return tilesToChange;
    }
}

/*
    col will be increasing, row stays the same. 
*/
const countTilesEast = (newTileRow, newTileCol) =>
{
    let tilesToChange = 0;
    const attackingColor = grid[newTileRow][newTileCol]; // -1 or +1
    const colorToChange = -attackingColor;
    let currentCol = parseInt(newTileCol) + 1; // move to first row below 
   
    while (currentCol < grid[0].length && grid[newTileRow][currentCol] === colorToChange)
    {
        console.log ("adding at " + newTileRow + ", " + currentCol);
        tilesToChange++;  
        currentCol++;
    }
    if (currentCol >= grid[0].length || grid[newTileRow][currentCol] === 0)
    {
        return 0; // reached edge of board OR ends with empty
    }
    
    else // (grid[currentRow][newTileCol] === attackingColor) // enemy line is "sandwiched"
    {
        return tilesToChange;
    }
}

/*
    col will be increasing, row decreasing. 
*/
const countTilesSouthEast = (newTileRow, newTileCol) =>
{
    let tilesToChange = 0;
    const attackingColor = grid[newTileRow][newTileCol]; // -1 or +1
    const colorToChange = -attackingColor;
    let currentRow = parseInt(newTileRow )+ 1; // move to upper right
    let currentCol = parseInt(newTileCol) + 1; // of newTile
    
    while (currentRow < grid.length && currentCol < grid[0].length &&
        grid[currentRow][currentCol] === colorToChange)
    {
        console.log ("adding at " + currentRow + ", " + currentCol);
        tilesToChange++;
        
        currentRow++;
        currentCol++; 
    }
    if (currentRow >= grid.length || currentCol >= grid[0].length || grid[currentRow][currentCol] == 0) // prevents trying to assess element past edge
    {
        return 0; // reached edge of board without another attacking piece
  
    }
    else // (grid[currentRow][newTileCol] == attackingColor) // enemy line is "sandwiched"
    {
        return tilesToChange;
    }
}


/*
    col will be dropping, row stays the same. 
*/
const countTilesSouth = (newTileRow, newTileCol) =>
{
    let tilesToChange = 0;
    const attackingColor = grid[newTileRow][newTileCol]; // -1 or +1
    const colorToChange = -attackingColor;
    let currentRow = parseInt(newTileRow) + 1; // move to first row below 
    
    while (currentRow < grid.length && grid[currentRow][newTileCol] === colorToChange)
    {
        console.log ("adding at " + currentRow + ", " + newTileCol);
        tilesToChange++;  
        currentRow++;
    }
    if (currentRow >= grid.length || grid[currentRow][newTileCol] === 0)
    {
        return 0; // reached edge of board OR ends with empty
    }
    
    else // (grid[currentRow][newTileCol] === attackingColor) // enemy line is "sandwiched"
    {
        return tilesToChange;
    }
}

/*
    col will be decreasing, row decreasing. 
*/
const countTilesSouthWest = (newTileRow, newTileCol) =>
{
    let tilesToChange = 0;
    const attackingColor = grid[newTileRow][newTileCol]; // -1 or +1
    const colorToChange = -attackingColor;
    let currentRow = parseInt(newTileRow) + 1; // move to lower left
    let currentCol = parseInt(newTileCol) - 1; // of newTile
    
    console.log ("SW initial: " + currentRow + ", " + currentCol);
    while (currentRow < grid.length && currentCol >= 0 &&
        grid[currentRow][currentCol] === colorToChange)
    {
        console.log ("adding at " + currentRow + ", " + currentCol);
        tilesToChange++;
        
        currentRow++;
        currentCol--; 
    }
    if (currentRow >= grid.length || currentCol < 0 || grid[currentRow][currentCol] == 0) // prevents trying to assess element past edge
    {
        return 0; // reached edge of board without another attacking piece
    }
    else // (grid[currentRow][newTileCol] == attackingColor) // enemy line is "sandwiched"
    {
        return tilesToChange;
    }
}

/*
    col will be increasing, row stays the same. 
*/
const countTilesWest = (newTileRow, newTileCol) =>
{
    let tilesToChange = 0;
    const attackingColor = grid[newTileRow][newTileCol]; // -1 or +1
    const colorToChange = -attackingColor;
    let currentCol = parseInt(newTileCol) - 1; // move to first row below 
   
    while (currentCol > 0 && grid[newTileRow][currentCol] === colorToChange)
    {
        console.log ("adding at " + newTileRow + ", " + currentCol);
        tilesToChange++;  
        currentCol--;
    }
    if (currentCol < 0 || grid[newTileRow][currentCol] === 0)
    {
        return 0; // reached edge of board OR ends with empty
    }
    
    else // (grid[currentRow][newTileCol] === attackingColor) // enemy line is "sandwiched"
    {
        return tilesToChange;
    }
}

/*
    col will be increasing, row decreasing. 
*/
const countTilesNorthWest = (newTileRow, newTileCol) =>
{
    
    let tilesToChange = 0;
    const attackingColor = grid[newTileRow][newTileCol]; // -1 or +1
    const colorToChange = -attackingColor;
    let currentRow = parseInt(newTileRow) - 1; // move to upper right
    let currentCol = parseInt(newTileCol) - 1; // of newTile
    
    console.log ("NW initial: " + currentRow + ", " + currentCol);
    
    while (currentRow >= 0 && currentCol >= 0 &&
        grid[currentRow][currentCol] === colorToChange)
    {
        console.log ("adding at " + currentRow + ", " + currentCol);
        tilesToChange++;
        
        currentRow--;
        currentCol--; 
    }
    if (currentRow < 0 || currentCol < 0 || grid[currentRow][currentCol] == 0) // prevents trying to assess element past edge
    {
        return 0; // reached edge of board without another attacking piece
  
    }
    else // (grid[currentRow][newTileCol] == attackingColor) // enemy line is "sandwiched"
    {
        return tilesToChange;
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
    restartSound.play();
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";

    document.body.appendChild(this.sound);

    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
  

init();

