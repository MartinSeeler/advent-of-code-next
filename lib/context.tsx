import { createContext } from "react";
import { Puzzle } from "./types";

const emptyDefaultPuzzle: Puzzle = {
  name: "Unknown",
  day: "00",
  solvePart1: () => Promise.reject("Not implemented"),
  solvePart2: () => Promise.reject("Not implemented"),
};

export const PuzzleContext = createContext<Puzzle>(emptyDefaultPuzzle);

export const PuzzlePartIDContext = createContext<string>("00-0");
