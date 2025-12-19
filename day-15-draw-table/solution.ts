type Data = Array<Record<string, string | number>>;
type SortBy = string;

export const drawTable = (data: Data, sortBy: SortBy): string => {
    type Column = { header: string; width: number };

    const upperCaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // column width e.g.  0 => {header: 'A', width: 7}
    const columnInfo = new Map<number, Column>();

    const _drawSeparatorCell = (width: number) => "-".repeat(width);

    const _drawCell = (content: string, width: number) => {
        const space = " ";
        const padded = content.padEnd(width, space);
        const string = `${space}${padded}${space}`;

        return string;
    };

    // +---------+----------+
    const drawSeparatorLine = (columns: Array<Column>) => {
        const capJoinSymbol = "+";
        const cells = columns.map(({ width }) => {
            // +2 because each cell has ' ' before and ' ' after
            return _drawSeparatorCell(width + 2);
        });
        const joined = cells.join(capJoinSymbol);
        const capped = `${capJoinSymbol}${joined}${capJoinSymbol}`;
        return capped;
    };

    const drawContent = (outer: Array<Array<string>>): Array<string> => {
        const capJoinSymbol = "|";

        const lines = outer.map((inner) => {
            const cells = inner.map((string, index) => {
                const info = columnInfo.get(index);

                if (info === undefined) {
                    return;
                }

                const { width } = info;

                const singleCell = _drawCell(string, width);
                return singleCell;
            });
            const joined = cells.join(capJoinSymbol);
            const capped = `${capJoinSymbol}${joined}${capJoinSymbol}`;

            return capped;
        });

        return lines;
    };

    const drawHeader = (array: Array<Column>): string => {
        const capJoinSymbol = "|";

        const cells = array.map(({ header, width }) => {
            const singleCell = _drawCell(header, width);
            return singleCell;
        });

        const joined = cells.join(capJoinSymbol);
        const capped = `${capJoinSymbol}${joined}${capJoinSymbol}`;

        return capped;
    };

    const content: Array<Array<string>> = [];

    // sort content by required key `sort key`
    data.sort((objA, objB) => {
        const [valueA, valueB] = [objA[sortBy], objB[sortBy]];

        if (valueA === undefined || valueB === undefined) {
            return 0;
        }

        // if numbers
        if (typeof valueA === "number" && typeof valueB === "number") {
            return valueA - valueB;
        }

        //else strings
        return String(valueA).localeCompare(String(valueB));
    });

    // extract cells (2d array of strings), set column headers, get max width
    data.forEach((rowObj) => {
        const inner: Array<string> = [];

        Object.entries(rowObj).forEach(([_key, maybeNumber], index) => {
            const value = String(maybeNumber);
            const letter = upperCaseAlphabet[index];

            if (letter === undefined) {
                return;
            }

            if (!columnInfo.has(index)) {
                // make column info
                columnInfo.set(index, { header: letter, width: 0 });
            }

            const info = columnInfo.get(index);

            if (info === undefined) {
                return;
            }

            // get max width
            info.width = Math.max(info.width, value.length);

            inner.push(value);
        });

        content.push(inner);
    });

    const line = drawSeparatorLine(Array.from(columnInfo.values()));
    const output = [
        line,
        drawHeader(Array.from(columnInfo.values())),
        line,
        ...drawContent(content),
        line,
    ];
    const print = output.join("\n");
    // debugger;

    return print;
};
