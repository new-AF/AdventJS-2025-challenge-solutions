/* 
- "broken" if it hit a wall
- "completed" if it lands on a "."
- "loop" if it returns to previous position.
*/

type Factory = string[];
type Result = "completed" | "broken" | "loop";

export const runFactory = (factory: Factory): Result => {
    // Code here

    const processCharacter = {
        ".": ({ column }) => {
            if (column === 0) {
                return { returnStatus: "broken" };
            }
            // assuming all other rules hold
            return { returnStatus: "completed" };
        },

        ">": ({ column, width, previousCharacter }) => {
            // out of bounds
            if (column >= width - 1) {
                return { returnStatus: "broken" };
            }
            // prevent loops
            if (previousCharacter === "<") {
                return { returnStatus: "loop" };
            }
        },

        "<": ({ column, previousCharacter }) => {
            // out of bounds
            if (column === 0) {
                return { returnStatus: "broken" };
            }
            if (previousCharacter === ">") {
                return {
                    returnStatus: "loop",
                };
            }
            return { decrementColumn: true };
        },

        v: ({ row, height, previousCharacter }) => {
            // out of bounds
            if (row >= height) {
                return { returnStatus: "broken" };
            }
            /* prevent loops aka
                ^
                v
            */
            if (previousCharacter === "^") {
                return {
                    returnStatus: "loop",
                };
            }
            return { changeLine: true, row: row + 1 };
        },
        "^": ({ row, previousCharacter }) => {
            // out of bounds
            if (row === 0) {
                return { returnStatus: "broken" };
            }
            if (previousCharacter === "v") {
                return { returnStatus: "loop" };
            }
            return { changeLine: true, row: row - 1 };
        },
    };

    const status: {
        row: number;
        column: number;
        isFirstCharacter: boolean;
        previousCharacter?: string;
    } = {
        row: 0,
        column: 0,
        isFirstCharacter: true,
    };

    const boardInfo = {
        width: factory.length > 0 ? factory[0].length : 0,
        height: factory.length,
    };

    while (status.row < boardInfo.height) {
        const line = factory[status.row];
        // if (line === "v.") debugger;
        while (status.column < boardInfo.width) {
            const character = line[status.column];

            const result = processCharacter[character]({
                ...status,
                ...boardInfo,
            });

            if (result && result.returnStatus) {
                return result.returnStatus;
            }

            status.previousCharacter = character;

            // debugger;

            // go up or down
            if (result && result.changeLine) {
                status.row = result.row;
                break;
            }

            status.column =
                result && result.decrementColumn
                    ? status.column - 1
                    : status.column + 1;
        }
    }
};
