import { describe, it } from "node:test";
import { strictEqual } from "node:assert/strict";
import { findUnsafeGifts } from "./solution.ts";

const itCases = [
    { board: [".*.", "*#*", ".*."], result: 0 },
    {
        board: ["...", ".*.", "..."],
        result: 1,
    },
    { board: ["*.*", "...", "*#*"], result: 2 },
    { board: [".....", ".*.*.", "..#..", ".*.*.", "....."], result: 4 },
    { board: ["#*.", "...", "..#"], result: 0 },
    { board: ["...#....", "..*#*..", "...#...."], result: 0 },
    { board: ["*.*", "...", "*.*"], result: 4 },
];

describe("maxDepth(s)", () => {
    itCases.forEach(({ board: input, result: expectedOutput }) => {
        const result = findUnsafeGifts(input);
        const testFunction = () => strictEqual(result, expectedOutput);
        it(
            `findUnsafeGifts(${input}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
