import puzzle from "./solution";

describe("Day 12 - Hill Climbing Algorithm", () => {
  it.each([
    [
      `Sabqponm
  abcryxxl
  accszExk
  acctuvwj
  abdefghi`,
      31,
    ],
  ])("should solve part 1", async (sampleInput: string, expected: number) => {
    const result = await puzzle.solvePart1(sampleInput);
    expect(result).toEqual(expected);
  });

  it.each([
    [
      `Sabqponm
  abcryxxl
  accszExk
  acctuvwj
  abdefghi`,
      29,
    ],
  ])("should solve part 2", async (sampleInput: string, expected: number) => {
    const result = await puzzle.solvePart2(sampleInput);
    expect(result).toEqual(expected);
  });
});
