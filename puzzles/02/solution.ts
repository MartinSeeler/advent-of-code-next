import { Puzzle } from "@/lib/types";
import inputFile from "./input.txt";

enum Shape {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

enum MatchResult {
  Win = 6,
  Draw = 3,
  Loss = 0,
}

const matchEvalMap: Record<Shape, Record<MatchResult, Shape>> = {
  [Shape.Rock]: {
    [MatchResult.Win]: Shape.Scissors,
    [MatchResult.Loss]: Shape.Paper,
    [MatchResult.Draw]: Shape.Rock,
  },
  [Shape.Paper]: {
    [MatchResult.Win]: Shape.Rock,
    [MatchResult.Loss]: Shape.Scissors,
    [MatchResult.Draw]: Shape.Paper,
  },
  [Shape.Scissors]: {
    [MatchResult.Win]: Shape.Paper,
    [MatchResult.Loss]: Shape.Rock,
    [MatchResult.Draw]: Shape.Scissors,
  },
};

async function solvePart1(input: string): Promise<number> {
  const shapeDecryptions: Record<string, Shape> = {
    A: Shape.Rock,
    B: Shape.Paper,
    C: Shape.Scissors,
    X: Shape.Rock,
    Y: Shape.Paper,
    Z: Shape.Scissors,
  };
  const lines = input.trim().split("\n");
  const matches: [Shape, Shape][] = lines.map((line) => {
    const parts = line.trim().split(" ");
    return [shapeDecryptions[parts[0]], shapeDecryptions[parts[1]]];
  });
  return matches
    .map((match) => {
      const [oppenentShape, myShape] = match;
      const myEvalMap = matchEvalMap[myShape];
      if (myEvalMap[MatchResult.Win] === oppenentShape) {
        return MatchResult.Win + myShape;
      }
      if (myEvalMap[MatchResult.Loss] === oppenentShape) {
        return MatchResult.Loss + myShape;
      }
      return MatchResult.Draw + myShape;
    })
    .reduce((acc, score) => acc + score, 0);
}

async function solvePart2(input: string): Promise<number> {
  const shapeDecryptions: Record<string, Shape> = {
    A: Shape.Rock,
    B: Shape.Paper,
    C: Shape.Scissors,
  };
  const resultDecryptions: Record<string, MatchResult> = {
    X: MatchResult.Loss,
    Y: MatchResult.Draw,
    Z: MatchResult.Win,
  };
  const lines = input.trim().split("\n");
  const matches: [Shape, MatchResult][] = lines.map((line) => {
    const parts = line.trim().split(" ");
    return [shapeDecryptions[parts[0]], resultDecryptions[parts[1]]];
  });
  return matches
    .map((match) => {
      const [oppenentShape, expectedResult] = match;
      const myEvalMap = matchEvalMap[oppenentShape];
      const invertedResult =
        expectedResult === MatchResult.Win
          ? MatchResult.Loss
          : expectedResult === MatchResult.Loss
          ? MatchResult.Win
          : MatchResult.Draw;
      return expectedResult + myEvalMap[invertedResult];
    })
    .reduce((acc, score) => acc + score, 0);
}

export default {
  day: "02",
  name: "Rock Paper Scissors",
  input: inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
