import { Puzzle } from "@/lib/types";
import {
  filter,
  groupBy,
  head,
  map,
  pipe,
  sort,
  split,
  startsWith,
  sum,
  trim,
} from "ramda";
import inputFile from "./input.txt";

type Dir = string;
type DirSize = [Dir, number];
type File = [Dir, string, number];

const generateTree = (
  commands: string[][],
  allFiles: File[] = [],
  currentDir: Dir = "/"
): File[] => {
  if (commands.length === 0) {
    return allFiles;
  }

  if (commands[0][0] === "$ ls") {
    // get all files in this directory
    const files: File[] = commands[0].slice(1).map((file) => {
      const [size, name] = file.split(" ");
      if (size === "dir") {
        const dr = currentDir === "/" ? `/${name}` : `${currentDir}/${name}`;
        return [dr, ".root", 0];
      }
      return [currentDir, name, parseInt(size)];
    });
    // add them to the list of all files
    return generateTree(commands.slice(1), [...allFiles, ...files], currentDir);
  }

  if (commands[0][0] === "$ cd ..") {
    // go up a directory
    const newDir = currentDir.split("/").slice(0, -1).join("/");
    return generateTree(commands.slice(1), allFiles, newDir);
  }

  if (commands[0][0].startsWith("$ cd ")) {
    // go into a directory
    const newDir = trim(commands[0][0].split(" ")[2]);
    const nextDir =
      newDir === "/"
        ? "/"
        : currentDir === "/"
        ? `/${newDir}`
        : `${currentDir}/${newDir}`;
    return generateTree(commands.slice(1), allFiles, nextDir);
  }
  return allFiles;
};

const parseAllDirs: (input: string) => DirSize[] = (input) => {
  const lines: string[] = map(trim, split("\n", input));
  const commandGroups = lines.reduce(
    (acc, line) =>
      startsWith("$", line)
        ? [...acc, [line]]
        : [...acc.slice(0, -1), [...acc.slice(-1)[0], line]],
    [] as string[][]
  );
  const tree: File[] = generateTree(commandGroups);
  const byDir = groupBy(([dir]) => dir, tree);
  const sizes: [string, number][] = Object.entries(byDir).map(
    ([dir, files]) => {
      const sum: number = files.reduce((acc, [_, __, size]) => acc + size, 0);
      return [dir, sum];
    }
  );

  return sizes.map(([dir, size]) => {
    // size is it's own size + the size of all of it's children
    const finalSize =
      size +
      sizes
        .filter(([d]) => d.startsWith(dir) && d !== dir)
        .reduce((acc, [_, size]) => acc + size, 0);
    return [dir, finalSize];
  });
};

async function solvePart1(input: string): Promise<number> {
  return pipe(
    filter<DirSize>(([_, size]) => size <= 100000),
    map<DirSize, number>(([_, size]) => size),
    sum
  )(parseAllDirs(input));
}

async function solvePart2(input: string): Promise<number> {
  const dirSizes = parseAllDirs(input);
  const rootSize = dirSizes.find(([dir]) => dir === "/")![1];
  const needed = 30000000 - (70000000 - rootSize);
  return (
    pipe(
      sort<DirSize>(([_, size1], [__, size2]) => size1 - size2),
      filter<DirSize>(([_, size]) => size >= needed),
      map<DirSize, number>(([_, size]) => size),
      head<number>
    )(dirSizes) || 0
  );
}

export default {
  day: "07",
  name: "No Space Left On Device",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
