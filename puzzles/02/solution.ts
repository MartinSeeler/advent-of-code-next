import { Puzzle } from "@/lib/types";
import inputFile from "./input.txt";

type Instruction = [string, number];
type PositionChange = [number, number];

async function solvePart1(input: string): Promise<number> {
  const lines: Instruction[] = input.split("\n").map((line) => {
    const parts = line.trim().split(" ");
    return [parts[0], parseInt(parts[1], 10)];
  });

  const numbers: PositionChange[] = lines.reduce((acc, instruction) => {
    if (instruction[0] === "forward") {
      return [...acc, [instruction[1], 0]];
    } else if (instruction[0] === "down") {
      return [...acc, [0, instruction[1]]];
    } else if (instruction[0] === "up") {
      return [...acc, [0, -instruction[1]]];
    }
    return acc;
  }, [] as PositionChange[]);
  const [position, depth] = numbers.reduce(
    (acc, curr) => [acc[0] + curr[0], acc[1] + curr[1]],
    [0, 0]
  );
  return position * depth;
}

export default {
  day: "02",
  name: "Dive!",
  inputFile,
  solvePart1: solvePart1,
  solvePart2: async (input: string) => {
    return 0;
  },
} as Puzzle;
