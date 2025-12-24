export const isTreesSynchronized = (
    tree1: { value: string; left?: any; right?: any } | undefined,
    tree2: { value: string; left?: any; right?: any } | undefined
): [boolean, string] => {
    // track levels too
    const traverseBFS = (tree: { value: string; left?: any; right?: any }) => {
        const queue = [tree];

        const alternateTree = new Map();

        let level = 0;
        while (queue.length > 0) {
            const nodesInThisLevel = queue.length;

            // at this level
            const values = [];

            // process all nodes at this level
            for (let index = 0; index < nodesInThisLevel; ++index) {
                // dequeue
                const node = queue.shift();
                if (node === null || node === undefined) {
                    continue;
                }

                // process node

                if (node.value) {
                    values.push(node.value);
                }

                // console.log("-------", level, node);

                // add node to explore
                if (node.left) {
                    queue.push(node.left);
                }

                if (node.right) {
                    queue.push(node.right);
                }
            }

            if (values.length > 0) {
                alternateTree.set(level, values);
            }

            level += 1;
        }

        return alternateTree;
    };

    const root1 = tree1.value;
    const alternateTree1 = traverseBFS(tree1);
    const alternateTree2 = traverseBFS(tree2);

    // if lengths differ return false
    if (alternateTree1.size !== alternateTree2.size) {
        return [false, root1];
    }

    // check if all the values at each level mirror each other
    for (let index = 0; index < alternateTree1.size; ++index) {
        const values1 = alternateTree1.get(index);
        const values2 = alternateTree2.get(index);

        const joined1 = values1.toReversed().join("");
        const joined2 = values2.join("");
        if (joined1 !== joined2) {
            return [false, root1];
        }
        // debugger;
    }
    // check
    // Code here
    return [true, root1];
};
