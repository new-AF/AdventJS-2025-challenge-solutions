import { describe, it } from "node:test";
import { strictEqual } from "node:assert/strict";
import { elfBattle } from "./solution.ts";

const itCases = [{ elf1: "A", elf2: "B", expectedOutput: 0 }];

describe("elfBattle(...)", () => {
    itCases.forEach(({ elf1, elf2, expectedOutput }) => {
        const result = elfBattle(elf1, elf2);
        const testFunction = () => strictEqual(result, expectedOutput);
        it(
            `elfBattle(${elf1}, ${elf2}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
