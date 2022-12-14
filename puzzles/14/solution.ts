/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */
/* eslint-disable fp/no-loops */
import { Puzzle } from "@/lib/types";
import { range, unnest, xprod } from "ramda";
import inputFile from "./input.txt";

type Tile = [number, number];
type Scan = Tile[];
type OccupiedMap = Set<string>;

const windows = <T>(l: number, xs: T[]) =>
  xs.flatMap((_, i) => (i <= xs.length - l ? [xs.slice(i, i + l)] : []));

const getWallTiles = ([from, to]: [Tile, Tile]): string[] => {
  const xRange = range(Math.min(from[0], to[0]), Math.max(from[0], to[0]) + 1);
  const yRange = range(Math.min(from[1], to[1]), Math.max(from[1], to[1]) + 1);
  return xprod(xRange, yRange).map((x) => x.join(","));
};

const parseInput = (input: string): [OccupiedMap, number] => {
  const scans = input
    .trim()
    .split("\n")
    .map(
      (scan) =>
        scan
          .trim()
          .split(" -> ")
          .map((coords) =>
            coords.split(",").map((x) => parseInt(x, 10))
          ) as Scan
    );
  const maxY = Math.max(...scans.flatMap((scan) => scan.map((x) => x[1])));
  const drawInstructions = unnest(
    scans.map((scan) => windows(2, scan)) as [Tile, Tile][][]
  );
  const occupied: OccupiedMap = drawInstructions.reduce(
    (acc, [from, to]) => new Set([...acc, ...getWallTiles([from, to])]),
    new Set() as OccupiedMap
  );
  return [occupied, maxY];
};

const isOccupied = (occMap: OccupiedMap, [x, y]: Tile): boolean =>
  occMap.has(`${x},${y}`);

const isFree = (occMap: OccupiedMap, [x, y]: Tile): boolean =>
  !isOccupied(occMap, [x, y]);

const getRecursiveNextSandRestCoords = (
  occMap: OccupiedMap,
  [x, y]: Tile,
  maxY: number,
  lastLineBlocked: boolean = false
): Tile | null => {
  if (lastLineBlocked && y === maxY - 1) {
    return [x, y];
  }
  if (y >= maxY) {
    return null;
  }
  if (isFree(occMap, [x, y + 1])) {
    return getRecursiveNextSandRestCoords(
      occMap,
      [x, y + 1],
      maxY,
      lastLineBlocked
    );
  } else {
    if (isOccupied(occMap, [x - 1, y + 1])) {
      if (isOccupied(occMap, [x + 1, y + 1])) {
        return y < maxY ? [x, y] : null;
      } else {
        return getRecursiveNextSandRestCoords(
          occMap,
          [x + 1, y + 1],
          maxY,
          lastLineBlocked
        );
      }
    } else {
      return getRecursiveNextSandRestCoords(
        occMap,
        [x - 1, y + 1],
        maxY,
        lastLineBlocked
      );
    }
  }
};

const solve = (
  input: string,
  yOffset: number = 0,
  lastLineBlocked: boolean = false
): number => {
  let [grid, maxY] = parseInput(input);
  let round = 0;
  while (true) {
    const nextSandRestCoords = getRecursiveNextSandRestCoords(
      grid,
      [500, 0],
      maxY + yOffset,
      lastLineBlocked
    );
    if (nextSandRestCoords === null) {
      break;
    }
    round += 1;
    if (nextSandRestCoords[0] === 500 && nextSandRestCoords[1] === 0) {
      break;
    }
    const [x, y] = nextSandRestCoords;
    grid = grid.add(`${x},${y}`);
  }
  return round;
};

async function solvePart1(input: string): Promise<number> {
  return solve(input);
}

async function solvePart2(input: string): Promise<number> {
  return solve(input, 2, true);
}

export default {
  day: "14",
  name: "Regolith Reservoir",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
