export const manufactureGifts = (
    giftsToProduce: Array<{ toy: string; quantity: number }>
): string[] => {
    // valid instructions
    const commands = giftsToProduce.filter(({ quantity }) => quantity >= 1);

    // double array
    const nestedToys = commands.map(({ toy, quantity }) => {
        const array = new Array(quantity);
        array.fill(toy);
        return array;
    });

    const toys = nestedToys.flat();

    return toys;
};
