import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { drawGift } from "./solution.ts";

const itCases = [
    {
        size: 4,
        symbol: "*",
        expectedOutput: `
****
*  *
*  *
****`,
    },
    {
        size: 3,
        symbol: "#",
        expectedOutput: `
###
# #
###`,
    },
    {
        size: 2,
        symbol: "-",
        expectedOutput: `
--
--`,
    },
    {
        size: 1,
        symbol: "+",
        expectedOutput: "",
    },
];

describe("drawGift(...)", () => {
    itCases.forEach(({ size, symbol, expectedOutput }) => {
        const result = drawGift(size, symbol);
        const trimmed = expectedOutput.trim();
        const testFunction = () => deepStrictEqual(result, trimmed);
        it(
            `drawGift(${size}, ${symbol}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
