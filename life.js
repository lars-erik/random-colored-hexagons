(function() {

    var width,
        height,
        cells = [];

    function cell(x, y) {
        return {
            x: x,
            y: y,
            getNeighbour: function(xDir, yDir) {
                if (xDir === 0) {
                    yDir = yDir * 2;
                }
                if (xDir === -1) {
                    xDir = 0;
                }
                return cells[y + yDir][x + xDir];
            }
        }
    }

    function getCell(x, y) {
        return cells[y][x];
    }

    function init(boardWidth, boardHeight) {
        var x, y;
        width = boardWidth;
        height = boardHeight;
        for (y = 0; y < height; y++) {
            cells[y] = [];
            for (x = 0; x < width; x++) {
                cells[y][x] = cell(x, y);
            }
        }
    }

    window.life = {
        init: init,
        getCell: getCell
    };

}());

(function (describe, it, expect) {
    
    if (!describe) {
        return;
    }

    describe("hexa life", function() {

        beforeEach(function() {
            life.init(4, 6);
        });

        it("finds a cell", function() {
            var cell = life.getCell(1, 2);
            expect(cell).not.toBeNull();
        });

        it("can find neighbours", function() {
            var cases = [
                [-1, -1, 1, 1],
                [1, -1, 2, 1],
                [0, -1, 1, 0],
                [-1, 1, 1, 3],
                [1, 1, 2, 3],
                [0, 1, 1, 4]
                ],
                cell = life.getCell(1, 2),
                neighbour,
                i;
            for (i = 0; i < cases.length; i++) {;
                neighbour = cell.getNeighbour(cases[i][0], cases[i][1]);
                expect(neighbour.x).toEqual(cases[i][2]);
                expect(neighbour.y).toEqual(cases[i][3]);
            }
        });

        

    });

}(window.describe, window.it, window.expect));