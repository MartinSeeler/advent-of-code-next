/* eslint-disable fp/no-mutating-methods */
/* eslint-disable fp/no-loops */
import { Puzzle } from "@/lib/types";
import { add, always, lensIndex, over } from "ramda";
import inputFile from "./input.txt";

type Point = [number, number, number];

type Env = {
  cubeStrings: Set<string>;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
};

const xLens = lensIndex<Point, number>(0);
const yLens = lensIndex<Point, number>(1);
const zLens = lensIndex<Point, number>(2);

const below = over(zLens, add(-1));
const above = over(zLens, add(1));
const left = over(xLens, add(-1));
const right = over(xLens, add(1));
const front = over(yLens, add(-1));
const back = over(yLens, add(1));

const transforms = [below, above, left, right, front, back];

const parseCubes = (input: string): Point[] =>
  input
    .trim()
    .split("\n")
    .map((line) => line.split(",").map(Number) as Point);

const bfsWater = (env: Env): Point[] => {
  const { cubeStrings, minX, maxX, minY, maxY, minZ, maxZ } = env;
  const queue = [minX, minY, minZ];
  const visited = new Set<string>();
  const water = new Set<string>();
  while (queue.length > 0) {
    const [x, y, z] = queue.splice(0, 3);
    const cube = [x, y, z] as Point;
    const cubeString = cube.join(",");
    if (visited.has(cubeString)) {
      continue;
    }
    visited.add(cubeString);
    if (x < minX || x > maxX || y < minY || y > maxY || z < minZ || z > maxZ) {
      continue;
    }
    if (cubeStrings.has(cubeString)) {
      continue;
    }
    water.add(cubeString);
    transforms.forEach((transform) => {
      const movedCube = transform(cube);
      queue.push(...movedCube);
    });
  }
  return Array.from(water).map(
    (cubeString) => cubeString.split(",").map(Number) as Point
  );
};

async function solvePart1(input: string): Promise<number> {
  const cubes = parseCubes(input);
  const cubeStrings = new Set(cubes.map((cube) => cube.join(",")));
  return cubes
    .map((cube: Point) =>
      transforms
        .map((transform) => transform(cube))
        .filter((movedCube: Point) => !cubeStrings.has(movedCube.join(",")))
        .map(always(1))
        .reduce(add, 0)
    )
    .reduce(add, 0);
}

async function solvePart2(input: string): Promise<number> {
  const cubes = parseCubes(input);
  const cubeStrings = new Set(cubes.map((cube) => cube.join(",")));

  const water = new Set<string>(
    bfsWater({
      cubeStrings,
      minX: Math.min(...cubes.map((cube) => cube[0])) - 1,
      maxX: Math.max(...cubes.map((cube) => cube[0])) + 1,
      minY: Math.min(...cubes.map((cube) => cube[1])) - 1,
      maxY: Math.max(...cubes.map((cube) => cube[1])) + 1,
      minZ: Math.min(...cubes.map((cube) => cube[2])) - 1,
      maxZ: Math.max(...cubes.map((cube) => cube[2])) + 1,
    }).map((cube) => cube.join(","))
  );

  return cubes
    .map((cube: Point) =>
      transforms
        .map((transform) => transform(cube))
        .filter((movedCube: Point) => water.has(movedCube.join(",")))
        .map(always(1))
        .reduce(add, 0)
    )
    .reduce(add, 0);
}

export default {
  day: "18",
  name: "Boiling Boulders",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
