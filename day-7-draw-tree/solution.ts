export const drawTree = (
    height: number,
    ornament: string,
    frequency: number
): string => {
    const treeMatrix: string[][] = [];

    const maxWidth = 2 * height - 1;

    let total = 0;

    // build up default asterisks array
    for (let index = 0; index < height; ++index) {
        const width = 2 * index + 1;

        // make default array
        const line: string[] = new Array(width).fill("*");

        // apply frequency ornaments
        for (const innerIndex of line.keys()) {
            const modulo = (total + innerIndex + 1) % frequency;
            if (modulo === 0) {
                line[innerIndex] = ornament;
            }
        }

        treeMatrix.push(line);
        total += width;
    }

    // add last '#'
    treeMatrix.push(["#"]);

    // center the tree
    for (const array of treeMatrix) {
        const paddingCount = Math.floor((maxWidth - array.length) / 2);
        const padding = new Array(paddingCount).fill(" ");
        array.unshift(...padding);
        // debugger;
    }
    const treeArray = treeMatrix.map((array) => {
        return array.join("");
    });

    const tree = treeArray.join("\n");
    return tree;
};
