import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { clearGifts } from "./solution.js";

const itCases = [
    {
        array: [
            [".", ".", "."],
            [".", ".", "."],
            ["#", ".", "#"],
        ],
        control: [1],
        expectedOutput: [
            [".", ".", "."],
            [".", ".", "."],
            [".", ".", "."],
        ],
    },
    {
        array: [
            [".", ".", "#"],
            ["#", ".", "#"],
            ["#", ".", "#"],
        ],
        control: [0, 1, 2],
        debug: true,

        /* 

    ['.', '.', '#'],
    ['#', '.', '#'],
    ['#', '.', '#']

    after 0

    ['#', '.', '#'],
    ['#', '.', '#'],
    ['#', '.', '#']

    after 1

    ['#', '.', '#'],
    ['#', '.', '#'],
    ['#', '#', '#']        <- loop index = 2

    remove last row

    ['#', '.', '#'],
    ['#', '.', '#'],      <- loop index = 1
 
    add empty row on top

    ['.', '.', '.'],        <- loop index = 0
    ['#', '.', '#'],
    ['#', '.', '#'],


*/

        expectedOutput: [
            [".", ".", "#"],
            ["#", ".", "#"],
            ["#", ".", "#"],
        ],
    },
];

describe("clearGifts(...)", () => {
    itCases.forEach(({ array, control, expectedOutput, debug }) => {
        // set internal debug flag
        if (debug) {
            globalThis.__debug = true;
        }

        const result = clearGifts(array, control);

        const testFunction = () => deepStrictEqual(result, expectedOutput);
        it(
            `clearGifts(${array}, ${control}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
