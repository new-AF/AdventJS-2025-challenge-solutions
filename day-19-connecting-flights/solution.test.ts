import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { revealSantaRoute } from "./solution.ts";

const itCases = [
    {
        input: [
            ["MEX", "CAN"],
            ["UK", "GER"],
            ["CAN", "UK"],
        ],
        expectedOutput: ["MEX", "CAN", "UK", "GER"],
    },

    //
    {
        input: [
            ["USA", "BRA"],
            ["JPN", "PHL"],
            ["BRA", "UAE"],
            ["UAE", "JPN"],
            ["CMX", "HKN"],
        ],
        expectedOutput: ["USA", "BRA", "UAE", "JPN", "PHL"],
    },

    //
    {
        input: [
            ["STA", "HYD"],
            ["ESP", "CHN"],
        ],
        expectedOutput: ["STA", "HYD"],
    },
];

describe("revealSantaRoute(...)", () => {
    itCases.forEach(({ input, expectedOutput }) => {
        const result = revealSantaRoute(input);
        const testFunction = () => deepStrictEqual(result, expectedOutput);
        it(
            `revealSantaRoute(${input}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
