/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-loops */
/* eslint-disable fp/no-let */
import { Puzzle } from "@/lib/types";
import { addIndex, fromPairs, keys, keysIn, map, toPairs, values } from "ramda";
import inputFile from "./input.txt";

function visit(
  valve: string,
  budget: number,
  state: number,
  flow: number,
  answer: Record<string, number>,
  F: Record<string, number>,
  I: Record<string, number>,
  T: Record<string, Record<string, number>>
): Record<number, number> {
  answer[state] = Math.max(answer[state] || 0, flow);
  for (const nextValve of keys(F)) {
    const newbudget = budget - T[valve][nextValve] - 1;
    if (I[nextValve] & state || newbudget <= 0) {
      continue;
    }
    visit(
      nextValve,
      newbudget,
      state | I[nextValve],
      flow + newbudget * F[nextValve],
      answer,
      F,
      I,
      T
    );
  }
  return answer;
}

const parseInput = (input: string) => {
  const lines = input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(/[\s=;,]+/));

  // graph, from which valve to which valves a tunnel exists
  const G: Record<string, string[]> = fromPairs(
    lines.map((l) => [l[1], l.slice(10)])
  );

  // flow rate per valve, if not zero
  const F: Record<string, number> = fromPairs(
    lines.filter((l) => l[5] !== "0").map((l) => [l[1], parseInt(l[5], 10)])
  );

  // bitmask per relevant valve
  const I: Record<string, number> = fromPairs(
    addIndex(map)((k, i) => [k, 1 << i], keys(F))
  );

  // T as matrix of shortest path distances, using floyd-warshall algorithm
  const T: Record<string, Record<string, number>> = fromPairs(
    keys(G).map((x) => [
      x,
      fromPairs(
        keys(G).map((y) => [y, G[x].includes(y) ? 1 : Number.POSITIVE_INFINITY])
      ),
    ])
  );
  for (const k of keys(G)) {
    for (const i of keys(G)) {
      for (const j of keys(G)) {
        T[i][j] = Math.min(T[i][j], T[i][k] + T[k][j]);
      }
    }
  }

  return { F, I, T };
};

async function solvePart1(input: string): Promise<number> {
  const { F, I, T } = parseInput(input);
  return Math.max(...values(visit("AA", 30, 0, 0, {}, F, I, T)));
}

async function solvePart2(input: string): Promise<number> {
  const { F, I, T } = parseInput(input);
  const optimalPairs = toPairs(visit("AA", 26, 0, 0, {}, F, I, T));
  let res = 0;
  for (const [k1, v1] of optimalPairs) {
    for (const [k2, v2] of optimalPairs) {
      if (!(parseInt(k1) & parseInt(k2))) {
        res = Math.max(res, v1 + v2);
      }
    }
  }
  return res;
}

export default {
  day: "16",
  name: "Proboscidea Volcanium",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
