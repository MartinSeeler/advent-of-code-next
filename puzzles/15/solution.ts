import {
  all,
  any,
  chain,
  compose,
  filter,
  map,
  range,
  sum,
  tap,
  take,
  transduce,
  sort,
} from "ramda";
import { Puzzle } from "@/lib/types";
import inputFile from "./input.txt";

type Pos = [number, number];
type Scan = {
  pos: Pos;
  beacon: Pos;
  distance: number;
};

const manhattenDistance = ([x1, y1]: Pos, [x2, y2]: Pos): number =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2);

const parseScans = (input: string): Scan[] =>
  input
    .trim()
    .split("\n")
    .map((line) => {
      const [x1, y1, x2, y2] = line
        .trim()
        .split(" ")
        .filter((x) => x.includes("="))
        .map((x) => parseInt(x.split("=")[1], 10));
      const pos1: Pos = [x1, y1];
      const pos2: Pos = [x2, y2];
      const distance = manhattenDistance(pos1, pos2);
      return { pos: pos1, beacon: pos2, distance } as Scan;
    });

// TODO: check https://github.com/TilenPogacnik/advent-of-code-2022/blob/main/src/day15/solution.js

async function solvePart1(input: string): Promise<number> {
  const scans = parseScans(input);
  const minX = Math.min(...scans.flatMap((x) => [x.beacon[0]]));
  const maxX = Math.max(...scans.flatMap((x) => [x.beacon[0]]));

  const allEmpties = sum(
    map(
      (x) =>
        any(
          (scan) => manhattenDistance([x, 2000000], scan.pos) <= scan.distance,
          scans
        )
          ? 1
          : 0,
      range(minX - 2, maxX + 2)
    )
  );
  return allEmpties - 1;
}

async function solvePart2(input: string): Promise<number> {
  const scans = parseScans(input);
  console.log(scans.length, "scans");

  const calculateDiamond = ([x, y]: Pos, distance: number): Pos[] =>
    range(0, distance + 1).map((i) => [x + i, y - distance + i] as Pos);

  const limit = 4000000;

  const scanToEdge = (scan: Scan): Pos[] =>
    calculateDiamond(scan.pos, scan.distance + 1);

  // const log = (name: string) => (x: any) => console.log(name, x);
  // @ts-ignore
  const firstOddTransducer = compose(
    chain(scanToEdge),
    filter<Pos>(([x, y]) => x >= 0 && y >= 0 && x <= limit && y <= limit),
    filter<Pos>((pos) =>
      all((scan) => manhattenDistance(pos, scan.pos) > scan.distance, scans)
    ),
    // tap(log("d")),
    take(1)
  );
  const res: number = transduce(
    firstOddTransducer,
    (sum: number, pos: Pos) => sum + (pos[0] * limit + pos[1]),
    0,
    scans
  );
  return res;
}

export default {
  day: "15",
  name: "Beacon Exclusion Zone",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
