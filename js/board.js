import { timer } from './helper.js';
import { arbiter } from '../script.js';
import { opponent } from './opponent.js';

export let board = {
    player: 'x',
    abledPlayButton: true,
    grid: document.querySelector('.grid'),
    init: function () {
        this.render();
        this.cells.forEach((cell) => cell.classList.add('down'));
        this.cells[4].classList.remove('down');
        this.cells[4].classList.add('play');
        this.cells[4].addEventListener('click', (e) => {
            if (this.abledPlayButton) {
                this.abledPlayButton = false;
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
        this.cells.forEach((cell) => {
            cell.classList.remove('down');
            cell.classList.remove('noClick');
            cell.classList.remove('highlight-win');
            cell.classList.remove('highlight-lose');
            cell.classList.remove('o');
            cell.classList.remove('x');
        });
    },
    selectCell: async function () {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', (e) => {
                // e.preventDefault();
                e.stopImmediatePropagation();
                arbiter.updateStats(this.player, index);
                this.marked(this.player, index);
                opponent.pickCell();
                this.protectAvailableCells(true);
            });
        });
    },
    marked: function (mark, index) {
        this.cells[index].classList.add('down');
        this.cells[index].classList.add(mark);
        arbiter.tileDownCounter++;
    },
    protectAvailableCells: function (status) {
        arbiter.availableCells.forEach((cell, index) => {
            let cellIndex = arbiter.availableCells[index];
            if (status) {
                this.cells[cellIndex].classList.add('noClick');
            } else {
                this.cells[cellIndex].classList.remove('noClick');
            }
        });
    },
    highlightWinningCells: async function (winner, winningCells) {
        let winColor = '';
        if (this.player === winner) {
            arbiter.playerScore++;
            winColor = 'highlight-win';
        } else {
            arbiter.opponentScore++;
            winColor = 'highlight-lose';
        }
        winningCells.forEach((cell) => this.cells[cell].classList.add(winColor));

        // New game
        this.protectAvailableCells(true);
        await timer(arbiter.delay);
        arbiter.init();
        this.setGame();
    },
};
