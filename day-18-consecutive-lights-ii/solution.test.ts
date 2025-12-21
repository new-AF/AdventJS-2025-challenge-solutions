import { describe, it } from "node:test";
import { strictEqual } from "node:assert/strict";
import { hasFourInARow } from "./solution.js";

const itCases = [
    {
        input: [
            ["R", ".", ".", "."],
            [".", "R", ".", "."],
            [".", ".", "R", "."],
            [".", ".", ".", "R"],
        ],
        expectedOutput: true,
    },
    {
        input: [
            [".", ".", ".", "G"],
            [".", ".", "G", "."],
            [".", "G", ".", "."],
            ["G", ".", ".", "."],
        ],
        expectedOutput: true,
    },
    {
        input: [
            ["R", "R", "R", "R"],
            ["G", "G", ".", "."],
            [".", ".", ".", "."],
            [".", ".", ".", "."],
        ],
        expectedOutput: true,
    },
    {
        input: [
            ["R", "G", "R"],
            ["G", "R", "G"],
            ["G", "R", "G"],
        ],
        expectedOutput: false,
    },

    // additional tests

    // 1. square 5x5, diagonal starting at (1,0)
    {
        input: [
            [".", ".", ".", ".", "."],
            ["R", ".", ".", ".", "."],
            [".", "R", ".", ".", "."],
            [".", ".", "R", ".", "."],
            [".", ".", ".", "R", "."],
        ],
        expectedOutput: true,
    },

    // 2. square 5x5, diagonal starting at (0,1)
    {
        input: [
            [".", "G", ".", ".", "."],
            [".", ".", "G", ".", "."],
            [".", ".", ".", "G", "."],
            [".", ".", ".", ".", "G"],
            [".", ".", ".", ".", "."],
        ],
        expectedOutput: true,
    },

    // 3. rectangular 6x5, diagonal starting at (2,0)
    {
        input: [
            [".", ".", ".", ".", "."],
            [".", ".", ".", ".", "."],
            ["R", ".", ".", ".", "."],
            [".", "R", ".", ".", "."],
            [".", ".", "R", ".", "."],
            [".", ".", ".", "R", "."],
        ],
        expectedOutput: true,
    },

    // 4. rectangular 5x6, diagonal starting at (0,2)
    {
        input: [
            [".", ".", "G", ".", ".", "."],
            [".", ".", ".", "G", ".", "."],
            [".", ".", ".", ".", "G", "."],
            [".", ".", ".", ".", ".", "G"],
            [".", ".", ".", ".", ".", "."],
        ],
        expectedOutput: true,
    },

    // 5. square 4x4, diagonal starting at (1,1), only 3 in a row
    {
        input: [
            [".", ".", ".", "."],
            [".", "R", ".", "."],
            [".", ".", "R", "."],
            [".", ".", ".", "."],
        ],
        expectedOutput: false,
    },

    // 6. rectangular 5x4, diagonal starting at (1,0)
    {
        input: [
            [".", ".", ".", "."],
            ["G", ".", ".", "."],
            [".", "G", ".", "."],
            [".", ".", "G", "."],
            [".", ".", ".", "G"],
        ],
        expectedOutput: true,
    },

    // 7. rectangular 4x5, diagonal starting at (0,1)
    {
        input: [
            [".", "R", ".", ".", "."],
            [".", ".", "R", ".", "."],
            [".", ".", ".", "R", "."],
            [".", ".", ".", ".", "R"],
        ],
        expectedOutput: true,
    },

    // 8. square 5x5, diagonal starting at (0,2), only 3 in a row
    {
        input: [
            [".", ".", "G", ".", "."],
            [".", ".", ".", "G", "."],
            [".", ".", ".", ".", "G"],
            [".", ".", ".", ".", "."],
            [".", ".", ".", ".", "."],
        ],
        expectedOutput: false,
    },

    // 9. rectangular 6x5, diagonal starting at (2,1)
    {
        input: [
            [".", ".", ".", ".", "."],
            [".", ".", ".", ".", "."],
            [".", "R", ".", ".", "."],
            [".", ".", "R", ".", "."],
            [".", ".", ".", "R", "."],
            [".", ".", ".", ".", "R"],
        ],
        expectedOutput: true,
    },

    // 10. rectangular 5x6, diagonal starting at (1,3), only 3 in a row
    {
        input: [
            [".", ".", ".", ".", ".", "."],
            [".", ".", ".", "G", ".", "."],
            [".", ".", ".", ".", "G", "."],
            [".", ".", ".", ".", ".", "G"],
            [".", ".", ".", ".", ".", "."],
        ],
        expectedOutput: false,
    },
];

describe("hasFourInARow(...)", () => {
    itCases.forEach(({ input, expectedOutput, debug }) => {
        const result = hasFourInARow(input);
        const testFunction = () => strictEqual(result, expectedOutput);

        if (result !== expectedOutput) {
            debugger;
        }

        it(
            `hasFourInARow(${input}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
