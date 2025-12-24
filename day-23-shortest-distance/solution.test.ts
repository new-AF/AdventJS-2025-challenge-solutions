import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { minStepsToDeliver } from "./solution.ts";

const itCases = [
    {
        input: [
            ["S", ".", "G"],
            [".", "#", "."],
            ["G", ".", "."],
        ],

        expectedOutput: 4,
    },
    {
        input: [
            ["S", "#", "G"],
            ["#", "#", "."],
            ["G", ".", "."],
        ],

        expectedOutput: -1, // unreachable due to obstacles
    },
    {
        input: [["S", "G"]],

        expectedOutput: 1,
    },
];

describe("minStepsToDeliver(...)", () => {
    itCases.forEach(({ input, expectedOutput }) => {
        const result = minStepsToDeliver(input);
        const testFunction = () => deepStrictEqual(result, expectedOutput);
        it(
            `minStepsToDeliver(${input}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
