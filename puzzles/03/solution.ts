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
  prop,
  __,
  concat,
  range,
  zipObj,
  reduce,
  defaultTo,
} from "ramda";
import inputFile from "./input.txt";

const parseLines = pipe(split("\n"), map(trim));

const scores = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

const charScore = prop<number>(__, scores);

const intersectAll = <T>(x: T[][]): T[] =>
  x.length === 1 ? x[0] : intersection(x[0], intersectAll(x.slice(1)));

const chunkToScore: (chunks: string[]) => number = pipe(
  map<string, string[]>(split("")),
  intersectAll,
  (xs: string[]) => defaultTo("", head(xs)),
  charScore
);

const part1 = pipe(
  parseLines,
  map((x) => splitEvery(x.length / 2, x)),
  map(chunkToScore),
  sum
);
const part2 = pipe(parseLines, splitEvery(3), map(chunkToScore), sum);

async function solvePart1(input: string): Promise<number> {
  return part1(input);
}

async function solvePart2(input: string): Promise<number> {
  return part2(input);
}

export default {
  day: "03",
  name: "cksack organization",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
