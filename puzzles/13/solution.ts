import { Puzzle } from "@/lib/types";
import {
  all,
  head,
  map,
  range,
  sort,
  split,
  splitAt,
  sum,
  takeWhile,
  zip,
} from "ramda";
import { isArray, isNumber } from "ramda-adjunct";
import inputFile from "./input.txt";

type Val = number | Vals;
type Vals = Val[];
type Group = {
  first: Vals;
  second: Vals;
};

type EvalResult = "ordered" | "unordered" | "unsure";

const checkOrder = ([left, right]: [Val, Val]): EvalResult => {
  if (isNumber(left) && isNumber(right)) {
    if (left < right) {
      return "ordered";
    }
    if (left > right) {
      return "unordered";
    }
    return "unsure";
  }
  if (isArray(left) && isArray(right)) {
    if (left.length === 0 && right.length === 0) {
      return "unsure";
    }
    if (left.length === 0) {
      return "ordered";
    }
    if (right.length === 0) {
      return "unordered";
    }
    const leftHead = head(left)!;
    const rightHead = head(right)!;
    const headRes = checkOrder([leftHead, rightHead]);
    return headRes === "unsure"
      ? checkOrder([left.slice(1), right.slice(1)])
      : headRes;
  }
  if (isNumber(left) && isArray(right)) {
    return checkOrder([[left], right]);
  }
  if (isArray(left) && isNumber(right)) {
    return checkOrder([left, [right]]);
  }
  return "unordered";
};

async function solvePart1(input: string): Promise<number> {
  const groups = split(/\n\s*\n/, input).map((group) => {
    const [first, second] = group.split("\n").map((x) => JSON.parse(x.trim()));
    return { first, second } as Group;
  });

  return sum(
    groups.map((group, idx) =>
      checkOrder([group.first, group.second]) === "ordered" ? idx + 1 : 0
    )
  );
}

async function solvePart2(input: string): Promise<number> {
  const targets = [[[2]], [[6]]];
  const groups: Vals[] = split(/\n\s*\n/, input)
    .flatMap((group) => group.split("\n").map((x) => JSON.parse(x.trim())))
    .concat(targets);
  const sorted = sort(
    (a, b) => (checkOrder([a, b]) === "ordered" ? -1 : 1),
    groups
  );
  const indices = targets.map((target) => sorted.indexOf(target) + 1);
  return indices[0] * indices[1];
}

export default {
  day: "13",
  name: "Distress Signal",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
