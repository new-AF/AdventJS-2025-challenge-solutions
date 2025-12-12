/* 
The word 'unsafe' has  bad connotations.

solution:
- Find gifts in a string/row,
- Check at most 4 other locations, left, right, up, down
- if none of them contain camera, add +1 
*/
export const findUnsafeGifts = (warehouse: string[]): number => {
    const hasCamera = ({ row, column }) => {
        const board = warehouse;
        const height = board.length;
        const width = height > 0 ? board[0].length : 0;

        // out of board bounds
        if (row < 0 || row >= height) {
            return false;
        }

        if (column < 0 || column >= width) {
            return false;
        }

        const element = board[row][column];

        return element === "#";
    };

    const findGifts = (input: string) => {
        const array: Array<number> = [];

        for (let index = 0; index < input.length; ++index) {
            const character = input[index];
            if (character !== "*") {
                continue;
            }

            array.push(index);
        }

        return array;
    };

    let result = 0;

    for (let row = 0; row < warehouse.length; ++row) {
        const line = warehouse[row];
        for (const column of findGifts(line)) {
            // left, right, up, down
            const hasAnyCamera =
                hasCamera({ row, column: column - 1 }) ||
                hasCamera({ row, column: column + 1 }) ||
                hasCamera({ row: row - 1, column }) ||
                hasCamera({ row: row + 1, column });

            if (!hasAnyCamera) {
                result += 1;
            }
        }
    }

    return result;
};
