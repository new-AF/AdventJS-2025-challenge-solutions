export const hasFourInARow = (board: string[][]): boolean => {
    type Line = Array<string>;
    type NormalizedArray = Array<Line>;

    const isEmptyBoard = (input: string[][]): boolean =>
        input.length === 0 || input[0].length === 0;

    // checks if any subarray has 4 consecutive lights
    const hasConsecutiveLights = (input: Line): boolean => {
        const size = 4;

        // invalid size
        if (size <= 0) {
            return false;
        }

        // empty array
        if (input.length <= 0) {
            return false;
        }

        let previous = input[0];
        let run = 1;

        for (let index = 1; index < input.length; ++index) {
            const cell = input[index];

            // reset on '.'
            if (cell === ".") {
                run = 1;
                continue;
            }

            // extend run when same
            if (cell === previous) {
                ++run;
            }
            // otherwise reset
            else {
                run = 1;
            }

            if (run === size) {
                return true;
            }

            previous = cell;
        }

        return false;
    };

    // just make a copy
    const getRows = (input: string[][]): NormalizedArray =>
        input.map((innerArray) => [...innerArray]);

    // get all columns
    const getColumns = (input: string[][]): NormalizedArray => {
        const array: NormalizedArray = [];

        if (isEmptyBoard(input)) {
            return array;
        }

        const columnCount = input[0]!.length;

        for (let column = 0; column < columnCount; ++column) {
            const line: Line = [];
            for (const row of input) {
                const cell = row[column]!;
                line.push(cell);
            }
            array.push(line);
        }

        return array;
    };

    // get all diagonals (and anti-diagonals)
    const getDiagonals = (input: string[][]): NormalizedArray => {
        const array: NormalizedArray = [];

        if (isEmptyBoard(input)) {
            return array;
        }

        const rowCount = input.length;
        const columnCount = input[0].length;
        const diagCount = Math.min(rowCount, columnCount);

        const cells: Line = [];
        const otherCells: Line = [];
        // same row, column for diagonals, and reversed column index for anti-diagonals
        for (let index = 0; index < diagCount; ++index) {
            const singleCell = input[index][index];
            const singleOtherCell = input[index][columnCount - 1 - index];
            cells.push(singleCell!);
            otherCells.push(singleOtherCell!);
        }

        array.push(cells, otherCells);

        return array;
    };

    // has all rows, columns of board
    const normalized: NormalizedArray = [
        ...getRows(board),
        ...getColumns(board),
        ...getDiagonals(board),
    ];

    // scan rows, columns
    const result = normalized.some(hasConsecutiveLights);

    // debugger;

    return result;
};
