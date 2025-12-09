import { describe, it } from "node:test";
import { strictEqual } from "node:assert/strict";
import { findUniqueToy } from "./solution.js";

const itCases = {
    Gift: "G",
    sS: "",
    reindeeR: "i",
    AaBbCc: "",
    abcDEF: "a",
    aAaAaAF: "F",
    sTreSS: "T",
    z: "z",
};
describe(findUniqueToy.name, () => {
    Object.entries(itCases).forEach(([input, expectedOutput]) => {
        const result = findUniqueToy(input);
        const testFunction = () => strictEqual(result, expectedOutput);
        it(
            `${findUniqueToy.name}(${input}) should return >${expectedOutput}<`,
            testFunction
        );
    });
});
