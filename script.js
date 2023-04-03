let board = {
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
    counter: 1,
    grid: document.querySelector('.grid'),
    init: function () {
        this.xCells = [];
        this.oCells = [];
        this.counter = 1;
        this.render();
        this.selectCell();
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
    selectCell: function () {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', (e) => {
                this.addCell(index);
                this.marked(this.player, index);
                this.checkWin();
                this.counter++;
            });
        });
    },
    marked: function (mark, index) {
        console.log('round ' + this.counter + ': ' + index + ': ' + mark);
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
            if (this.counter < 9) {
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
                if (oCount === pattern.length) this.declareWinner();
            }
        }
    },
    declareWinner: function (winner, winningCells) {
        if (winner === 'x') {
            console.log('X wins! ' + winningCells);
            winningCells.forEach((cell) => {
                this.cells[cell].classList.add('highlight-win');
            });
        } else if (winner === 'o') {
            console.log('O wins! ' + winningCells);
            winningCells.forEach((cell) => {
                this.cells[cell].classList.add('highlight-lose');
            });
        } else {
            console.log('Draw!');
        }
        board.init();
    },
};

board.player = 'x'; // x or o
board.init();
