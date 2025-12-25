import TinyPng from "tinypngjs";

import { basename } from "node:path";

const path = ".github/images/compress";

const result = await TinyPng.compress(path, path, (info, percent) => {
    // contains 'input' 'output' objects
    const { input: inputObj, output: outputObj } = info;

    // extract size in bytes
    const { size: sizeBefore } = inputObj;
    const { size: sizeAfter, path } = outputObj;

    const fileName = basename(path);

    // 10%
    const reductionPercentage = (
        ((sizeBefore - sizeAfter) / sizeBefore) *
        100
    ).toFixed(2);

    console.log(
        `${
            percent * 100
        }% Complete -> ${fileName}; Reduction = ${reductionPercentage}%; Size = ${
            sizeAfter / 1000
        } KB`
    );
    // debugger;
});
