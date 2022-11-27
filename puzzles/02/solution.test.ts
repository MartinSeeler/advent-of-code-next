import puzzle from "./solution";

describe("Solution for 02.12.2022", () => {
  it.each([
    [
      `forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2`,
      150,
    ],
  ])("should solve part 1", async (sampleInput: string, expected: number) => {
    const result = await puzzle.solvePart1(sampleInput);
    expect(result).toEqual(expected);
  });
});
