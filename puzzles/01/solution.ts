import { Puzzle } from "@/lib/types";
import inputFile from "./input.txt";

export default {
  day: "01",
  name: "Sonar Sweep",
  inputFile,

  part1: async (input: string) => {
    const lines = input.split("\n").map((line) => parseInt(line, 10));
    return lines.reduce((acc, curr, i, arr) => {
      if (i === 0) return acc;
      return curr > arr[i - 1] ? acc + 1 : acc;
    }, 0);
  },
  part2: async (input: string) => {
    const lines = input.split("\n").map((line) => parseInt(line, 10));
    return lines.reduce((acc, curr, i, arr) => {
      if (i < 2) return acc;
      const sum = arr[i - 2] + arr[i - 1] + curr;
      return sum > arr[i - 2] + arr[i - 1] + arr[i - 3] ? acc + 1 : acc;
    }, 0);
  },
} as Puzzle;
