import puzzle from "./solution";

describe("Day 09 - Rope Bridge", () => {
  it.each([
    [
      `R 4
  U 4
  L 3
  D 1
  R 4
  D 1
  L 5
  R 2`,
      13,
    ],
  ])("should solve part 1", async (sampleInput: string, expected: number) => {
    const result = await puzzle.solvePart1(sampleInput);
    expect(result).toEqual(expected);
  });

  it.each([
    [
      `R 4
  U 4
  L 3
  D 1
  R 4
  D 1
  L 5
  R 2`,
      1,
    ],
  ])("should solve part 2", async (sampleInput: string, expected: number) => {
    const result = await puzzle.solvePart2(sampleInput);
    expect(result).toEqual(expected);
  });
});
