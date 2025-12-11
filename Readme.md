-   [Intro](#intro)
-   [Install](#install)
    -   [Run Individual Test Suites](#run-individual-test-suites)
    -   [Run All Tests](#run-all-tests)
-   [Overview](#overview)
    -   [Day 8 (Find first non-repeating letter)](#day-8-find-first-non-repeating-letter)
        -   [Solution](#solution)
            -   [Code](#code)
            -   [Tests](#tests)
        -   [Runtime complexity](#runtime-complexity)
        -   [Space complexity](#space-complexity)
        -   [Improvements](#improvements)
    -   [Day 9: Move robot (hard)](#day-9-move-robot-hard)

# Intro

These are my TypeScript solutions to the [AdventJS 2025 coding challenge](https://adventjs.dev/challenges/2025) :)

# Install

```bash
git clone https://github.com/new-AF/AdventJS-2025-challenge-solutions
cd AdventJS-2025-challenge-solutions
pnpm install
```

## Run Individual Test Suites

```bash
pnpm day-8-non-repeating-letter
```

## Run All Tests

```bash
pnpm test
```

# Overview

| Day | Challenge                                                                            | Solution                                                                                    | Space Complexity |     |
| --- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ---------------- | --- |
|     |                                                                                      |                                                                                             |                  |     |
| 9   | Move the robot on a 2D board, using input string as control, and return some status. | Convert the board to a 2D array, find the robot, initial location and follow move commands. |
|     |                                                                                      |                                                                                             |
|     |                                                                                      |                                                                                             |
|     |                                                                                      |                                                                                             |                  |     |

## Day 8 (Find first non-repeating letter)

![screenshot of day 8 problem and my solution having passed](https://github.com/new-AF/AdventJS-2025-challenge-solutions/blob/main/.github/images/day-8-intro.png?raw=true)

[https://adventjs.dev/challenges/2025/8](https://adventjs.dev/challenges/2025/8)

The challenge is `findUniqueToy(toy: string): string` should return the first non-repeating letter (regardless of casing) in a string. If all letters are repeated, the function should return an empty string. e.g.

-   `"Gift"` should return `"G"`
-   `"sS"` should return `""`
-   `"reindeeR"` should return `"i"`

Rest of test cases in `day-8-non-repeating-letter/solution.test.ts`

### Solution

1.  Use a dictionary (JS Object `{}`)
2.  Iterate over the string and mark if the lowercase letter occurred before.

    We have to run the entire length of the string, because the first non-repeating letter could be at the very end (e.g. `"aaaaaaaaaaaab"`)

3.  Do another pass, and break out of the function at the first letter that is marked as having no duplicates by referencing the dictionary.

#### Code

[day-8-non-repeating-letter/solution.ts](day-8-non-repeating-letter/solution.ts)

```ts
export function findUniqueToy(toy: string): string {
    const array = Array.from(toy);

    // has a lowerCase ketter occurred before.
    const hasOccuredBefore: Record<string, boolean> = {};

    // run through the whole string, and mark if a lowerCase occured before.
    array.forEach((letter) => {
        const lowerCase = letter.toLowerCase();
        if (Object.hasOwn(hasOccuredBefore, lowerCase)) {
            hasOccuredBefore[lowerCase] = true;
            return;
        }

        hasOccuredBefore[lowerCase] = false;
    });

    // find first one that has no occurrences.
    for (const letter of array) {
        const lowerCase = letter.toLowerCase();
        if (!hasOccuredBefore[lowerCase]) {
            return letter;
        }
    }

    return "";
}
```

#### Tests

[day-8-non-repeating-letter/solution.test.ts](day-8-non-repeating-letter/solution.test.ts)

```ts
import { describe, it } from "node:test";
import { strictEqual } from "node:assert/strict";
import { findUniqueToy } from "./solution.ts";

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
```

### Runtime complexity

Assuming the dictionary key insertion and retrieval is O(1) then:

> `findUniqueToy` runs in **O(n)** or linear time, because:

-   Dictionary construction is O(n) because we iterate over the entire string, and do n queries and insertions.
-   O(n) for the final pass, doing n dictionary retrievals.

### Space complexity

Overall space complexity is **O(n)** because:

-   Dictionary size is O(1) or constant time due to fixed size of alphabet.
-   O(n) for extra array allocation `const array = Array.from(toy);`

    > We could get rid of the extra allocation, and bring overall space complexity to O(1) but we would have to use a regular `for` loop instead of the `forEach` array method (because strings in JS don't have a native `forEach`)
    >
    > To me that's an acceptable tradeoff because I gain extra code _readability_: `forEach` explicitly states that we run the _entire_ length of the string, and there's no early exit as would be possible with a traditional `for` loop.

### Improvements

Instead of the ambiguous empty string (`""`) on failure, the function should always return an object:

```ts
{
    success: boolean;
    (optional) value: string;
}
```

This will explicitly tell if the string had any non-repeating letters. If all the letters are repeated `success` would be `false`, and we wouldn't return `value`

## Day 9: Move robot (hard)
