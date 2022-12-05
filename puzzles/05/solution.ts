import { Puzzle } from "@/lib/types";
import {
  addIndex,
  isEmpty,
  last,
  map,
  match,
  pipe,
  reduce,
  reject,
  reverse,
  slice,
  split,
  takeLast,
  transpose,
  unnest,
} from "ramda";
import inputFile from "./input.txt";

type Stack = string[];
type Stacks = Stack[];
type Instruction = [number, number, number];

const parseDiagram = (input: string): Stacks =>
  // @ts-ignore
  pipe(
    // @ts-ignore
    split("\n"),
    slice(0, -1), // drop last line
    map((line: string) =>
      map((char) => (char.match(/[A-Z]/) ? [char] : []), split("", line))
    ),
    transpose,
    map(reverse),
    map(unnest),
    reject(isEmpty)
  )(input);

const parseInstruction: (input: string) => Instruction[] = pipe(
  split("\n"),
  map(match(/\d+/g)),
  reject(isEmpty),
  map((xs) => [
    parseInt(xs[0], 10),
    parseInt(xs[1], 10) - 1,
    parseInt(xs[2], 10) - 1,
  ])
);

const recursiveMove = (
  stacks: Stacks,
  [n, from, to]: Instruction,
  singleStep: boolean = true
): Stacks => {
  if (n === 0) {
    return stacks;
  }
  const elementToMove: string[] = takeLast(singleStep ? 1 : n, stacks[from])!;
  return recursiveMove(
    addIndex(map<Stack, Stack>)(
      (stack: Stack, i: number) =>
        i === from
          ? slice(0, -elementToMove.length, stacks[from])
          : i === to
          ? [...stacks[to], ...elementToMove]
          : stack,
      stacks
    ),
    [singleStep ? n - 1 : 0, from, to],
    singleStep
  );
};

const solve = (input: string, singleStep: boolean = true): string => {
  const [diagram, instructions] = split("\n\n", input);
  const stacks: Stacks = parseDiagram(diagram);
  const result: Stacks = reduce(
    (acc: Stacks, instruction: Instruction) =>
      recursiveMove(acc, instruction, singleStep),
    stacks,
    parseInstruction(instructions)
  );
  return result.map((stack) => last(stack)!).join("");
};

async function solvePart1(input: string): Promise<string> {
  return solve(input, true);
}

async function solvePart2(input: string): Promise<string> {
  return solve(input, false);
}

export default {
  day: "05",
  name: "Supply Stacks",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
