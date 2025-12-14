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
