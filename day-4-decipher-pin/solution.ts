export const decodeSantaPin = (code: string): string | null => {
    const matchAll = code.matchAll(/\[(.*?)\]/g);

    const allTokens = Array.from(matchAll).map((match) => {
        const captureGroup = match[1];
        return captureGroup;
    });

    // input is string
    // readable format  is [optionalN, optionalOps1, optionalOps2...].join('')
    // n is always a digit, followed by optional operations
    // e.g. 1++
    const decipher = (instruction: string) => {
        const first = instruction[0];
        // return previous digit, if there any
        if (first === "<") {
            return { usePreviousDigit: true };
        }
        // get digit
        let number = Number(first);

        // decipher ops
        const ops = instruction.slice(1);
        Array.from(ops).forEach((symbol) => {
            if (symbol === "+") {
                number += 1;
            } else if (symbol === "-") {
                number -= 1;
            }
        });

        // ensure always positive digit e.g. -1, to convert to 9
        const digit = ((number % 10) + 10) % 10;

        return { digit };
    };

    const allDigits = [];
    let previousDigit;

    for (const [index, token] of allTokens.entries()) {
        const { digit, usePreviousDigit } = decipher(token);

        // malformed input
        if (index === 0 && usePreviousDigit) {
            return null;
        }

        // check if to use previous digit, and use it accordingly
        const push: number = usePreviousDigit ? previousDigit : digit;

        allDigits.push(push);
        previousDigit = push;
    }

    const pin = allDigits.join("");

    // less than 4 return null
    if (pin.length < 4) {
        return null;
    }

    return pin;
};
