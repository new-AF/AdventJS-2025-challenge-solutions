export const drawGift = (size: number, symbol: string): string => {
    if (size < 2) {
        return "";
    }
    const drawTopBottomLine = (size: number, symbol: string) => {
        const array = new Array(size).fill(symbol);
        const line = array.join("");
        return line;
    };

    const drawMiddleLine = (size: number, symbol: string) => {
        // because 2 outer symbols
        const hollowArray = new Array(size - 2).fill(" ");
        const hollowLine = hollowArray.join("");

        const line = `${symbol}${hollowLine}${symbol}`;
        return line;
    };

    // array of lines
    const lines = new Array(size).fill(0).map((_, index) => {
        const func =
            index === 0 || index === size - 1
                ? drawTopBottomLine
                : drawMiddleLine;
        const line = func(size, symbol);
        return line;
    });

    const gift = lines.join("\n");

    return gift;
};
