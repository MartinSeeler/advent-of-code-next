import puzzle from "./solution";

describe("Day 06 - Tuning Trouble", () => {
  it.each([
    ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 7],
    ["bvwbjplbgvbhsrlpgdmjqwftvncz", 5],
    ["nppdvjthqldpwncqszvftbrmjlhg", 6],
    ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 10],
    ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 11],
  ])(
    "should solve part 1 with %s to be %d",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart1(sampleInput);
      expect(result).toEqual(expected);
    }
  );

  it.each([["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 19]])(
    "should solve part 2",
    async (sampleInput: string, expected: number) => {
      const result = await puzzle.solvePart2(sampleInput);
      expect(result).toEqual(expected);
    }
  );
});
