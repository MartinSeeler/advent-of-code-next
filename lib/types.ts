export type PuzzleInput = string;
export type PuzzleResult = number;

export type SolvePuzzleFn = (_: PuzzleInput) => Promise<PuzzleResult>;
export interface Puzzle {
  day: string;
  name: string;
  input: string;
  solvePart1: SolvePuzzleFn;
  solvePart2: SolvePuzzleFn;
}

export type PuzzlePartStatus =
  | "idle"
  | "queued"
  | "running"
  | "error"
  | "success";
