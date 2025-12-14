import { describe, it } from "node:test";
import { strictEqual } from "node:assert/strict";
import { runFactory } from "./solution.ts";

const itCases = [
    {
        // classic loop
        factory: `
>v
^<
`,
        expectedOutput: "loop",
    },
    {
        factory: `
.
`,
        expectedOutput: "completed",
    },
    {
        factory: `
>>.
`,
        expectedOutput: "completed",
    },
    {
        factory: `
>>>
`,
        expectedOutput: "broken",
    },
    { factory: `>><`, expectedOutput: "loop" },
    {
        factory: `
>>v
..<
`,
        expectedOutput: "completed",
    },
    {
        factory: `
>>v
<<<
`,
        expectedOutput: "broken",
    },
    {
        factory: `
>v.
^..
`,
        expectedOutput: "completed",
    },
    {
        factory: `
v.
^.
`,
        expectedOutput: "loop",
    },
];

describe("runFactory(factory)", () => {
    itCases.forEach(({ factory, expectedOutput }) => {
        // because factory takes an array of row strings e.g.
        // [">>v", "<<<"]
        const input = factory.trim().split("\n");
        const result = runFactory(input);
        const testFunction = () => strictEqual(result, expectedOutput);
        it(
            `runFactory(${factory}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
