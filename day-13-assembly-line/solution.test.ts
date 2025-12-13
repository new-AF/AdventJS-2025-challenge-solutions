import { describe, it } from "node:test";
import { strictEqual } from "node:assert/strict";
import { runFactory } from "./solution.ts";

const itCases = [
    {
        factory:
            /* classic loop
            [
            ">v",
            "^<",
            ]
        */
            [">v", "^<"],
        expectedOutput: "loop",
    },
    { factory: ["."], expectedOutput: "completed" },
    { factory: [">>."], expectedOutput: "completed" },
    { factory: [">>>"], expectedOutput: "broken" },
    { factory: [">><"], expectedOutput: "loop" },
    { factory: [">>v", "..<"], expectedOutput: "completed" },
    { factory: [">>v", "<<<"], expectedOutput: "broken" },
    { factory: [">v.", "^.."], expectedOutput: "completed" },
    { factory: ["v.", "^."], expectedOutput: "loop" },
];

describe("runFactory(factory)", () => {
    itCases.forEach(({ factory, expectedOutput }) => {
        const result = runFactory(factory);
        const testFunction = () => strictEqual(result, expectedOutput);
        it(
            `runFactory(${factory}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
