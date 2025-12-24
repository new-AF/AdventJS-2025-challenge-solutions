export const minStepsToDeliver = (map: string[][]): number => {
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

    type Position = {
        direction: Direction;
        row: Row;
        column: Column;
        distance: number;
    };

    // because Set can't meaningfully store objects
    type PositionKey = `${Row}, ${Column}`;

    // to avoid loops
    const visitedCells = new Set<PositionKey>();

    // search the start position
    const getStartPosition = (currentMaze: string[][]): Position | null => {
        for (const [row, array] of currentMaze.entries()) {
            for (const [column, cell] of array.entries()) {
                if (cell === "S") {
                    return {
                        direction: Direction.Start,
                        row,
                        column,
                        distance: 0,
                    };
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
            row >= map.length ||
            column < 0 ||
            column >= map[0].length
        );
    };

    const isAWall = (currentPosition: Position): boolean => {
        const { row, column } = currentPosition;
        const cell = map[row][column];
        if (cell === "#") {
            return true;
        }

        return false;
    };

    // get all valid, but possibly visited before positions
    // always add +1 distance
    const getNeighbors = (currentPosition: Position): Position[] => {
        const { row, column, distance } = currentPosition;
        const directionToPosition = {
            [Direction.Up]: {
                direction: Direction.Up,
                row: row - 1,
                column,
                distance: distance + 1,
            },
            [Direction.Down]: {
                direction: Direction.Down,
                row: row + 1,
                column,
                distance: distance + 1,
            },
            [Direction.Right]: {
                direction: Direction.Right,
                row,
                column: column + 1,
                distance: distance + 1,
            },
            [Direction.Left]: {
                direction: Direction.Left,
                row,
                column: column - 1,
                distance: distance + 1,
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

    // is the cell position a gift
    const isAGift = (currentPosition: Position) => {
        const { row, column } = currentPosition;
        const cell = map[row][column];
        const result = cell === "G";
        return result;
    };

    // get start position
    const start = getStartPosition(map);

    let totalDistance = 0;

    // if unreachable
    if (start === null) {
        return -1;
    }

    // all positions planning to explore
    const queue: Array<Position> = [start];

    const path: Position[] = [];

    const distances: Position[] = [];

    let totalGifts = 0;

    for (const row of map) {
        for (const cell of row)
            if (cell === "G") {
                totalGifts += 1;
            }
    }

    visitedCells.add(makePositionKey(start));

    // start maze searching
    while (queue.length > 0) {
        // exploring current cell
        const currentPosition = queue.shift();

        path.push(currentPosition);

        // debugger;

        // to shut up stupid TS compiler
        if (currentPosition === undefined) {
            break;
        }

        // accumulate distances
        if (isAGift(currentPosition)) {
            totalDistance += currentPosition.distance;
            distances.push(currentPosition);
        }

        // only guaranteed to be in bounds
        const neighbors = getNeighbors(currentPosition);

        // is not a wall, or previously visited
        const notVisited = neighbors.filter((position) => {
            const key = makePositionKey(position);
            const result = !isAWall(position) && !visitedCells.has(key);
            return result;
        });

        // add to visited
        notVisited.forEach((position) => {
            visitedCells.add(makePositionKey(position));
        });

        // this makes it BFS
        queue.push(...notVisited);

        // debugger;
    }

    // return distance, or if at least one gift unreachable -1
    // debugger;
    return distances.length !== totalGifts ? -1 : totalDistance;
};
