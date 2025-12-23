type Glove = { hand: "L" | "R"; color: string };

export const matchGloves = (gloves: Glove[]): string[] => {
    // need a map because plain objects do not follow insertion order
    const tally = new Map();

    const pairs: string[] = [];

    // keep tally: color -> {left: number, right: number}
    gloves.forEach(({ hand, color }) => {
        if (!tally.has(color)) {
            tally.set(color, { left: 0, right: 0 });
        }
        const obj = tally.get(color);
        if (hand === "L") {
            obj.left += 1;
        }
        if (hand === "R") {
            obj.right += 1;
        }

        // multiple duplicates of same color are allowed. there is at least one pair
        if (obj.left >= 1 && obj.right >= 1) {
            pairs.push(color);
            obj.right -= 1;
            obj.left -= 1;
        }
    });

    return pairs;
};
