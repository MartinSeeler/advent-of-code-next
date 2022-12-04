import { Puzzle } from "@/lib/types";
import { chain, count, map, pipe, split, trim } from "ramda";
import inputFile from "./input.txt";

const conditionP1 = (xs: number[]) =>
  (xs[0] <= xs[2] && xs[1] >= xs[3]) || (xs[2] <= xs[0] && xs[3] >= xs[1]);

const conditionP2 = (xs: number[]) =>
  (xs[0] <= xs[2] && xs[1] >= xs[2]) || (xs[2] <= xs[0] && xs[3] >= xs[0]);

const parseLines = pipe(split("\n"), map(trim));

const lineToRange = pipe(
  split(","),
  map(split("-")),
  chain(map((x) => parseInt(x, 10)))
);

const p1 = pipe(parseLines, map(lineToRange), count(conditionP1));
const p2 = pipe(parseLines, map(lineToRange), count(conditionP2));

async function solvePart1(input: string): Promise<number> {
  return p1(input);
}

async function solvePart2(input: string): Promise<number> {
  return p2(input);
}

export default {
  day: "04",
  name: "Camp Cleanup",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
