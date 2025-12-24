import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { isTreesSynchronized } from "./solution.ts";

const itCases = [
    //
    {
        tree1: {
            value: "🎄",
            left: { value: "⭐" },
            right: { value: "🎅" },
        },
        tree2: {
            value: "🎄",
            left: { value: "🎅" },
            right: { value: "⭐" },
        },
        expectedOutput: [true, "🎄"],
    },

    //
    {
        tree1: {
            value: "🎄",
            left: { value: "⭐" },
            right: { value: "🎅" },
        },
        tree2: {
            value: "🎄",
            left: { value: "🎅" },
            right: { value: "🎁" },
        },
        expectedOutput: [false, "🎄"],
    },

    //
    {
        tree1: {
            value: "🎄",
            left: { value: "⭐" },
            right: { value: "🎅" },
        },
        tree2: {
            value: "🎄",
            left: { value: "⭐" },
            right: { value: "🎅" },
        },
        expectedOutput: [false, "🎄"],
    },

    //
    {
        tree1: { value: "🎅" },
        tree2: { value: "🧑‍🎄" },
        expectedOutput: [false, "🎅"],
    },
];

describe("isTreesSynchronized(...)", () => {
    itCases.forEach(({ tree1, tree2, expectedOutput }) => {
        const result = isTreesSynchronized(tree1, tree2);
        if (result.join("") !== expectedOutput.join("")) {
            // debugger;
        }
        const testFunction = () => deepStrictEqual(result, expectedOutput);
        it(
            `isTreesSynchronized(${tree1}, ${tree2}, ${expectedOutput}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
