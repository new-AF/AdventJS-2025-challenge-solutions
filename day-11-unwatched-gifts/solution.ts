/* 
I don't like the word 'unsafe' it has some bad connotations.

solution:
- Find gift index in string,
- Check at most 4 other locations, left, right, up, down
- if none of them contain camera, add +1 
*/
export function findUnsafeGifts(warehouse: string[]): number {
    let result = 0;
    warehouse.forEach((line, outerIndex) => {
        Array.from(line).forEach((character, index) => {
            // ignore lines that don't contain gits
            if (character !== "*") {
                return;
            }

            // check left and right if possible
            if (index > 0 && line[index - 1] === "#") {
                return;
            }
            if (index < line.length - 1 && line[index + 1] === "#") {
                return;
            }

            // check up and down if possible
            if (outerIndex > 0 && warehouse[outerIndex - 1][index] === "#") {
                return;
            }
            if (
                outerIndex < warehouse.length - 1 &&
                warehouse[outerIndex + 1][index] === "#"
            ) {
                return;
            }

            result += 1;
        });
    });
    return result;
}
