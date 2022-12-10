import { Puzzle } from "@/lib/types";
import {
  chain,
  join,
  lensIndex,
  map,
  pipe,
  repeat,
  set,
  split,
  splitEvery,
  trim,
} from "ramda";
import { inRange } from "ramda-adjunct";
import inputFile from "./input.txt";

const getInstructions = pipe(
  trim,
  split("\n"),
  map(trim),
  chain((x) => (x.startsWith("addx") ? ["addx 0", x] : [x])),
  map(split(" "))
);

async function solvePart1(input: string): Promise<number> {
  const [x, _] = getInstructions(input).reduce(
    ([strength, register], x, idx) => [
      (idx + 1 - 20) % 40 === 0 ? strength + (idx + 1) * register : strength,
      x.length === 1 ? register : register + parseInt(x[1], 10),
    ],
    [0, 1]
  );
  return x;
}

async function solvePart2(input: string): Promise<string> {
  const [_, crt] = getInstructions(input).reduce(
    ([register, crt], x, idx) => {
      const [row, col] = [Math.floor(idx / 40), idx % 40];
      const draw = inRange(register - 1, register + 2, col) ? "#" : ".";
      return [
        x.length === 1 ? register : register + parseInt(x[1], 10),
        set(lensIndex(row), set(lensIndex(col), draw, crt[row]), crt),
      ];
    },
    [1, splitEvery(40, repeat(" ", 40 * 6))] as [number, string[][]]
  );
  console.log("Puzzle 10 Part 2:", "\n" + join("\n", map(join(""), crt)));
  return "SEE CONSOLE";
}

export default {
  day: "10",
  name: "Cathode-Ray Tube",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
