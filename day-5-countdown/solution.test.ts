import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { timeUntilTakeOff } from "./solution.ts";

const takeoff = "2025*12*25@00|00|00 NP";

const itCases = [
    { input: "2025*12*24@23|59|30 NP", takeoff, expectedOutput: 30 },
    { input: "2025*12*25@00|00|00 NP", takeoff, expectedOutput: 0 },
    { input: "2025*12*25@00|00|12 NP", takeoff, expectedOutput: -12 },
];

describe("timeUntilTakeOff(...)", () => {
    itCases.forEach(({ input, takeoff, expectedOutput }) => {
        const result = timeUntilTakeOff(input, takeoff);
        const testFunction = () => deepStrictEqual(result, expectedOutput);
        it(
            `timeUntilTakeOff(${input}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
