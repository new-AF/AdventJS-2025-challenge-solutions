export function dropGifts(warehouse: string[][], drops: number[]): string[][] {
    // drops are column indicies to be filled
    const copyWarehouse = warehouse.map((row) => {
        return [...row];
    });

    for (const column of drops) {
        // start with last row,
        for (let row = copyWarehouse.length - 1; row >= 0; --row) {
            const cell = copyWarehouse[row][column];
            // not empty
            if (cell !== ".") {
                continue;
            }

            // mark filled and stop
            copyWarehouse[row][column] = "#";
            break;
        }
    }

    return copyWarehouse;
}
