-   [Intro](#intro)
-   [Install](#install)
    -   [Run Individual Test Suites](#run-individual-test-suites)
    -   [Run All Tests](#run-all-tests)
-   [Overview](#overview)
    -   [Day 8: Find first non-repeating letter (easy)](#day-8-find-first-non-repeating-letter-easy)
        -   [Solution](#solution)
            -   [Code](#code)
            -   [Tests](#tests)
        -   [Runtime complexity](#runtime-complexity)
        -   [Space complexity](#space-complexity)
        -   [Improvements](#improvements)
    -   [Day 9: Move robot (hard)](#day-9-move-robot-hard)
    -   [Day 13: Assembly board](#day-13-assembly-board)
        -   [Challenge](#challenge)
            -   [Input example](#input-example)
        -   [Solution](#solution-1)
            -   [Code](#code-1)
        -   [Time complexity](#time-complexity)
        -   [Space complexity](#space-complexity-1)
            -   [Example, classic loop](#example-classic-loop)
        -   [Tests](#tests-1)
            -   [Note](#note)

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

<table><thead><tr><th>Day</th><th>Challenge</th><th>Solution</th><th>Time complexity type</th><th>Time complexity precise</th><th>Space complexity</th></tr></thead><tbody><tr><td>8</td><td>Find first non-repeating letter in a string</td><td>Use a dictionary, make inventory of the lowercase letters, do final pass, and check duplicates.</td><td>Linear</td><td>O(n)<br><br>n = input string<br>length</td><td>O(n)</td></tr><tr><td>9</td><td>Move a robot on 2d board, using input string as control, and return some status.</td><td>Convert the board (multi-line string) to a 2D array, find the robot, and follow input move commands.</td><td>Sum of terms</td><td>O(m * n + k)<br><br>m = board row<br>count<br><br>n = columns<br><br>k = control input<br>string length</td><td>O(m * n)</td></tr>
<tr><td>13 Assembly board</td><td>Move a gift using instructions on a 2D assembly board, and return outcomes ("completed", "loop", or "broken")</td><td>Process instructions using a single while loop, avoid loops, and return early.</td><td>Linear</td><td>O(n)<br><br>n = total control<br>string input</td><td>O(n)<br><br></td></tr></tbody></table>

## Day 8: Find first non-repeating letter (easy)

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

// TBW

## Day 13: Assembly board

![screenshot of my day 13 problem and my solution having passed](https://github.com/new-AF/AdventJS-2025-challenge-solutions/blob/main/.github/images/day-13-assembly-line.png?raw=true)

### Challenge

Link: [https://adventjs.dev/challenges/2025/13](https://adventjs.dev/challenges/2025/13)

```ts
type Factory = string[];
type Result = "completed" | "broken" | "loop";

export const runFactory = (factory: Factory): Result => {
    // ...
};
```

#### Input example

```ts
{
    factory: [
        ">v.",
        "^.."
    ],
    expectedOutput: "completed"
}
```

Move a gift using instructions (`string[]`) on a **2D assembly board**, where each `string` is a series of instructions:

-   `'>'` move gift one step right on same row.
-   `'<'` move gift one step left on same row.
-   `'v'` move gift one row down.
-   `'^'` move gift one row up.
-   `'.'` exit pod.

Return these outcomes, early if possible:

-   `'completed'`, if gift hits an exit spot (`.`)
-   `'loop'`, if gift returns to a previously visited position.
-   `'broken'` if gift ends outside of assembly board.

### Solution

[day-13-assembly-board/solution.ts](day-13-assembly-board/solution.ts)

-   Use a single while loop: get current the row, column position of the gift.

-   Detect loops: use a `Set` to check if we visited a previous position (row, column), and return `'loop'` if need be.

-   Call the handler function for that instruction ( `'>'` ), it returns either:

    -   `'completed'` outcome, in which case return early or,
    -   new position.

-   Check if new position is out of board bounds, and return `'broken'`

-   Continue, process next instruction.
-

#### Code

```ts
/*

Day 13: Assembly board

Move a gift using instructions (`string[]`) on a **2D assembly board**, where each `string` is a series of instructions:

-   `'>'` move gift one step right on same row.
-   `'<'` move gift one step left on same row.
-   `'v'` move gift one row down.
-   `'^'` move gift one row up.
-   `'.'` exit pod.

Return these outcomes, early if possible:

-   `'completed'`, if gift hits an exit spot (`.`)
-   `'loop'`, if gift returns to a previously visited position.
-   `'broken'` if gift ends outside of assembly board.
*/

type Factory = string[];
type Result = "completed" | "broken" | "loop";

export const runFactory = (factory: Factory): Result => {
    type Instruction = ">" | "<" | "^" | "v" | ".";

    // assembly line outcome
    enum Outcome {
        Broken = "broken",
        Completed = "completed",
        Loop = "loop",
    }

    type Position = { row: number; column: number };

    type Transition = { outcome: Outcome } | Position;

    // visited locations key
    const makeKey = ({ row, column }: Position) => `${row}, ${column}`;

    // is next location out of bounds
    const isOutOfBounds = ({ width, height, row, column }) =>
        row < 0 || row >= height || column < 0 || column >= width;

    // returns either next coordinates, or assembly line outcome
    const instructionHandlers: Record<
        Instruction,
        (pos: Position) => Transition
    > = {
        ".": ({ row, column }) => {
            return { outcome: Outcome.Completed };
        },

        ">": ({ row, column }) => {
            // advance column
            return { row, column: column + 1 };
        },

        "<": ({ row, column }) => {
            // move back
            return { row, column: column - 1 };
        },

        v: ({ row, column }) => {
            // move down
            return { row: row + 1, column };
        },
        "^": ({ row, column }) => {
            // move up
            return { row: row - 1, column };
        },
    };

    // assembly line state
    const state: {
        row: number;
        column: number;
        visitedPositions: Set<string>;
    } = {
        row: 0,
        column: 0,
        visitedPositions: new Set(),
    };

    const boardInfo = {
        width: factory.length > 0 ? factory[0].length : 0,
        height: factory.length,
    };

    while (state.row < boardInfo.height) {
        const line = factory[state.row];
        const instruction = line[state.column];

        // current position
        const currentPosition: Position = {
            row: state.row,
            column: state.column,
        };

        // 1) detect loops (if we visited this previously)
        const key = makeKey(currentPosition);
        if (state.visitedPositions.has(key)) {
            return Outcome.Loop;
        }
        state.visitedPositions.add(key);

        // returns either next coordinates, or assembly line outcome
        const result = instructionHandlers[instruction](currentPosition);

        // 2) break early if success
        if ("outcome" in result) {
            return result.outcome;
        }

        // 3) are new coordinates out of bounds
        const nextPosition = result;

        if (
            isOutOfBounds({
                ...nextPosition,
                width: boardInfo.width,
                height: boardInfo.height,
            })
        ) {
            return Outcome.Broken;
        }

        state.row = nextPosition.row;
        state.column = nextPosition.column;
    }

    // if factory is empty
    return Outcome.Broken;
};
```

### Time complexity

Is **linear `O(n)`** with respect to `n = count of instructions`. If instructions doubled so would run time.

### Space complexity

Is also linear **linear `O(n)`** because of the `Set<Position>` we use to detect loops. At most we'd store `n` positions, i.e. row, column of each instruction result.

#### Example, classic loop

We would have store entire input length (4) before we can tell this is a loop.

```ts
{
    // classic loop
    factory: `
>v
^<
`,
    expectedOutput: "loop",
}
```

### Tests

[day-13-assembly-board/solution.test.ts](day-13-assembly-board/solution.test.ts)

#### Note

`runFactory` takes in `string[]`, where each string contains instructions for that specific row, but this format although easy for the algorithm to digest, makes it hard to _visualize_ the 2D board.

So I made tests input a single multi-line string, that gets converted (split) into `string[]` before being fed to `runFactory`.

Example:

```ts
{
    // classic loop
    factory: `
>v
^<
`,
    expectedOutput: "loop",
}
```

Gets converted to below:

```ts
{
    // classic loop
    factory: [
">v",
"^<"
],
    expectedOutput: "loop",
}
```
