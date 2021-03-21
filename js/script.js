// 

let gameBoard = document.getElementById("board");


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
    console.log ("Square played for " + currentPlayer);
    const location = event.target.id;
    
    let rowClicked = location.charAt(1);
    let colClicked = location.charAt(3);

    // change grid for given row and column
    grid[rowClicked][colClicked] = currentPlayer;
    updateHTML();
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
    
    currentPlayer *= -1; // flip -1 to +1 and vice versa
    console.log ("current: " + currentPlayer);
} // end updateHTML()

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



init();

