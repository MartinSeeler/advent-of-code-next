import { Puzzle } from "@/lib/types";
import { all, flip, lt, reverse, takeWhile, transpose, uniq } from "ramda";
import inputFile from "./input.txt";

type Grid = number[][];

const parseGrid = (input: string): Grid =>
  input
    .trim()
    .split("\n")
    .map((line: string) =>
      line
        .trim()
        .split("")
        .map((char: string) => parseInt(char, 10))
    );

const canBeIgnored = (x: number, y: number, w: number, h: number) =>
  x === 0 || x === w || y === 0 || y === h;

const filterFreeIndices = (grid: Grid, transposed: boolean = false) =>
  grid.flatMap((row: number[], y: number) =>
    row.map((height: number, x: number) =>
      canBeIgnored(x, y, row.length - 1, grid.length - 1)
        ? []
        : all(flip(lt)(height), row.slice(0, x)) ||
          all(flip(lt)(height), row.slice(x + 1))
        ? transposed
          ? [y, x]
          : [x, y]
        : []
    )
  );

const getScore = (grid: Grid) =>
  grid.map((row: number[], y: number) =>
    row.map((height: number, x: number) =>
      canBeIgnored(x, y, row.length - 1, grid.length - 1)
        ? 0
        : (takeWhile(flip(lt)(height), reverse(row.slice(1, x))).length + 1) *
          (takeWhile(flip(lt)(height), row.slice(x + 1, -1)).length + 1)
    )
  );

async function solvePart1(input: string): Promise<number> {
  const grid = parseGrid(input);
  const borderLength = grid.length * 2 + (grid[0].length - 2) * 2;

  const freeIndicesHor = filterFreeIndices(grid, false);
  const freeIndicesVer = filterFreeIndices(transpose(grid), true);
  const uniqueIndices = uniq([...freeIndicesHor, ...freeIndicesVer]);
  return borderLength + uniqueIndices.length - 1;
}

async function solvePart2(input: string): Promise<number> {
  const grid = parseGrid(input);

  const scenicScoresHor = getScore(grid);
  const scenicScoresVer = transpose(getScore(transpose(grid)));

  const result = scenicScoresHor.map((row: number[], x: number) =>
    row.map(
      (height: number, index: number) => height * scenicScoresVer[x][index]
    )
  );
  return Math.max(...result.flat());
}

export default {
  day: "08",
  name: "Treetop Tree House",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
