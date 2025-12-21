export function clearGifts(warehouse: string[][], drops: number[]): string[][] {
    // drops are column indicies to be filled
    const warehouseCopy = warehouse.map((row) => {
        return [...row];
    });

    // has all gifts?
    const isFullRow = (row: string[]) =>
        row.every((el) => {
            return el === "#";
        });

    const removeRow = (array: string[][], index: number): string[][] =>
        array.splice(index, 1);

    const prependRow = (array: string[][], width: number): string[][] => {
        const row = new Array(width).fill(".");
        array.unshift(row);
        return row;
    };

    const columnWidth = warehouse[0].length;

    for (const column of drops) {
        // start with last row,
        for (
            let rowIndex = warehouseCopy.length - 1;
            rowIndex >= 0;
            --rowIndex
        ) {
            const row = warehouseCopy[rowIndex];

            const cell = row[column];
            // not empty
            if (cell !== ".") {
                continue;
            }

            // mark filled and stop
            row[column] = "#";

            if (isFullRow(row)) {
                removeRow(warehouseCopy, rowIndex);
                prependRow(warehouseCopy, columnWidth);
            }

            break;
        }
    }

    return warehouseCopy;
}
