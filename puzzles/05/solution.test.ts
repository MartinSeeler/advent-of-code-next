import puzzle from "./solution";

describe("Day 05 - Supply Stacks", () => {
  it.each([
    [
      `    [D]    
[N] [C]    
[Z] [M] [P]
  1   2   3 


move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
      "CMZ",
    ],
  ])("should solve part 1", async (sampleInput: string, expected: string) => {
    const result = await puzzle.solvePart1(sampleInput);
    expect(result).toEqual(expected);
  });

  it.each([
    [
      `    [D]    
[N] [C]    
[Z] [M] [P]
  1   2   3 


move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
      "MCD",
    ],
  ])("should solve part 2", async (sampleInput: string, expected: string) => {
    const result = await puzzle.solvePart2(sampleInput);
    expect(result).toEqual(expected);
  });
});
