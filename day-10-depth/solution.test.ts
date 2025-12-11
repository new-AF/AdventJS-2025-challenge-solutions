import { describe, it } from "node:test";
import { strictEqual } from "node:assert/strict";
import { maxDepth } from "./solution.ts";

const itCases = {
    "": 0,
    "[]": 1,
    "[[]]": 2,
    "[][]": 1,
    "[[][]]": 2,
    "[[[]]]": 3,
    "[][[]][]": 2,
    /* now malformed inputs */
    "][": -1,
    "[[[": -1,
    "[]]]": -1,
    "[][][": -1,
};

describe("maxDepth(s)", () => {
    Object.entries(itCases).forEach(([input, expectedOutput]) => {
        const result = maxDepth(input);
        const testFunction = () => strictEqual(result, expectedOutput);
        it(
            `maxDepth(${input}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
