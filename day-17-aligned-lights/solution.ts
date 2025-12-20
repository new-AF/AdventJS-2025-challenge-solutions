export const hasFourLights = (board: string[][]): boolean => {
    // empty board
    if (board.length === 0) {
        return false;
    }

    const firstRow = board[0];

    // empty board [[]]
    if (firstRow === undefined) {
        return false;
    }

    const columnCount = firstRow.length;
    const runSize = 3;
    let run = 0;

    // scan row-wise; reference row, iterate column-wise.
    for (const rowArray of board) {
        for (const [index, cell] of rowArray.entries()) {
            if (index === 0) {
                continue;
            }

            const previous = rowArray[index - 1];

            if (previous !== "." && previous === cell) {
                ++run;
            } else {
                run = 0;
            }

            if (run === runSize) {
                return true;
            }
        }
    }

    // scan column-wise; change both column and row index
    for (let column = 0; column < columnCount; ++column) {
        for (let row = 1; row < board.length; ++row) {
            const previous = board[row - 1][column];
            const cell = board[row][column];

            if (previous !== "." && previous === cell) {
                ++run;
            } else {
                run = 0;
            }

            if (run === runSize) {
                return true;
            }

            // debugger;
        }
    }

    return false;
};
