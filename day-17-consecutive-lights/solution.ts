import { deepStrictEqual } from "node:assert";

export const hasFourLights = (board: string[][]): boolean => {
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
        let run = 0;
        for (let index = 1; index < input.length; ++index) {
            const cell = input[index];

            if (cell === ".") {
                run = 0;
                previous = cell;
                continue;
            }

            if (cell === previous) {
                ++run;
            } else {
                run = 0;
            }

            if (run === size - 1) {
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

    // has all rows, columns of board
    const normalized: NormalizedArray = [
        ...getRows(board),
        ...getColumns(board),
    ];

    // scan rows, columns
    const result = normalized.some(hasConsecutiveLights);

    // debugger;

    return result;
};
