type ElfDateTime =
    `${number}*${number}*${number}@${number}|${number}|${number} NP`;

/* 
My solution:
- convert elf time to to date-time utc string e.g. "2025-12-25T10:30:00Z"; The 'Z' indicates UTC
- using new Date constructor to convert string to Date object
- subtract as following (takeoff - input date-time), floor result and return it.
*/
export const timeUntilTakeOff = (
    fromTime: ElfDateTime,
    takeOffTime: ElfDateTime
): number => {
    enum ElfSeparators {
        Date = "*",
        TimePrefix = "@",
        Time = "|",
        Timezone = " NP",
    }
    const convert = {
        [ElfSeparators.Date]: "-",
        [ElfSeparators.TimePrefix]: "T",
        [ElfSeparators.Time]: ":",
        [ElfSeparators.Timezone]: "Z",
    };

    const convertToUtc = (time: ElfDateTime) =>
        Object.entries(convert).reduce((stringSoFar, [key, value]) => {
            return stringSoFar.replaceAll(key, value);
        }, time);

    const utcFromTime = convertToUtc(fromTime);
    const dateFromTime = new Date(utcFromTime);

    const utcTakeoff = convertToUtc(takeOffTime);
    const dateTakeoff = new Date(utcTakeoff);

    const milliseconds = dateTakeoff - dateFromTime;
    const seconds = Math.floor(milliseconds / 1000);

    // debugger;
    return seconds;
};
