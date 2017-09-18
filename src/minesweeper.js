class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    playMove(rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);
        if(this._board.playerBoard[rowIndex][columnIndex] === 'B') {
            console.log('Game over! Final board: ');
            this._board.print();
        } else if(this._board.hasSafeTiles() !== true) {
            console.log("Congratulations, you've won!");
            this._board.print();
        } else {
            console.log("Current board: ");
            this._board.print();
        }
    }
}

class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = (numberOfRows * numberOfColumns);
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    get playerBoard() {
        return this._playerBoard;
    }

    //Selects hardcoded tile and determines('flips') if that tile has been flipped, if so, updates player board with either number of bombs or the bomb itself
    flipTile(rowIndex, columnIndex) {
        if(this._playerBoard[rowIndex][columnIndex] !== ' ') {
            console.log('This tile has already been flipped!');
            return;
        } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }
        this._numberOfTiles --;
    }

    //Determines if there are bombs near the hardcoded tile, if so, how many
    getNumberOfNeighborBombs(rowIndex, columnIndex) {
        const neighborOffsets = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1]
        ];
    
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
        this._numberOfBombs = 0;
    
        neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];
    
            if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                if(this._bombBoard[neighborRowIndex][neighborColumnIndex] = 'B') {
                    this._numberOfBombs++;
                }
            }
        });
        return this._numberOfBombs;
    }

    hasSafeTiles() {
        return this._numberOfTiles !== this._numberOfBombs;
    }

        //Makes the board
    print() {
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }

    //Creates the empty player board
    static generatePlayerBoard(numberOfRows, numberOfColumns) {
        let board = [];
        for (let i = 0; i < numberOfRows; i++) {
            let row = [];
            for (let j = 0; j < numberOfColumns; j++) {
                row.push(' ');
            }
            board.push(row);
        }
        return board;
    }

    //Creates the bomb board with bombs randomly assigned
    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
        let board = [];
        for (let i = 0; i < numberOfRows; i++) {
            let row = [];
            for (let j = 0; j < numberOfColumns; j++) {
                row.push(null);
            }
            board.push(row);
        }
    
        let numberOfBombsPlaced = 0;
        while (numberOfBombsPlaced < numberOfBombs) {
            let randomRowIndex = Math.floor(Math.random() * numberOfRows);
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    
            if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            }
        }
        return board;
    }
}

const g = new Game(4, 4, 3);
g.playMove(1,0);