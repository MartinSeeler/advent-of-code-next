import { Puzzle } from "@/lib/types";
import {
  add,
  equals,
  groupBy,
  indexOf,
  isEmpty,
  lensPath,
  map,
  minBy,
  over,
  pipe,
  reduce,
  values,
  valuesIn,
} from "ramda";
import inputFile from "./input.txt";

type Coord = [number, number];
type Grid<T> = T[][];
type CharGrid = Grid<string>;
type ElevationGrid = Grid<number>;

const squareValue = (c: string) =>
  indexOf(
    c.replaceAll("S", "a").replaceAll("E", "z"),
    "abcdefghijklmnopqrstuvwxyz"
  );

const parseGrid = (input: string): CharGrid =>
  input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""));

const find = <T>(grid: Grid<T>, value: T): Coord[] =>
  grid.flatMap((row, ridx) =>
    row.flatMap((col, cidx) => (col === value ? [[ridx, cidx] as Coord] : []))
  );

const left = over(lensPath<Coord, 1>([1]), add(-1));
const right = over(lensPath<Coord, 1>([1]), add(1));
const up = over(lensPath<Coord, 0>([0]), add(-1));
const down = over(lensPath<Coord, 0>([0]), add(1));

const validRange: (grid: ElevationGrid) => (coord: Coord) => boolean =
  (grid) =>
  ([y, x]) =>
    x >= 0 && y >= 0 && y < grid.length && x < grid[0].length;

const getNeighbors = (grid: ElevationGrid, coord: Coord): Coord[] =>
  [left(coord), right(coord), up(coord), down(coord)].filter(validRange(grid));

const minBySteps = (xs: [Coord, number][]) =>
  reduce(
    minBy(([_, steps]) => steps),
    xs[0],
    xs
  );

const bfs = (
  grid: ElevationGrid,
  target: Coord,
  queue: [Coord, number][],
  visited = new Set<string>()
): number => {
  if (isEmpty(queue)) return Number.MIN_SAFE_INTEGER;

  const stepsToTarget = queue
    .filter(([coord, _]) => equals(coord, target))
    .map(([_, steps]) => steps)
    .reduce((a, b) => Math.min(a, b), Number.MAX_SAFE_INTEGER);

  if (stepsToTarget !== Number.MAX_SAFE_INTEGER) return stepsToTarget;

  const visitedNext = new Set([
    ...visited,
    ...queue.map(([coord, _]) => coord.toString()),
  ]);
  const valueAt = (coord: Coord) => grid[coord[0]][coord[1]];

  const nextQueue: [Coord, number][] = queue.flatMap(([current, steps]) =>
    getNeighbors(grid, current)
      .filter((coord) => !visitedNext.has(coord.toString()))
      .filter((coord) => valueAt(coord) <= valueAt(current) + 1)
      .map((coord) => [coord, steps + 1] as [Coord, number])
  );
  const nextQueueByMinSteps: [Coord, number][] = pipe(
    groupBy<[Coord, number], string>(([coord, _]) => coord.toString()),
    values,
    map(minBySteps)
  )(nextQueue);

  return bfs(grid, target, nextQueueByMinSteps, visitedNext);
};

async function solvePart1(input: string): Promise<number> {
  const charGrid: CharGrid = parseGrid(input);
  const elevationGrid: ElevationGrid = charGrid.map(map(squareValue));
  const starts = find(charGrid, "S");
  const end = find(charGrid, "E")[0];
  return bfs(elevationGrid, end, [[starts[0], 0]]);
}

async function solvePart2(input: string): Promise<number> {
  const charGrid: CharGrid = parseGrid(input);
  const elevationGrid: ElevationGrid = charGrid.map(map(squareValue));
  const starts = find(charGrid, "a");
  const end = find(charGrid, "E")[0];
  return bfs(
    elevationGrid,
    end,
    starts.map((coord) => [coord, 0])
  );
}

export default {
  day: "12",
  name: "Hill Climbing Algorithm",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
