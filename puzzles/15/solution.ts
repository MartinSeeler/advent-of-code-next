/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */
/* eslint-disable fp/no-mutating-methods */
/* eslint-disable fp/no-loops */
import { all, any, map, range, sum, uniq, unnest } from "ramda";
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
  input.split("\n").map((line) => {
    const [x1, y1, x2, y2] = line
      .split(" ")
      .filter((x) => x.includes("="))
      .map((x) => parseInt(x.split("=")[1], 10));
    const pos1: Pos = [x1, y1];
    const pos2: Pos = [x2, y2];
    const distance = manhattenDistance(pos1, pos2);
    return { pos: pos1, beacon: pos2, distance } as Scan;
  });

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

  const calculateRing = ([x, y]: Pos, distance: number): Pos[] => {
    const ring: Pos[] = [];
    for (let i = 0; i <= distance; i++) {
      ring.push([x + i, y + distance - i]);
      ring.push([x + i, y - distance + i]);
      ring.push([x - i, y + distance - i]);
      ring.push([x - i, y - distance + i]);
    }
    return ring;
  };

  const limit = 4000000;

  const rings = uniq(
    unnest(scans.map((scan) => calculateRing(scan.pos, scan.distance + 1)))
      .filter(([x, y]) => x >= 0 && y >= 0 && x <= limit && y <= limit)
      .filter((pos) =>
        all((scan) => manhattenDistance(pos, scan.pos) > scan.distance, scans)
      )
  );
  return rings[0][0] * 4000000 + rings[0][1];
}

export default {
  day: "15",
  name: "Beacon Exclusion Zone",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
