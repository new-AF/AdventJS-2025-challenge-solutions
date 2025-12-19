import { describe, it } from "node:test";
import { strictEqual } from "node:assert/strict";
import { packGifts } from "./solution.ts";

const itCases = [
    { gifts: [3, 3, 3], capacity: 5, expectedOutput: 3 },
    { gifts: [1, 2, 3, 4, 5], capacity: 10, expectedOutput: 2 },
    { gifts: [2, 3, 4, 1], capacity: 5, expectedOutput: 2 },
    { gifts: [3, 3, 2, 1], capacity: 3, expectedOutput: 3 },
    { gifts: [1, 1, 1, 1], capacity: 2, expectedOutput: 2 },

    // because at least one gift > capacity
    { gifts: [5, 6, 1], capacity: 5, expectedOutput: null },
    { gifts: [], capacity: 10, expectedOutput: 0 },
];

describe("packGifts()", () => {
    itCases.forEach(({ gifts, capacity, expectedOutput }) => {
        const result = packGifts(gifts, capacity);
        const testFunction = () => strictEqual(result, expectedOutput);
        it(
            `packGifts(${gifts}, ${capacity}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
