import puzzle from "./solution";

describe("Day 13 - Distress Signal", () => {
  it.each([
    [
      `[1,1,3,1,1]
  [1,1,5,1,1]
  
  [[1],[2,3,4]]
  [[1],4]
  
  [9]
  [[8,7,6]]
  
  [[4,4],4,4]
  [[4,4],4,4,4]
  
  [7,7,7,7]
  [7,7,7]
  
  []
  [3]
  
  [[[]]]
  [[]]
  
  [1,[2,[3,[4,[5,6,7]]]],8,9]
  [1,[2,[3,[4,[5,6,0]]]],8,9]`,
      13,
    ],
  ])("should solve part 1", async (sampleInput: string, expected: number) => {
    const result = await puzzle.solvePart1(sampleInput);
    expect(result).toEqual(expected);
  });

  it.each([
    [
      `[1,1,3,1,1]
  [1,1,5,1,1]
  
  [[1],[2,3,4]]
  [[1],4]
  
  [9]
  [[8,7,6]]
  
  [[4,4],4,4]
  [[4,4],4,4,4]
  
  [7,7,7,7]
  [7,7,7]
  
  []
  [3]
  
  [[[]]]
  [[]]
  
  [1,[2,[3,[4,[5,6,7]]]],8,9]
  [1,[2,[3,[4,[5,6,0]]]],8,9]`,
      140,
    ],
  ])("should solve part 2", async (sampleInput: string, expected: number) => {
    const result = await puzzle.solvePart2(sampleInput);
    expect(result).toEqual(expected);
  });
});
