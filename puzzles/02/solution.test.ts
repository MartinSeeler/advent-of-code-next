import puzzle from "./solution";

describe("puzzle_02", () => {
  it("should solve part 1", async () => {
    const input: string = `forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2`;
    const result = await puzzle.part1(input);
    expect(result).toEqual(150);
  });
});
