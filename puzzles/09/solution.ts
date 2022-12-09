import { Puzzle } from "@/lib/types";
import {
  add,
  lensIndex,
  lensPath,
  over,
  range,
  reduce,
  repeat,
  view,
} from "ramda";
import { sign } from "ramda-adjunct";
import inputFile from "./input.txt";

type Motion = "U" | "D" | "L" | "R";
type Coord = [number, number];
type Rope = Coord[];

const xCoordLens = lensIndex<Coord, number>(0);
const yCoordLens = lensIndex<Coord, number>(1);
const headXLens = lensPath([0, 0]);
const headYLens = lensPath([0, 1]);

const updateTail =
  (head: Coord) =>
  (tail: Coord): Coord => {
    if (head[0] === tail[0] && Math.abs(head[1] - tail[1]) > 1) {
      return over(yCoordLens, add(sign(head[1] - tail[1])), tail);
    }
    if (head[1] === tail[1] && Math.abs(head[0] - tail[0]) > 1) {
      return over(xCoordLens, add(sign(head[0] - tail[0])), tail);
    }
    if (Math.abs(head[0] - tail[0]) + Math.abs(head[1] - tail[1]) > 2) {
      const x = head[0] > tail[0] ? 1 : -1;
      const y = head[1] > tail[1] ? 1 : -1;
      return over(xCoordLens, add(x), over(yCoordLens, add(y), tail));
    }
    return tail;
  };

const getUpdatedHead = (motion: Motion, rope: Rope): Rope => {
  switch (motion) {
    case "U":
      return over(headYLens, add(1), rope);
    case "D":
      return over(headYLens, add(-1), rope);
    case "L":
      return over(headXLens, add(-1), rope);
    case "R":
      return over(headXLens, add(1), rope);
  }
};

const move = (motion: Motion, rope: Rope): Rope => {
  return reduce(
    (acc: Rope, idx: number) =>
      over(lensIndex(idx), updateTail(acc[idx - 1] as Coord), acc),
    getUpdatedHead(motion, rope),
    range(1, rope.length)
  );
};

const getAllMotions = (input: string): Motion[] =>
  input
    .trim()
    .split("\n")
    .flatMap((x) => {
      const [m, l] = x.trim().split(" ");
      return repeat(m as Motion, parseInt(l, 10));
    });

const uniqueCoordsOfIdx = (ropeStates: Rope[], idx: number): number =>
  new Set(
    ropeStates
      .map(view(lensIndex(idx)))
      .map((coord: Coord) => `${coord[0]},${coord[1]}`)
  ).size;

const computeRopeStates = (motions: Motion[], S: Rope): Rope[] =>
  motions.reduce(
    (acc: Rope[], motion: Motion) => [
      ...acc,
      move(motion, acc[acc.length - 1]),
    ],
    [S]
  );

const solve = (input: string, ropeLength: number): number => {
  const motions: Motion[] = getAllMotions(input);
  const S: Rope = repeat([0, 0] as Coord, ropeLength);
  const ropeStates = computeRopeStates(motions, S);
  return uniqueCoordsOfIdx(ropeStates, ropeLength - 1);
};

async function solvePart1(input: string): Promise<number> {
  return solve(input, 2);
}

async function solvePart2(input: string): Promise<number> {
  return solve(input, 10);
}

export default {
  day: "09",
  name: "Rope Bridge",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
