- [Run Individual Test Suites](#run-individual-test-suites)
- [Run All Tests](#run-all-tests)
- [Day 8 (First non-repeating letter)](#day-8-first-non-repeating-letter)
  - [Solution](#solution)
  - [Runtime complexity](#runtime-complexity)
  - [Space complexity](#space-complexity)
  - [Improvements](#improvements)

## Run Individual Test Suites

```bash
pnpm day-8-non-repeating-letter
```

## Run All Tests

```bash
pnpm test
```

## Day 8 (First non-repeating letter)

The challenge is `findUniqueToy(toy: string): string` should return the first non-repeating letter (regardless of casing) in a string. If all letters are repeated, the function should return an empty string. e.g.

| Input        | Should return |
| ------------ | ------------- |
| `"Gift"`     | `"G"`         |
| `"sS"`       | `""`          |
| `"reindeeR"` | `"i"`         |

### Solution

1.  Use a dictionary (JS Object `{}`)
2.  Iterate over the string and mark if the lowercase letter occurred before.

    We have to run the entire length of the string, because the first non-repeating letter could be at the very end (e.g. `"aaaaaaaaaaaab"`)

3.  Do another pass, and break out of the function at the first letter that is marked as having no duplicates by referencing the dictionary.

### Runtime complexity

Assuming the JS Object key insertion and retrieval is O(1) then

> `findUniqueToy` runs in **O(n)** or linear time, because:

-   Dictionary construction is O(n) because we iterate over the entire string, and query n times, and insert n times.
-

### Space complexity

Likewise O(n) because we the size of the dictionary is O(n;p)

### Improvements

Instead of the ambiguous empty string (`""`) on failure, the function should always return an object:

```ts
{
    success: boolean;
    (optional) value: string;
}
```

This will explicitly tell if the string had any non-repeating letters. If all the letters are repeated `success` would be `false`, and we wouldn't return `value`
