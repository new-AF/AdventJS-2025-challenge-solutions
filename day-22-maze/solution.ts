/* 
classic maze traversal problem, can be solved either with DFS or BFS

my solution:
- use dfs, stack
- start from 'S' and move in pattern left, right, down, up
- backtrack if necessary
- check each time if current cell ends in 'E', immediately return true
*/
export const canEscape = (maze: string[][]): boolean => {
    // aliases for better readability
    type Row = number;
    type Column = number;

    enum Direction {
        Start = "Start",
        Up = "Up",
        Down = "Down",
        Right = "Right",
        Left = "Left",
    }

    type Position = { direction: Direction; row: Row; column: Column };

    // because Set can't meaningfully store objects
    type PositionKey = `${Row}, ${Column}`;

    // to avoid loops
    const visitedCells = new Set<PositionKey>();

    //
    const getStartPosition = (currentMaze: string[][]): Position | null => {
        for (const [row, array] of currentMaze.entries()) {
            for (const [column, cell] of array.entries()) {
                if (cell === "S") {
                    return { direction: Direction.Start, row, column };
                }
            }
        }

        // malformed input
        return null;
    };

    // because Set doesn't work with objects
    const makePositionKey = (position: Position): PositionKey =>
        `${position.row}, ${position.column}`;

    const isOutOfBounds = (currentPosition: Position) => {
        const { row, column } = currentPosition;
        return (
            row < 0 ||
            row >= maze.length ||
            column < 0 ||
            column >= maze[0].length
        );
    };

    const isAWall = (currentPosition: Position): boolean => {
        const { row, column } = currentPosition;
        const cell = maze[row][column];
        if (cell === "#") {
            return true;
        }

        return false;
    };

    const getNeighbors = (currentPosition: Position): Position[] => {
        const { row, column } = currentPosition;
        const directionToPosition = {
            [Direction.Up]: { direction: Direction.Up, row: row - 1, column },
            [Direction.Down]: {
                direction: Direction.Down,
                row: row + 1,
                column,
            },
            [Direction.Right]: {
                direction: Direction.Right,
                row,
                column: column + 1,
            },
            [Direction.Left]: {
                direction: Direction.Left,
                row,
                column: column - 1,
            },
        };

        // make sure it's not out of bounds, or a wall
        const validPositions = Object.values(directionToPosition).filter(
            (position) => {
                return !isOutOfBounds(position);
            }
        );

        return validPositions;
    };

    const isAnExit = (currentPosition: Position) => {
        const { row, column } = currentPosition;
        const cell = maze[row][column];
        const result = cell === "E";
        return result;
    };

    // get start position
    const start = getStartPosition(maze);

    if (start === null) {
        return false;
    }

    const stack: Array<Position> = [start];

    while (stack.length > 0) {
        // exploring current cell
        const currentPosition = stack.pop();

        // debugger;

        // to shut up stupid TS compiler
        if (currentPosition === undefined) {
            break;
        }

        // add to visited
        visitedCells.add(makePositionKey(currentPosition));

        // return early
        if (isAnExit(currentPosition)) {
            return true;
        }

        // only guaranteed to be in bounds
        const neighbors = getNeighbors(currentPosition);

        // is not a wall, or previously visited
        const notVisited = neighbors.filter((position) => {
            const key = makePositionKey(position);
            const result = !isAWall(position) && !visitedCells.has(key);
            return result;
        });

        stack.push(...notVisited);

        // debugger;
    }

    // debugger;
    return false;
};
