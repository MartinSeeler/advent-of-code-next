import { useEffect } from "react";
import { useRecoilState, useRecoilCallback } from "recoil";
import {
  queuedPuzzlePartsState,
  currentlyRunningPuzzlePartState,
  puzzlePartResultState,
  puzzlePartTimeState,
  puzzlePartErrorState,
} from "./atoms";
import puzzles from "@/puzzles/index";
import { Puzzle } from "./types";

export const usePuzzleManager = () => {
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
  const updatePuzzlePartTime = useRecoilCallback(
    ({ set }) =>
      (puzzlePartId: string, duration: number | null) => {
        return set(puzzlePartTimeState(puzzlePartId), duration);
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
        updatePuzzlePartTime(nextPuzzlePartId, null);
        const startTime = Date.now();
        (puzzlePartId === "1"
          ? puzzleToSolveNext.solvePart1
          : puzzleToSolveNext.solvePart2)(puzzleToSolveNext.inputFile || "")
          .then((result) => {
            updatePuzzlePartResult(nextPuzzlePartId, result);
            updatePuzzlePartError(nextPuzzlePartId, null);
          })
          .catch((error) => {
            updatePuzzlePartResult(nextPuzzlePartId, null);
            updatePuzzlePartError(nextPuzzlePartId, error);
            console.error(error);
          })
          .finally(() => {
            const endTime = Date.now();
            updatePuzzlePartTime(
              nextPuzzlePartId,
              (endTime - startTime) / 1000.0
            );
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
    updatePuzzlePartTime,
  ]);
};
