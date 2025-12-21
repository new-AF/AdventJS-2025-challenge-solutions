import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { dropGifts } from "./solution.ts";

const itCases = [
    {
        array: [
            [".", ".", "."],
            [".", "#", "."],
            ["#", "#", "."],
        ],
        control: [0],
        expectedOutput: [
            [".", ".", "."],
            ["#", "#", "."],
            ["#", "#", "."],
        ],
    },
    {
        array: [
            [".", ".", "."],
            ["#", "#", "."],
            ["#", "#", "#"],
        ],
        control: [0, 2],
        expectedOutput: [
            ["#", ".", "."],
            ["#", "#", "#"],
            ["#", "#", "#"],
        ],
    },
    {
        array: [
            [".", ".", "."],
            [".", ".", "."],
            [".", ".", "."],
        ],
        control: [0, 1, 2],
        expectedOutput: [
            [".", ".", "."],
            [".", ".", "."],
            ["#", "#", "#"],
        ],
    },
    {
        array: [
            ["#", "#"],
            ["#", "#"],
        ],
        control: [0, 0],
        expectedOutput: [
            ["#", "#"],
            ["#", "#"],
        ],
    },
];

describe("dropGifts(...)", () => {
    itCases.forEach(({ array, control, expectedOutput }) => {
        const result = dropGifts(array, control);
        // debugger;
        const testFunction = () => deepStrictEqual(result, expectedOutput);
        it(
            `dropGifts(${array}, ${control}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
