# Othello

## Motivation

I was looking to code a game that would provide an appropriate challenge for my HTML / CSS/ JS skill set. Othello is a game I played a lot as a child.  It is marketed with the motto "A Minute to Learn . . . A Lifetime to Master!".  True statement--the rules are very straightforward and easy to grasp, so I thought their translation to code would be straightforward.  I was about half right!

## Code Style

## Screenshots

<img src = "https://github.com/caseymccullough/Othello/blob/master/img/Othello-begin.png">The beginning of the game</img>

<img src = "https://github.com/caseymccullough/Othello/blob/master/img/Othello-end.png">The end of the game</img>

## Tests

The init() method establishes a starting gameboard with the expected four-tile layout.  However, for testing purposes, you might choose to adjust this with a starting configuration of your choosing.  init() sets the initial configuration in the code below, where -1 indicates a black tile and +1 indicates a white tile (0 represents an empty space).  By adjusting the values in this grid, you can change the starting configuration for a new game. 

    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push ([0, 0, 0, 1, -1, 0, 0, 0]);
    grid.push ([0, 0, 0, -1, 1, 0, 0, 0]);
    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push ([0, 0, 0, 0, 0, 0, 0, 0]);
    
   ## Remaining Challenges
   
   1. Functioning restart button
   2. Reduce redundancy in code that evaluates all tiles that need to be flipped after a new tile is placed. 
   3. Develop AI to enable single-player option.  Version 1.0 of AI would assess all open spaces that are adjacent to played pieces and calculate the number of flipped tiles that will result from their selection.  


