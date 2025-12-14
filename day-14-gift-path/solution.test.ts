import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { findGiftPath } from "./solution.ts";

const itCases = [
    {
        workshop: {
            storage: {
                shelf: {
                    box1: "train",
                    box2: "switch",
                },
                box: "car",
            },
            gift: "doll",
        },

        cases: [
            { input: "train", expectedOutput: ["storage", "shelf", "box1"] },
            { input: "switch", expectedOutput: ["storage", "shelf", "box2"] },
            { input: "car", expectedOutput: ["storage", "box"] },
            { input: "doll", expectedOutput: ["gift"] },
            { input: "plane", expectedOutput: [] },
        ],
    },
];

describe("findGiftPath(workshop, gift)", () =>
    itCases.forEach(({ workshop, cases }) =>
        cases.forEach(({ input, expectedOutput }) => {
            const result = findGiftPath(workshop, input);
            const testFunction = () => deepStrictEqual(result, expectedOutput);
            it(
                `findGiftPath(${workshop}, ${input}) should return >${expectedOutput}<`,
                testFunction
            );
        })
    ));
