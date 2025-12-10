/*
Move the robot on the 2D board, using input string as control.

Return the following accordingly:

- @ is our robot 
- * is something to pick, return 'success' immediately.
- # is obstacle , return 'crash' immediately', or when robot goes outside board.
- . is an empty spot, exhaust input and return 'fail' if robot ends here. Example:

Board:
.....
.*#.*
.@...
.....

Input, and expected out:
- D (Down), robot ended on empty spot (.), having exhausted all input returns 'fail'.
- U (Up), picked up something (*), returns 'success' immediately
- RU (Right,Up), hit obstacle (#), returns 'crash' immediately

*/

export type Board = string;
export type Moves = string;
export type Result = "fail" | "crash" | "success";

export const moveReno = (board: Board, moves: Moves): Result => {
    enum BoardElement {
        Empty = ".",
        Pick = "*",
        Obstacle = "#",
        Robot = "@",
    }

    const characterToElement: Record<string, BoardElement> = {
        ".": BoardElement.Empty,
        "*": BoardElement.Pick,
        "#": BoardElement.Obstacle,
        "@": BoardElement.Robot,
    };

    enum BoardMove {
        Up,
        Down,
        Right,
        Left,
    }

    const characterToMove: Record<string, BoardMove> = {
        U: BoardMove.Up,
        D: BoardMove.Down,
        R: BoardMove.Right,
        L: BoardMove.Left,
    };

    type Coordinate = {
        row: number;
        column: number;
    };

    const moveFunctions = {
        [BoardMove.Left]: ({ row, column }: Coordinate) => ({
            row,
            column: column - 1,
        }),
        [BoardMove.Right]: ({ row, column }: Coordinate) => ({
            row,
            column: column + 1,
        }),
        [BoardMove.Up]: ({ row, column }: Coordinate) => ({
            row: row - 1,
            column,
        }),
        [BoardMove.Down]: ({ row, column }: Coordinate) => ({
            row: row + 1,
            column,
        }),
    };

    const boardInfo = {} as {
        rowCount: number;
        columnCount: number;
        robotCoordinates: Coordinate;
    };

    const board2d: Array<Array<BoardElement>> = board
        .trim()
        .split("\n")
        .map((line) =>
            Array.from(line).map((character) => characterToElement[character])
        );

    boardInfo.rowCount = board2d.length;
    boardInfo.columnCount = board2d.length > 0 ? board2d[0].length : 0;

    board2d.forEach((array, row) =>
        array.forEach((character, column) => {
            if (character === BoardElement.Robot) {
                boardInfo.robotCoordinates = { row, column };
            }
        })
    );

    for (const move of Array.from(moves).map(
        (character) => characterToMove[character]
    )) {
        const moveFn = moveFunctions[move];
        const { row, column } = moveFn(boardInfo.robotCoordinates);

        // Robot wandered off the board.
        if (
            row < 0 ||
            column < 0 ||
            row >= boardInfo.rowCount ||
            column >= boardInfo.columnCount
        ) {
            return "crash";
        }

        // otherwise robot on board
        const element = board2d[row][column];

        if (element === BoardElement.Obstacle) {
            return "crash";
        }
        if (element === BoardElement.Pick) {
            return "success";
        }

        boardInfo.robotCoordinates = { row, column };
    }

    // Robot ended on empty spot, or in same place
    return "fail";

    debugger;
};
