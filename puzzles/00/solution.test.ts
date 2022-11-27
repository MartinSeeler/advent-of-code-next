import puzzle from "./solution";

describe("Day 00 - UI Demo Day", () => {
  it.each([[``, 0]])(
    "should solve part 1",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart1(sampleInput);
      expect(result).toEqual(expected);
    }
  );

  it.each([[``, 0]])(
    "should solve part 2",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart2(sampleInput);
      expect(result).toEqual(expected);
    }
  );
});
