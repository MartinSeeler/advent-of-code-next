import { Puzzle } from "@/lib/types";
import inputFile from "./input.txt";

const parsePerElfCalories = (input: string): number[] => {
  const elfGroups = input.split(/\n\s*\n/);
  return elfGroups.map((group) => {
    const answers = group.split(/\n/).map((line) => parseInt(line, 10));
    return answers.reduce((acc, answer) => acc + answer, 0);
  });
};

async function solvePart1(input: string): Promise<number> {
  return Math.max(...parsePerElfCalories(input));
}

async function solvePart2(input: string): Promise<number> {
  return parsePerElfCalories(input)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, answer) => acc + answer, 0);
}

export default {
  day: "01",
  name: "Calorie Counting",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
