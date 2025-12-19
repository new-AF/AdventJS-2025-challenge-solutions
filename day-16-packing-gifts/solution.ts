type Gifts = number[];
type MaxWeight = number;
type Result = number | null;

export const packGifts = (gifts: Gifts, maxWeight: MaxWeight): Result => {
    // return null if there at least one gift > capacity
    if (
        gifts.some((gift) => {
            return gift > maxWeight;
        })
    ) {
        return null;
    }

    // how many sleighs are needed
    let count = 0;
    let partialSum = 0;
    for (const singleGift of gifts) {
        // debugger;
        partialSum += singleGift;
        if (partialSum >= maxWeight) {
            count += 1;

            // can't do partial gifts,
            // if current doesn't fit it, reset counter, if it's bigger start gift itself
            partialSum = partialSum > maxWeight ? singleGift : 0;
        }
    }

    if (partialSum > 0) {
        count += 1;
    }

    return count;
};
