export const filterGifts = (gifts: string[]): string[] => {
    const filtered = gifts.filter((element) => !element.includes("#"));
    return filtered;
};
