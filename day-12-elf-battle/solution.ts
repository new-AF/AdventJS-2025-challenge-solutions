/* 
Two elf battle:

- 'A' normal attack, deals 1 damage
- 'B' blocks 'A' attack
- 'F' 2 point attack, cannot be blocked

result:
- 1 elf1 wins
- 2 elf2 wins
- 0 draw

*/

export const elfBattle = (elf1: string, elf2: string): number => {
    const points = { elf1: 3, elf2: 3 };

    const damageFunctions = {
        A: ({ otherMove }) => {
            return otherMove === "B" ? 0 : -1;
        },
        B: (_) => 0,
        F: (_) => -2,
    };

    for (let round = 0; round < elf1.length; ++round) {
        const elf1Move = elf1[round];
        const elf2Move = elf2[round];

        const damageToElf2 = damageFunctions[elf1Move]({ otherMove: elf2Move });
        const damageToElf1 = damageFunctions[elf2Move]({ otherMove: elf1Move });

        points.elf1 += damageToElf1;
        points.elf2 += damageToElf2;

        // both defeated
        if (points.elf1 <= 0 && points.elf2 <= 0) {
            return 0;
        }

        // elf 2 wins
        if (points.elf1 <= 0) {
            return 2;
        }

        // elf 1 wins
        if (points.elf2 <= 0) {
            return 1;
        }
    }

    if (points.elf1 === points.elf2) {
        return 0;
    }

    return points.elf1 < points.elf2 ? 2 : 1;
};
