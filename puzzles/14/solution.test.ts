import puzzle from "./solution";

describe("Day 14 - Regolith Reservoir", () => {
  it.each([
    [`499,2 -> 500,2`, 0],
    [`499,2 -> 501,2`, 1],
    [
      `498,4 -> 498,6 -> 496,6
    503,4 -> 502,4 -> 502,9 -> 494,9`,
      24,
    ],
  ])("should solve part 1", async (sampleInput: string, expected: number) => {
    const result = await puzzle.solvePart1(sampleInput);
    expect(result).toEqual(expected);
  });

  it.each([
    [
      `498,4 -> 498,6 -> 496,6
  503,4 -> 502,4 -> 502,9 -> 494,9`,
      93,
    ],
  ])("should solve part 2", async (sampleInput: string, expected: number) => {
    const result = await puzzle.solvePart2(sampleInput);
    expect(result).toEqual(expected);
  });
});
