import { useEffect } from "react";
import { useRecoilCallback, useRecoilState } from "recoil";
import PuzzleCard from "../components/PuzzleCard";
import RunAllButton from "../components/RunAllButton";
import {
  currentlyRunningPuzzlePartState,
  puzzlePartError as puzzlePartErrorState,
  puzzlePartResultState,
  queuedPuzzlePartsState,
} from "../lib/atoms";
import puzzles from "../lib/puzzles";
import { Puzzle } from "../lib/types";

const Home = () => {
  const [queuedPuzzleParts, setQueuedPuzzleParts] = useRecoilState(
    queuedPuzzlePartsState
  );
  const [currentlyRunningPuzzlePart, setCurrentlyRunningPuzzlePart] =
    useRecoilState(currentlyRunningPuzzlePartState);
  const updatePuzzlePartResult = useRecoilCallback(
    ({ set }) =>
      (puzzlePartId: string, result: number | null) => {
        return set(puzzlePartResultState(puzzlePartId), result);
      }
  );
  const updatePuzzlePartError = useRecoilCallback(
    ({ set }) =>
      (puzzlePartId: string, error: Error | null) => {
        return set(puzzlePartErrorState(puzzlePartId), error);
      }
  );
  useEffect(() => {
    if (queuedPuzzleParts.length > 0 && !currentlyRunningPuzzlePart) {
      const nextPuzzlePartId = queuedPuzzleParts[0];
      setCurrentlyRunningPuzzlePart(nextPuzzlePartId);
      const [puzzleId, puzzlePartId] = nextPuzzlePartId.split("-");
      const puzzleToSolveNext: Puzzle | undefined = puzzles.find(
        (x) => x.day === puzzleId
      );
      if (puzzleToSolveNext) {
        (puzzlePartId === "1"
          ? puzzleToSolveNext.part1
          : puzzleToSolveNext.part2)("")
          .then((result) => {
            console.log(result);
            updatePuzzlePartResult(nextPuzzlePartId, result);
            updatePuzzlePartError(nextPuzzlePartId, null);
          })
          .catch((error) => {
            updatePuzzlePartResult(nextPuzzlePartId, null);
            updatePuzzlePartError(nextPuzzlePartId, error);
            console.error(error);
          })
          .finally(() => {
            setQueuedPuzzleParts((oldQueuedPuzzleParts) =>
              oldQueuedPuzzleParts.filter((x) => x !== nextPuzzlePartId)
            );
            setCurrentlyRunningPuzzlePart(null);
          });
      } else {
        console.error(`Puzzle ${puzzleId} not found`);
        setQueuedPuzzleParts((oldQueuedPuzzleParts) =>
          oldQueuedPuzzleParts.filter((x) => x !== nextPuzzlePartId)
        );
        setCurrentlyRunningPuzzlePart(null);
      }
    }
  }, [
    currentlyRunningPuzzlePart,
    queuedPuzzleParts,
    setCurrentlyRunningPuzzlePart,
    setQueuedPuzzleParts,
    updatePuzzlePartError,
    updatePuzzlePartResult,
  ]);
  return (
    <div className="max-w-4xl mx-auto pt-6 md:pt-12 lg:pt-16">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Advent of Code 2022
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              These are my solutions to the Advent of Code 2022 puzzles.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <RunAllButton allDays={puzzles.map((x) => x.day)} />
          </div>
        </div>
        <div className="mt-8 flex flex-col space-y-6">
          {puzzles.map((puzzle) => (
            <PuzzleCard key={`card-${puzzle.day}`} puzzle={puzzle} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
