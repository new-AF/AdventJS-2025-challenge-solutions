/**

Find depth of deepest valid input bracket
If input is malformed, return -1

Solution:
Use a metaphorical stack, and keep two variables:
1) current depth, measured by opened
2) maximum that current depth has ever been



*/
export const maxDepth = (s: string): number => {
    if (s === "[[][]]") {
        // debugger;
    }

    const stackInfo = { currentDepth: 0, maximumDepth: 0 };

    for (const character of s) {
        // push
        if (character === "[") {
            stackInfo.currentDepth += 1;

            // save maximum depth so far
            stackInfo.maximumDepth = Math.max(
                stackInfo.currentDepth,
                stackInfo.maximumDepth
            );
        }

        // pop
        if (character == "]") {
            // stack is empty / malformed input
            if (stackInfo.currentDepth === 0) {
                return -1;
            }
            stackInfo.currentDepth -= 1;
        }
    }

    // stack not empty, malformed input
    if (stackInfo.currentDepth > 0) {
        return -1;
    }

    return stackInfo.maximumDepth;
};
