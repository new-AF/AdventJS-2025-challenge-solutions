import { describe, it } from "node:test";
import { strictEqual } from "node:assert/strict";
import { hasFourLights } from "./solution.ts";

const itCases = [
    {
        input: [
            [".", ".", ".", ".", "."],
            ["R", "R", "R", "R", "."],
            ["G", "G", ".", ".", "."],
        ],
        expectedOutput: true,
    },
    {
        input: [
            [".", "G", ".", "."],
            [".", "G", ".", "."],
            [".", "G", ".", "."],
            [".", "G", ".", "."],
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
];

describe("hasFourLights(...)", () => {
    itCases.forEach(({ input, expectedOutput }) => {
        const result = hasFourLights(input);
        const testFunction = () => strictEqual(result, expectedOutput);
        it(
            `hasFourLights(${input}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
