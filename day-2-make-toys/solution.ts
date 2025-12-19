const manufactureGifts = (
    giftsToProduce: Array<{ toy: string; quantity: number }>
): string[] => {
    const toys = giftsToProduce
        .filter(({ quantity }) => quantity >= 1)
        .map(({ toy, quantity }) => {});
    return [];
};
