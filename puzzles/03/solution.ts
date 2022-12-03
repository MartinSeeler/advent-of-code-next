import { Puzzle } from "@/lib/types";
import {
  isEmpty,
  prepend,
  take,
  drop,
  all,
  contains,
  includes,
  find,
  uniq,
  sum,
  slice,
  head,
  curry,
  compose,
  map,
} from "ramda";
import inputFile from "./input.txt";

const parseLines = (input: string): string[] =>
  input.split("\n").map((line) => line.trim());

const charScore = (char: string): number =>
  char.match(/[a-z]/) ? char.charCodeAt(0) - 96 : char.charCodeAt(0) - 38;

const window = <T>(n: number, list: T[]): T[][] =>
  isEmpty(list) ? [] : prepend(take(n, list), window(n, drop(n, list)));

const window3 = curry(window<string>)(3);

const lineToHalfs = (line: string): string[] => [
  slice(0, line.length / 2, line),
  slice(line.length / 2, line.length, line),
];

const isInAll = (chunks: string[]) => (x: string) => all(includes(x), chunks);

const chunkToScore = (chunks: string[]) =>
  head(uniq(chunks[0].split("")).filter(isInAll(chunks)).map(charScore)) || 0;

async function solvePart1(input: string): Promise<number> {
  return compose(sum, map(chunkToScore), map(lineToHalfs), parseLines)(input);
}

async function solvePart2(input: string): Promise<number> {
  return compose(sum, map(chunkToScore), window3, parseLines)(input);
}

export default {
  day: "03",
  name: "Rucksack Reorganization",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
