/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-loops */
/* eslint-disable fp/no-let */
import { Puzzle } from "@/lib/types";
import { map, maxBy, reduce, memoizeWith, omit, sum } from "ramda";
import inputFile from "./input.txt";

type Valve = string;
type FlowRate = number;
type Move = [Valve, number];
type Cave = Record<Valve, { flowRate: FlowRate; tunnels: Move[] }>;

type State = {
  cave: Cave;
  currentValve: Valve;
  openValves: Valve[];
  minute: number;
  pressureReleased: number;
  history: [Valve, number][];
};

const initialState = (cave: Cave): State => ({
  cave,
  currentValve: "AA",
  openValves: [],
  minute: 1,
  pressureReleased: 0,
  history: [],
});

const moveToValve =
  (move: Move) =>
  (state: State): State => {
    const nextState = {
      ...state,
      currentValve: move[0],
      openValves: state.openValves,
      minute: state.minute + move[1],
      pressureReleased:
        state.pressureReleased +
        sum(state.openValves.map((valve) => state.cave[valve].flowRate)) *
          move[1],
      history: [
        ...state.history,
        [
          `${state.currentValve} -> ${move[0]}` as Valve,
          state.pressureReleased,
        ],
      ] as [Valve, number][],
    };
    // logState("moveToValve " + to, nextState);
    return nextState;
  };

const openValve =
  (valve: Valve) =>
  (state: State): State => {
    const nextState = {
      ...state,
      openValves: [...state.openValves, valve],
      minute: state.minute + 1,
      pressureReleased:
        state.pressureReleased +
        sum(state.openValves.map((valve) => state.cave[valve].flowRate)) +
        state.cave[valve].flowRate,
      history: [
        ...state.history,
        [("Open " + state.currentValve) as Valve, state.pressureReleased],
      ] as [Valve, number][],
    };
    // logState("openValve " + valve, nextState);
    return nextState;
  };

const stay =
  (n: number) =>
  (state: State): State => {
    const nextState = {
      ...state,
      minute: state.minute + n,
      pressureReleased:
        state.pressureReleased +
        sum(state.openValves.map((valve) => state.cave[valve].flowRate)) * n,
      history: [
        ...state.history,
        [("Stay " + state.currentValve) as Valve, state.pressureReleased],
      ] as [Valve, number][],
    };
    // logState("stay", nextState);
    return nextState;
  };

const regex =
  /^Valve (\w+) has flow rate=(\d+); tunnel[s]? lead[s]? to valve[s]? (.*)/;

const logState = (text: string, state: State) =>
  console.log("state", text, omit(["cave"], state));

const parseCave = (input: string): Cave =>
  input
    .trim()
    .split("\n")
    .reduce((acc, line) => {
      const match: RegExpMatchArray = line.trim().match(regex)!;
      return !match
        ? acc
        : {
            ...acc,
            [match[1]]: {
              flowRate: parseInt(match[2], 10),
              tunnels:
                match[3].split(", ").map((x) => [x.trim(), 1] as Move) || [],
            },
          };
    }, {} as Cave);

const byPressureReleased = (a: State, b: State) =>
  b.pressureReleased - a.pressureReleased;

const limit = 30;

const play = memoizeWith(
  (state: State, _: string[]) =>
    `${state.minute}, ${state.currentValve}, ${state.pressureReleased}`,
  (state: State, relevantValves: string[]): State => {
    if (state.minute === limit) {
      return state;
    }
    const isUnopenedRelevantValve =
      relevantValves.includes(state.currentValve) &&
      !state.openValves.includes(state.currentValve);

    return reduce(
      maxBy((x: State) => x.pressureReleased),
      state,
      map(
        (m) => play(m(state), relevantValves),
        [
          // go down if we dind't open the current valve
          ...(isUnopenedRelevantValve ? [openValve(state.currentValve)] : []),
          // go to each next unopened relevant valve
          ...state.cave[state.currentValve].tunnels
            .filter(([nextValve]) => nextValve !== state.currentValve)
            .filter(([nextValve]) => !state.openValves.includes(nextValve))
            .filter(([_, minDistance]) => minDistance + state.minute <= limit)
            .map((x) => moveToValve(x)),
          stay(limit - state.minute),
        ]
      )
    );
  }
);

type Node = string;
type Graph = Map<Node, Map<Node, number>>;

function dijkstra(graph: Graph, start: Node): Map<Node, number> {
  // Set up the distance map, with all distances initially set to infinity
  const distances = new Map<Node, number>();
  for (const node of graph.keys()) {
    distances.set(node, Number.POSITIVE_INFINITY);
  }
  distances.set(start, 0);

  // Set up the unvisited set
  const unvisited = new Set<Node>(graph.keys());

  // Main loop
  while (unvisited.size > 0) {
    // Find the unvisited node with the smallest distance
    let current: Node | undefined = undefined;
    let currentDistance = Number.POSITIVE_INFINITY;
    for (const node of unvisited) {
      if (distances.get(node)! < currentDistance) {
        current = node;
        currentDistance = distances.get(node)!;
      }
    }
    if (current == undefined) {
      break;
    }

    // Update the distance to all unvisited neighbors
    const neighbors = graph.get(current)!;
    for (const [neighbor, weight] of neighbors) {
      if (unvisited.has(neighbor)) {
        const distance = distances.get(current)! + weight;
        if (distance < distances.get(neighbor)!) {
          distances.set(neighbor, distance);
        }
      }
    }

    // Mark the current node as visited
    unvisited.delete(current);
  }

  return distances;
}

async function solvePart1(input: string): Promise<number> {
  let cave = parseCave(input);

  const allRelevantValves = Object.keys(cave).filter(
    (valve) => cave[valve].flowRate > 0
  );

  // Example usage
  const paths = Object.keys(cave).flatMap((valve) =>
    cave[valve].tunnels.map((tunnel) => [valve, tunnel[0]])
  );

  // Convert the list of paths to a graph
  const graph = new Map<Node, Map<Node, number>>();
  for (const [from, to] of paths) {
    if (!graph.has(from)) {
      graph.set(from, new Map<Node, number>());
    }
    if (!graph.has(to)) {
      graph.set(to, new Map<Node, number>());
    }
    graph.get(from)!.set(to, 1);
    graph.get(to)!.set(from, 1);
  }

  // conert the map to a plain object
  const lookup: { [key: Valve]: Move[] } = {
    AA: Array.of(...dijkstra(graph, "AA").entries()).filter(([key]) =>
      allRelevantValves.includes(key)
    ) as Move[],
    ...Object.fromEntries(
      allRelevantValves.map((valve) => [
        valve,
        Array.of(...dijkstra(graph, valve).entries()).filter(([key]) =>
          allRelevantValves.includes(key)
        ) as Move[],
      ])
    ),
  };
  console.log(
    Array.of(...dijkstra(graph, "AA").entries()).filter(([key]) =>
      allRelevantValves.includes(key)
    )
  );

  const updatedCave = Object.fromEntries(
    Object.entries(cave).map(([key, value]) => [
      key,
      {
        ...value,
        tunnels: lookup[key] || [],
      },
    ])
  );

  // console.log("cave", updatedCave, allRelevantValves);
  const state = initialState(updatedCave);
  logState("state", state);
  const finalState = play(state, allRelevantValves);

  logState("final", finalState);

  return finalState.pressureReleased;
}

async function solvePart2(input: string): Promise<number> {
  // eslint-disable-next-line fp/no-throw
  throw new Error("Day 16 is not implemented yet!");
}

export default {
  day: "16",
  name: "Proboscidea Volcanium",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
