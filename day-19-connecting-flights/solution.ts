export const revealSantaRoute = (routes: string[][]): string[] => {
    // this one is always correct
    const [first, second] = routes[0];

    // map from first element to its row
    const map = new Map();

    const flights = [first, second];

    // index from second element forward
    for (let index = 1; index < routes.length; ++index) {
        const row = routes[index];
        const [start, end] = row;
        map.set(start, end);
    }

    // connect flights
    let run = true;
    let nextFlight = second;
    while (run) {
        if (!map.has(nextFlight)) {
            run = false;
            continue;
        }

        // debugger;
        nextFlight = map.get(nextFlight);
        flights.push(nextFlight);
    }
    // debugger;

    return flights;
};
