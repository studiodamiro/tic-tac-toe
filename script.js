import { board } from './js/board.js';
import { timer } from './js/helper.js';

export let arbiter = {
    xCells: [],
    oCells: [],
    availableCells: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    winningPatterns: [
        // horizontal patterns
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // vertical patterns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // diagonal patterns
        [0, 4, 8],
        [2, 4, 6],
    ],

    delay: 1500, // in ms
    tileDownCounter: 0,
    hasWinner: false,
    playerScore: 0,
    opponentScore: 0,

    cells: document.querySelectorAll('.cell'),
    round: document.querySelector('header em'),
    playerScoreText: document.querySelector('.player'),
    opponentScoreText: document.querySelector('.opponent'),

    init: function () {
        this.hasWinner = false;
        this.xCells = [];
        this.oCells = [];
        this.tileDownCounter = 0;
        this.availableCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        board.protectAvailableCells(false);
    },
    updateStats: function (mark, cellIndex) {
        let index = this.availableCells.indexOf(cellIndex);
        if (index > -1) this.availableCells.splice(index, 1);
        mark === 'x' ? this.xCells.push(cellIndex) : this.oCells.push(cellIndex);

        console.log(
            this.tileDownCounter + ':' + mark + ': ' + cellIndex + ' | ' + this.availableCells
        );
        this.checkWin();
        this.round.textContent = this.tileDownCounter.toString();
        this.playerScoreText.textContent = this.playerScore.toString();
        this.opponentScoreText.textContent = this.opponentScore.toString();
    },
    checkWin: async function () {
        board.protectAvailableCells(true);
        if (this.tileDownCounter <= 8) {
            // Check all winning patterns for X and O
            for (let pattern of arbiter.winningPatterns) {
                let xCount = 0;
                let oCount = 0;
                let winningCells = [];

                // Check how many X's and O's are in the pattern
                for (let cell of pattern) {
                    if (arbiter.xCells.includes(cell)) {
                        xCount++;
                        winningCells.push(cell);
                    }
                    if (arbiter.oCells.includes(cell)) {
                        oCount++;
                        winningCells.push(cell);
                    }
                }
                // If all cells in the pattern belong to one player, that player wins
                if (xCount === pattern.length) {
                    this.hasWinner = true;
                    board.highlightWinningCells('x', winningCells);
                }
                if (oCount === pattern.length) {
                    this.hasWinner = true;
                    board.highlightWinningCells('o', winningCells);
                }
            }
            if (this.tileDownCounter == 8) {
                // New game

                await timer(this.delay);
                board.setGame();
                this.init();
            }
            console.log(this.xCells + ' -X vs O- ' + this.oCells);
        } else {
            // New game
            await timer(this.delay);
            board.setGame();
            this.init();
        }
    },
};

board.player = 'x'; // x or o
board.init();
