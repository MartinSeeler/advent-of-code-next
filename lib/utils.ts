import slugify from "@sindresorhus/slugify";
import { Puzzle } from "@/lib/types";

export const slugifyPuzzle = (puzzle: Puzzle) => {
  return slugify(`Day ${puzzle.day} - ${puzzle.name}`);
};
