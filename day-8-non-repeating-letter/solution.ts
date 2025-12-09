/*
Find first non repeating letter (regardless of casing) in a string.
return empty string if all letters are repeated.
*/
export function findUniqueToy(toy: string) {
    // Code here
    return solution(toy);
}

// hash table, mark all letters if loweCcase occurred. Find first one with no occurrences.
const solution = (toy: string): string => {
    const array = Array.from(toy);

    // has a lowerCase ketter occurred before.
    const hasOccuredBefore: Record<string, boolean> = {};

    // run through the whole string, and mark if a lowerCase occured before.
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
};
