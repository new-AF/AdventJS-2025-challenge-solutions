import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { drawTree } from "./solution.ts";

const itCases = [
    {
        height: 5,
        ornament: "o",
        frequency: 2,
        expectedOutput: `
    *
   o*o
  *o*o*
 o*o*o*o
*o*o*o*o*
    #
`,
    },
    {
        height: 3,
        ornament: "@",
        frequency: 3,
        expectedOutput: `
  *
 *@*
*@**@
  #
`,
    },
    {
        height: 4,
        ornament: "+",
        frequency: 1,
        expectedOutput: `
   +
  +++
 +++++
+++++++
   #
`,
    },
];

describe("drawTree(...)", () => {
    itCases.forEach(({ height, ornament, frequency, expectedOutput }) => {
        // trim only start and end
        const trimmed = expectedOutput.replace("\n", "").trimEnd();
        const result = drawTree(height, ornament, frequency);
        const testFunction = () => deepStrictEqual(result, trimmed);
        it(
            `drawTree(${height}, ${ornament}, ${frequency}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
