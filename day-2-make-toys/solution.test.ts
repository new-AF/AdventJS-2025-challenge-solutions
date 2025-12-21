import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { manufactureGifts } from "./solution.js";

const itCases = [
    {
        input: [
            { toy: "car", quantity: 3 },
            { toy: "doll", quantity: 1 },
            { toy: "ball", quantity: 2 },
        ],

        expectedOutput: ["car", "car", "car", "doll", "ball", "ball"],
    },
    {
        input: [
            { toy: "train", quantity: 0 }, // not manufactured
            { toy: "bear", quantity: -2 }, // neither
            { toy: "puzzle", quantity: 1 },
        ],

        expectedOutput: ["puzzle"],
    },
    {
        input: [],

        expectedOutput: [],
    },
];

describe("manufactureGifts(...)", () => {
    itCases.forEach(({ input, expectedOutput }) => {
        const result = manufactureGifts(input);
        const testFunction = () => deepStrictEqual(result, expectedOutput);
        it(
            `manufactureGifts(${input}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
