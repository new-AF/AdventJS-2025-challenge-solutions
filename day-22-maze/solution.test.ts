import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { canEscape } from "./solution.ts";

const itCases = [
    {
        input: [
            ["S", ".", "#", "."],
            ["#", ".", "#", "."],
            [".", ".", ".", "."],
            ["#", "#", "#", "E"],
        ],

        expectedOutput: true,
    },
    {
        input: [
            ["S", "#", "#"],
            [".", "#", "."],
            [".", "#", "E"],
        ],

        expectedOutput: false,
    },
    {
        input: [["S", "E"]],

        expectedOutput: true,
    },
    {
        input: [
            ["S", ".", ".", ".", "."],
            ["#", "#", "#", "#", "."],
            [".", ".", ".", ".", "."],
            [".", "#", "#", "#", "#"],
            [".", ".", ".", ".", "E"],
        ],

        expectedOutput: true,
    },
    {
        input: [
            ["S", ".", "."],
            [".", ".", "."],
            ["#", "#", "#"],
            [".", ".", "E"],
        ],

        expectedOutput: false,
    },
];

describe("canEscape(...)", () => {
    itCases.forEach(({ input, expectedOutput }) => {
        const result = canEscape(input);
        const testFunction = () => deepStrictEqual(result, expectedOutput);
        it(
            `canEscape(${input}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
