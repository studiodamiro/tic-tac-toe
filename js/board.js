import { timer } from './helper.js';

export let board = {
    player: 'x',
    xCells: [],
    oCells: [],
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
    tileDownCounter: 1,
    delay: 1500, // in ms
    ingame: true,
    grid: document.querySelector('.grid'),
    init: function () {
        this.xCells = [];
        this.oCells = [];
        this.render();
        this.cells.forEach((cell) => cell.classList.add('down'));
        this.cells[4].classList.remove('down');
        this.cells[4].classList.add('play');
        this.cells[4].addEventListener('click', (e) => {
            if (this.ingame) {
                this.ingame = false;
                this.cells.forEach((cell) => cell.classList.remove('down'));
                this.cells[4].classList.remove('play');
                this.selectCell();
            }
        });
    },
    render: function () {
        this.grid.textContent = '';
        for (let i = 0; i <= 8; i++) {
            const cell = document.createElement('div');
            this.grid.appendChild(cell);
            cell.setAttribute('class', 'cell');
        }
        this.cells = document.querySelectorAll('.cell');
    },
    setGame: function () {
        this.xCells = [];
        this.oCells = [];
        this.tileDownCounter = 1;
        this.cells.forEach((cell) => {
            cell.classList.remove('down');
            cell.classList.remove('noClick');
            cell.classList.remove('highlight-win');
            cell.classList.remove('highlight-lose');
            cell.classList.remove('o');
            cell.classList.remove('x');
        });
    },
    selectCell: function () {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', (e) => {
                this.addCell(index);
                this.marked(this.player, index);
                this.checkWin();
                this.tileDownCounter++;
            });
        });
    },
    marked: function (mark, index) {
        this.cells[index].classList.add('down');
        this.cells[index].classList.add(this.player);
    },
    addCell: function (index) {
        this.player === 'x' ? this.xCells.push(index) : this.oCells.push(index);
    },
    checkWin: function () {
        // Check all winning patterns for X and O
        for (let pattern of this.winningPatterns) {
            let xCount = 0;
            let oCount = 0;
            let winningCells = [];
            if (this.tileDownCounter < 9) {
                // Check how many X's and O's are in the pattern
                for (let cell of pattern) {
                    if (this.xCells.includes(cell)) {
                        xCount++;
                        winningCells.push(cell);
                    }
                    if (this.oCells.includes(cell)) {
                        oCount++;
                        winningCells.push(cell);
                    }
                }
                // If all cells in the pattern belong to one player, that player wins
                if (xCount === pattern.length) this.declareWinner('x', winningCells);
                if (oCount === pattern.length) this.declareWinner('o', winningCells);
            } else {
                this.declareWinner('draw');
            }
        }
    },
    declareWinner: async function (winner, winningCells) {
        let winColor = '';
        if (this.player === winner) winColor = 'highlight-win';
        else winColor = 'highlight-lose';
        winningCells.forEach((cell) => this.cells[cell].classList.add(winColor));
        this.cells.forEach((cell) => cell.classList.add('noClick'));

        if (winner === 'x') {
        } else if (winner === 'o') {
        } else {
            console.log('Draw!');
        }
        await timer(this.delay);
        board.setGame();
    },
};
