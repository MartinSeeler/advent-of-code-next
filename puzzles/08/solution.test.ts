import puzzle from "./solution";

describe("Day 08 - Treetop Tree House", () => {
  it.each([
    [
      `30373
  25512
  65332
  33549
  35390`,
      21,
    ],
  ])("should solve part 1", async (sampleInput: string, expected: number) => {
    const result = await puzzle.solvePart1(sampleInput);
    expect(result).toEqual(expected);
  });

  it.each([
    [
      `30373
  25512
  65332
  33549
  35390`,
      8,
    ],
  ])("should solve part 2", async (sampleInput: string, expected: number) => {
    const result = await puzzle.solvePart2(sampleInput);
    expect(result).toEqual(expected);
  });
});
