import { Puzzle } from "@/lib/types";
import {
  sum,
  head,
  map,
  splitEvery,
  intersection,
  split,
  pipe,
  trim,
} from "ramda";
import inputFile from "./input.txt";

const parseLines = pipe(split("\n"), map(trim));

const charScore = (c: string) =>
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c) + 1;

const intersectAll = <T>(x: T[][]): T[] =>
  x.length === 1 ? x[0] : intersection(x[0], intersectAll(x.slice(1)));

const safeHead = (xs: string[]) => head(xs) || "";
const splitInHalf = (x: string) => splitEvery(x.length / 2, x);

const chunkToScore = pipe(map(split("")), intersectAll, safeHead, charScore);

const part1 = pipe(parseLines, map(splitInHalf), map(chunkToScore), sum);
const part2 = pipe(parseLines, splitEvery(3), map(chunkToScore), sum);

async function solvePart1(input: string): Promise<number> {
  return part1(input);
}

async function solvePart2(input: string): Promise<number> {
  return part2(input);
}

export default {
  day: "03",
  name: "Rucksack organization",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
