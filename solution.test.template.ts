import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { elfBattle } from "./solution.ts";

const itCases = [{ input: "A", expectedOutput: 0 }];

describe("elfBattle(...)", () => {
    itCases.forEach(({ input, expectedOutput }) => {
        const result = elfBattle(input);
        const testFunction = () => deepStrictEqual(result, expectedOutput);
        it(
            `elfBattle(${input}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
