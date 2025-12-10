import { describe, it } from "node:test";
import { strictEqual } from "node:assert/strict";
import { moveReno } from "./solution.ts";

const itCases = [
    {
        board: `
.....
.*#.*
.@...
.....
`,
        controlCases: {
            D: "fail",
            U: "success",
            RU: "crash",
            RRRUU: "success",
            DD: "crash",
            UUU: "success",
            RR: "fail",
        },
    },
];

describe("moveReno(board, controls)", () => {
    itCases.forEach(({ board, controlCases }) => {
        Object.entries(controlCases).forEach(([input, expectedResult]) => {
            const result = moveReno(board, input);
            const testFunction = () => strictEqual(result, expectedResult);
            it(
                `moveReno(${input}) should return >${expectedResult}<`,
                testFunction
            );
        });
    });
});
