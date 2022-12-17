/* eslint-disable fp/no-loops */
/* eslint-disable fp/no-mutating-methods */
/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */
import { Puzzle } from "@/lib/types";
import {
  add,
  all,
  equals,
  flip,
  gte,
  has,
  Lens,
  lensIndex,
  lte,
  map,
  max,
  negate,
  over,
  pipe,
  range,
  view,
} from "ramda";
import inputFile from "./input.txt";

type Coord = [number, number];
type Rock = Coord[];

type World = Coord[];

const MinusRock: Rock = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
];

const PlusRock: Rock = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 1],
];

const InvertedLRock: Rock = [
  [0, 0],
  [1, 0],
  [2, 0],
  [2, 1],
  [2, 2],
];

const PipeRock: Rock = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
];

const SquareRock: Rock = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1],
];

const Rocks = [MinusRock, PlusRock, InvertedLRock, PipeRock, SquareRock];

const xLens = lensIndex<Coord, number>(0);
const yLens = lensIndex<Coord, number>(1);

const transform =
  (lens: Lens<Coord, number>) =>
  (n: number) =>
  (rock: Rock): Rock =>
    map(over(lens, add(n)), rock);

const moveRight = transform(xLens);
const moveLeft = pipe(negate, transform(xLens));
const moveUp = transform(yLens);
const moveDown = pipe(negate, transform(yLens));

const getWorldHeight = (world: World): number =>
  world.length === 0 ? 0 : Math.max(...map(view(yLens), world)) + 1;

const Moves = [moveLeft(1), moveRight(1)];
const MoveChars = ["<", ">"];

const gteZero = flip(gte)(0);
const lteSix = flip(lte)(6);

const coordToStr = (coord: Coord) => `${coord[0]},${coord[1]}`;

const isValid =
  (world: Set<string>) =>
  (shape: Rock): boolean =>
    all(gteZero, map(view(xLens), shape)) && // all x >= 0
    all(lteSix, map(view(xLens), shape)) && // all x <= 6
    all(gteZero, map(view(yLens), shape)) && // all y >= 0
    all((coord) => !world.has(coordToStr(coord)), shape);

const getVector =
  (y: number) =>
  (world: Set<string>): number[] =>
    range(0, 7)
      .map((x) => [x, y] as Coord)
      .map((coord) => (!world.has(coordToStr(coord)) ? 1 : 0));

const play = (input: string, rounds: number): number => {
  let rockIdx = 0;
  let windIdx = 0;
  let maxH = 0;
  const pushes = input.split("").map((x) => Moves[MoveChars.indexOf(x)]);
  let worldString = new Set<string>();
  let currentRock = pipe(moveUp(3 + maxH), moveRight(2))(Rocks[rockIdx]);
  let stopped = false;
  let finalHeightOffset = 0;
  while (!stopped) {
    const pushedShape = pushes[windIdx % pushes.length](currentRock);
    windIdx++;
    if (isValid(worldString)(pushedShape)) {
      currentRock = pushedShape;
    }
    const downShape = moveDown(1)(currentRock);
    const shapeBeforeDown = currentRock;
    if (isValid(worldString)(downShape)) {
      currentRock = downShape;
    }
    if (equals(currentRock, shapeBeforeDown)) {
      worldString = new Set([
        ...worldString,
        ...currentRock.map((x) => x.join(",")),
      ]);
      maxH = max(maxH, currentRock.map(view(yLens)).reduce(max, 0) + 1);
      // console.log("maxH", maxH);
      rockIdx++;
      currentRock = pipe(
        moveUp(3 + maxH),
        moveRight(2)
      )(Rocks[rockIdx % Rocks.length]);
      stopped = rockIdx >= rounds;
    }
  }
  console.log("maxH", maxH);
  return maxH + finalHeightOffset;
};

async function solvePart1(input: string): Promise<number> {
  return play(input, 2022);
}

async function solvePart2(input: string): Promise<number> {
  return play(input, -1);
}

export default {
  day: "17",
  name: "Pyroclastic Flow",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
