import puzzle from "./solution";

describe("Day 17 - Pyroclastic Flow", () => {
  it.each([[`>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`, 3068]])(
    "should solve part 1",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart1(sampleInput);
      expect(result).toEqual(expected);
    }
  );

  it.each([[`>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`, 1514285714288]])(
    "should solve part 2",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart2(sampleInput);
      expect(result).toEqual(expected);
    }
  );
});
