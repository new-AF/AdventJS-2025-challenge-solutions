import { describe, it } from "node:test";
import { strictEqual } from "node:assert/strict";
import { elfBattle } from "./solution.ts";

const itCases = [
    { elf1: "A", elf2: "B", expectedOutput: 0 },
    { elf1: "F", elf2: "B", expectedOutput: 1 },
    { elf1: "AAB", elf2: "BBA", expectedOutput: 0 },
    { elf1: "AFA", elf2: "BBA", expectedOutput: 1 },
    { elf1: "AFAB", elf2: "BBAF", expectedOutput: 1 },
    { elf1: "AA", elf2: "FF", expectedOutput: 2 },
];

describe("elfBattle(elf1, elf2)", () => {
    itCases.forEach(({ elf1, elf2, expectedOutput }) => {
        const result = elfBattle(elf1, elf2);
        const testFunction = () => strictEqual(result, expectedOutput);
        it(
            `elfBattle(${elf1}, ${elf2}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
