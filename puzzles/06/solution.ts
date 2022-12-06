import { Puzzle } from "@/lib/types";
import {
  length,
  equals,
  range,
  slice,
  take,
  transduce,
  uniq,
  filter,
  add,
  compose,
} from "ramda";
import inputFile from "./input.txt";

const solveN = (input: string, n: number): number =>
  transduce(
    // @ts-ignore
    compose<number>(
      filter((i: number) =>
        equals(n, length(uniq(slice(i, i + n, [...input]))))
      ),
      take(1)
    ),
    add,
    n,
    range(0, length(input))
  );

async function solvePart1(input: string): Promise<number> {
  return solveN(input, 4);
}

async function solvePart2(input: string): Promise<number> {
  return solveN(input, 14);
}

export default {
  day: "06",
  name: "Tuning Trouble",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
