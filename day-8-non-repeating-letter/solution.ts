/*
Find first non repeating letter (regardless of casing) in a string.
return empty string if all letters are repeated. e.g. 

- "Gift" should return "G",
- "sS" should return "",
- "reindeeR" should return "i",

solution: use dictionary, mark all letters if lowerCase occurred. Then go back again and find first one with no occurrences.
*/

export function findUniqueToy(toy: string): string {
    const array = Array.from(toy);

    // has a lowerCase letter occurred before.
    const hasOccuredBefore: Record<string, boolean> = {};

    // run through the whole string, and mark if a lowerCase occurred before.
    array.forEach((letter) => {
        const lowerCase = letter.toLowerCase();
        if (Object.hasOwn(hasOccuredBefore, lowerCase)) {
            hasOccuredBefore[lowerCase] = true;
            return;
        }

        hasOccuredBefore[lowerCase] = false;
    });

    // find first one that has no occurrences.
    for (const letter of array) {
        const lowerCase = letter.toLowerCase();
        if (!hasOccuredBefore[lowerCase]) {
            return letter;
        }
    }

    return "";
}
