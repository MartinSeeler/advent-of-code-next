export type PuzzleInput = string;
export type PuzzleResult = number;

export type PuzzleSolution = (_: PuzzleInput) => Promise<PuzzleResult>;

export interface Puzzle {
  day: string;
  name: string | null;
  parts: {
    "1": PuzzleSolution;
    "2": PuzzleSolution;
  };
}
