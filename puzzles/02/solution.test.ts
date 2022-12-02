import puzzle from "./solution";

describe("Day 02 - Rock Paper Scissors", () => {
  it.each([
    [
      `A Y
  B X
  C Z`,
      15,
    ],
  ])("should solve part 1", async (sampleInput: string, expected: number) => {
    const result = await puzzle.solvePart1(sampleInput);
    expect(result).toEqual(expected);
  });

  it.each([
    [
      `A Y
  B X
  C Z`,
      12,
    ],
  ])("should solve part 2", async (sampleInput: string, expected: number) => {
    const result = await puzzle.solvePart2(sampleInput);
    expect(result).toEqual(expected);
  });
});
