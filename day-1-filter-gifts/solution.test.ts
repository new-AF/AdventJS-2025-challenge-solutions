import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { filterGifts } from "./solution.ts";

const itCases = [
    {
        input: ["car", "doll#arm", "ball", "#train"],
        expectedOutput: ["car", "ball"],
    },
    {
        input: ["#broken", "#rusty"],
        expectedOutput: [],
    },
    {
        input: [],
        expectedOutput: [],
    },
];

describe("filterGifts(...)", () => {
    itCases.forEach(({ input, expectedOutput }) => {
        const result = filterGifts(input);
        const testFunction = () => deepStrictEqual(result, expectedOutput);
        it(
            `filterGifts(${input}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
