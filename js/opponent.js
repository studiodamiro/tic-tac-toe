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
            let pickaCellInArrayLength = randomBetween(0, arbiter.availableCells.length - 1);
            let cellIndex = arbiter.availableCells[pickaCellInArrayLength];
            await timer(arbiter.delay);
            arbiter.updateStats(this.marker(), cellIndex);
            board.marked(this.marker(), cellIndex);
        }
        board.protectAvailableCells(false);
    },
};
