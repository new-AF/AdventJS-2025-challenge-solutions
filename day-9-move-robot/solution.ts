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
- RU (Right, Up), hit obstacle (#), returns 'crash' immediately

Solution:
- Convert string board to 2D array
- Find initial robot location
- Follow control moves, and apply result logic.

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

    // move logic
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

    // board representation (as 2d array)
    const newBoard = {} as {
        rowCount: number;
        columnCount: number;
        array2d: Array<Array<BoardElement>>;
        robotCoordinates: Coordinate;
    };

    // convert to 2d array. Space complexity: O(L) or equivalently O(n) where n is number of cells on the board
    newBoard.array2d = board
        .trim()
        .split("\n")
        .map((line) =>
            Array.from(line).map((character) => characterToElement[character])
        );

    newBoard.rowCount = newBoard.array2d.length;
    newBoard.columnCount =
        newBoard.array2d.length > 0 ? newBoard.array2d[0].length : 0;

    // find initial robot location. Runtime: O(m * n)
    for (const [row, array] of newBoard.array2d.entries()) {
        for (const [column, element] of array.entries()) {
            if (element === BoardElement.Robot) {
                newBoard.robotCoordinates = { row, column };
                break;
            }
        }
    }

    // apply control logic of moves. Runtime: O(k) k is length of string
    for (const move of Array.from(moves).map(
        (character) => characterToMove[character]
    )) {
        // get move function, and next location
        const moveFn = moveFunctions[move];
        const { row, column } = moveFn(newBoard.robotCoordinates);

        // Robot wandered off the newBoard
        if (
            row < 0 ||
            column < 0 ||
            row >= newBoard.rowCount ||
            column >= newBoard.columnCount
        ) {
            return "crash";
        }

        // otherwise robot still on newBoard
        const element = newBoard.array2d[row][column];

        if (element === BoardElement.Obstacle) {
            return "crash";
        }
        if (element === BoardElement.Pick) {
            return "success";
        }

        // update location
        newBoard.robotCoordinates = { row, column };
    }

    // Robot ended on empty spot, or back to same place
    return "fail";
};
