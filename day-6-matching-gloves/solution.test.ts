import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { matchGloves } from "./solution.ts";

const itCases = [
    {
        input: [
            { hand: "L", color: "red" },
            { hand: "R", color: "red" },
            { hand: "R", color: "green" },
            { hand: "L", color: "blue" },
            { hand: "L", color: "green" },
        ],
        expectedOutput: ["red", "green"],
    },

    {
        input: [
            { hand: "L", color: "gold" },
            { hand: "R", color: "gold" },
            { hand: "L", color: "gold" },
            { hand: "L", color: "gold" },
            { hand: "R", color: "gold" },
        ],
        expectedOutput: ["gold", "gold"],
    },
    {
        input: [
            { hand: "L", color: "red" },
            { hand: "R", color: "green" },
            { hand: "L", color: "blue" },
        ],
        expectedOutput: [],
    },
    // this one cares about order
    {
        input: [
            { hand: "R", color: "green" },
            { hand: "L", color: "red" },
            { hand: "R", color: "red" },
            { hand: "L", color: "green" },
            { hand: "L", color: "red" },
        ],
        expectedOutput: ["red", "green"],
        debug: true,
    },
    //
    {
        input: [
            { hand: "L", color: "green" },
            { hand: "R", color: "green" },
            { hand: "R", color: "green" },
            { hand: "L", color: "green" },
        ],

        expectedOutput: ["green", "green"],
    },

    //
    {
        input: [
            { hand: "L", color: "red" },
            { hand: "R", color: "green" },
            { hand: "L", color: "green" },
            { hand: "R", color: "red" },
        ],
        expectedOutput: ["green", "red"],
    },
];

describe("matchGloves(...)", () => {
    itCases.forEach(({ input, expectedOutput, debug }) => {
        if (debug) {
            globalThis.__debug = true;
        }
        const result = matchGloves(input);
        const testFunction = () => deepStrictEqual(result, expectedOutput);
        it(
            `matchGloves(${input}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
