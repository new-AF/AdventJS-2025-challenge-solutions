import { describe, it } from "node:test";
import { strictEqual } from "node:assert/strict";
import { drawTable } from "./solution.ts";

const itCases = [
    {
        input: {
            array: [
                { name: "Charlie", city: "New York" },
                { name: "Alice", city: "London" },
                { name: "Bob", city: "Paris" },
            ],
            sortKey: "name",
        },

        expectedOutput: `
+---------+----------+
| A       | B        |
+---------+----------+
| Alice   | London   |
| Bob     | Paris    |
| Charlie | New York |
+---------+----------+
`,
    },
];

describe("drawTable(...)", () => {
    itCases.forEach(({ input: { array, sortKey }, expectedOutput }) => {
        const result = drawTable(array, sortKey);
        const testFunction = () => strictEqual(result, expectedOutput.trim());
        it(
            `drawTable(${array}, ${sortKey}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
