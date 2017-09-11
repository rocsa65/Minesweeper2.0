'use strict';

var printBoard = function printBoard(board) {
    console.log('Current board:');
    console.log(board[0].join(' | '));
    console.log(board[1].join(' | '));
    console.log(board[2].join(' | '));
};

var board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

console.log(printBoard(board));

board[0][1] = '1';
board[2][2] = 'B';

console.log(printBoard(board));