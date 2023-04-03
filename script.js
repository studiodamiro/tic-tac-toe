let board = {
    player: 'x',
    cells: document.querySelectorAll('.cell'),
    cell: function () {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                this.marked(this.player, index);
                // return index;
            });
        });
    },
    marked: function (mark, index) {
        console.log(index + ': ' + mark);
        this.cells[index].classList.add('down');
        this.cells[index].classList.add(this.player);
    },
};

board.player = 'o'; // x or o
board.cell();
