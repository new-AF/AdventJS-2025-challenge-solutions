/* 
- "broken" if it hit a wall
- "completed" if it lands on a "."
- "loop" if it returns to previous position.
*/

type Factory = string[];
type Result = "completed" | "broken" | "loop";

export const runFactory = (factory: Factory): Result => {
    type LocationKey = string;

    const makeKey = ({ row, column }): LocationKey => `${row}, ${column}`;

    const isOutOfBounds = ({ width, height, row, column }) =>
        row < 0 || row >= height || column < 0 || column >= width;

    enum Status {
        Broken = "broken",
        Completed = "completed",
        Loop = "loop",
    }

    const stateFunction = {
        ".": () => {
            return { status: Status.Completed };
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

    const state: {
        row: number;
        column: number;
        visitedLocations: Set<string>;
    } = {
        row: 0,
        column: 0,
        visitedLocations: new Set(),
    };

    const boardInfo = {
        width: factory.length > 0 ? factory[0].length : 0,
        height: factory.length,
    };

    while (state.row < boardInfo.height) {
        const line = factory[state.row];
        // if (line === "v.") debugger;
        const character = line[state.column];

        // 1) detect loops (if we visited this previously)
        const key = makeKey({ row: state.row, column: state.column });
        if (state.visitedLocations.has(key)) {
            return Status.Loop;
        }
        state.visitedLocations.add(key);

        // 2) break early if success
        const result = stateFunction[character](state);

        if (result && result.status) {
            return result.status;
        }

        // 3) are new coordinates out of bounds
        const { row: nextRow, column: nextColumn } = result;

        if (
            isOutOfBounds({
                row: nextRow,
                column: nextColumn,
                width: boardInfo.width,
                height: boardInfo.height,
            })
        ) {
            return Status.Broken;
        }

        state.row = nextRow;
        state.column = nextColumn;
        // debugger;
    }

    // if factory is empty
    return Status.Broken;
};
