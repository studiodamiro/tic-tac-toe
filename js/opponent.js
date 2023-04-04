import { board } from './board.js';
import { arbiter } from '../script.js';
import { timer, randomBetween } from './helper.js';

export let opponent = {
    marker: function () {
        if (board.player === 'x') return 'o';
        else return 'x';
    },
    pickCell: async function () {
        if (arbiter.tileDownCounter <= 8) {
            // USING MINIMAX ALGORITHM
            let index = this.findBestMove(arbiter.xCells, arbiter.oCells, arbiter.availableCells);
            await timer(arbiter.delay);
            arbiter.updateStats(this.marker(), index);
            board.marked(this.marker(), index);

            // USING RANDOM NUMBER TO MAKE AI PLAY
            // dumb: let pickaCellInArrayLength = randomBetween(0, arbiter.availableCells.length - 1);
            // dumb: let cellIndex = arbiter.availableCells[pickaCellInArrayLength];
            // await timer(arbiter.delay);
            // dumb: arbiter.updateStats(this.marker(), cellIndex);
            // dumb: board.marked(this.marker(), cellIndex);
        }
        board.protectAvailableCells(false);
    },
    minimax: function (depth, maximizingPlayer, xCells, oCells, availableCells) {
        // Base case: check for a win or draw
        let result = this.checkWinner(xCells, oCells);
        if (result !== null) {
            return result - 10 * depth;
        } else if (availableCells.length === 0) {
            return 0;
        }

        if (maximizingPlayer) {
            // Find the maximum score by recursively calling minimax
            let maxScore = -Infinity;
            for (let i = 0; i < availableCells.length; i++) {
                let cell = availableCells[i];
                let newXCells = xCells.slice();
                newXCells.push(cell);
                let score = this.minimax(
                    depth + 1,
                    false,
                    newXCells,
                    oCells,
                    availableCells.filter((c) => c !== cell)
                );
                maxScore = Math.max(maxScore, score);
            }
            return maxScore;
        } else {
            // Find the minimum score by recursively calling minimax
            let minScore = Infinity;
            for (let i = 0; i < availableCells.length; i++) {
                let cell = availableCells[i];
                let newOCells = oCells.slice();
                newOCells.push(cell);
                let score = this.minimax(
                    depth + 1,
                    true,
                    xCells,
                    newOCells,
                    availableCells.filter((c) => c !== cell)
                );
                minScore = Math.min(minScore, score);
            }
            return minScore;
        }
    },
    checkWinner: function (xCells, oCells) {
        for (let pattern of arbiter.winningPatterns) {
            if (pattern.every((cell) => xCells.includes(cell))) {
                return 100; // X wins
            } else if (pattern.every((cell) => oCells.includes(cell))) {
                return -100; // O wins
            }
        }
        return null; // No winner yet
    },
    findBestMove: function (xCells, oCells, availableCells) {
        let bestScore = -Infinity;
        let bestMove = null;
        for (let i = 0; i < availableCells.length; i++) {
            let cell = availableCells[i];
            let newXCells = xCells.slice();
            newXCells.push(cell);
            let score = this.minimax(
                0,
                false,
                newXCells,
                oCells,
                availableCells.filter((c) => c !== cell)
            );
            if (score > bestScore) {
                bestScore = score;
                bestMove = cell;
            }
        }
        console.log(`The best move is index: ${bestMove}`);
        return bestMove;
    },
};
