type Gift = string | number | boolean;
type Workshop = Record<string, any>;
type Path = string[];

export const findGiftPath = (workshop: Workshop, gift: Gift): Path => {
    const recursiveCore = (value: Gift | Workshop, pathArray: Path) => {
        // object
        if (typeof value === "object") {
            for (const [key, possibleObject] of Object.entries(value)) {
                const resultArray = recursiveCore(possibleObject, [
                    ...pathArray,
                    key,
                ]);
                if (resultArray.length > 0) {
                    return resultArray;
                }
            }
        }
        // base cases
        // either result found
        if (value === gift) {
            return pathArray;
        }
        // or not
        return [];
    };

    return recursiveCore(workshop, []);
};
