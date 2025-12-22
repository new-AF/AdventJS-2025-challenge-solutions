import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { decodeSantaPin } from "./solution.ts";

const itCases = [
    { input: "[1++][2-][3+][<]", expectedOutput: "3144" },
    { input: "[9+][0-][4][<]", expectedOutput: "0944" },
    { input: "[0][<][<][<]", expectedOutput: "0000", debug: true },
    { input: "[1+][2-]", expectedOutput: null }, // coz less than length 4
];

describe("decodeSantaPin(...)", () => {
    itCases.forEach(({ input, expectedOutput, debug }) => {
        // my jerryrig solution
        if (debug) {
            globalThis.__debug = true;
        }
        const result = decodeSantaPin(input);
        const testFunction = () => deepStrictEqual(result, expectedOutput);
        it(
            `decodeSantaPin(${input}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
