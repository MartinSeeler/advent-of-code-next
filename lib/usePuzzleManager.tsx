import { useEffect } from "react";
import {
  useRecoilState,
  useRecoilCallback,
  useRecoilSnapshot,
  useRecoilTransactionObserver_UNSTABLE,
} from "recoil";
import {
  queuedPuzzlePartsState,
  currentlyRunningPuzzlePartState,
  puzzlePartResultState,
  puzzlePartTimeState,
  puzzlePartErrorState,
  customPuzzleInputState,
} from "./atoms";
import puzzles from "@/puzzles/index";
import { Puzzle, SolvePuzzleFn } from "./types";

export const usePuzzleManager = () => {
  const [queuedPuzzleParts, setQueuedPuzzleParts] = useRecoilState(
    queuedPuzzlePartsState
  );
  const [currentlyRunningPuzzlePart, setCurrentlyRunningPuzzlePart] =
    useRecoilState(currentlyRunningPuzzlePartState);
  const updatePuzzleResult = useRecoilCallback(
    ({ set }) =>
      (
        puzzlePartId: string,
        result: number | string | null,
        error: Error | null
      ) => {
        set(puzzlePartErrorState(puzzlePartId), error);
        set(puzzlePartResultState(puzzlePartId), result);
      }
  );
  const snapshot = useRecoilSnapshot();
  const updatePuzzlePartTime = useRecoilCallback(
    ({ set }) =>
      (puzzlePartId: string, duration: number | null) => {
        return set(puzzlePartTimeState(puzzlePartId), duration);
      }
  );

  useEffect(() => {
    if (queuedPuzzleParts.length > 0 && !currentlyRunningPuzzlePart) {
      const nextPuzzlePart = queuedPuzzleParts[0];
      setCurrentlyRunningPuzzlePart(nextPuzzlePart);
      const [puzzleDay, puzzlePartId] = nextPuzzlePart.split("-");
      const puzzleToSolveNext: Puzzle | undefined = puzzles.find(
        (x) => x.day === puzzleDay
      );
      if (puzzleToSolveNext) {
        updatePuzzlePartTime(nextPuzzlePart, null);
        const solveFn: SolvePuzzleFn =
          puzzlePartId === "1"
            ? puzzleToSolveNext.solvePart1
            : puzzleToSolveNext.solvePart2;
        const startTime = Date.now();
        snapshot
          .getPromise(customPuzzleInputState(puzzleToSolveNext.day))
          .then(async (customInput) => {
            const res = await solveFn(customInput || puzzleToSolveNext.input);
            if (typeof res !== "string" && isNaN(res)) {
              // eslint-disable-next-line fp/no-throw
              throw new Error("Received NaN result");
            }
            if (res === null) {
              // eslint-disable-next-line fp/no-throw
              throw new Error("Received null result");
            }
            return res;
          })
          .then((result) => {
            updatePuzzleResult(nextPuzzlePart, result, null);
          })
          .catch((error) => {
            updatePuzzleResult(nextPuzzlePart, null, error);
            console.error(
              `Solution for Day ${puzzleDay} Part ${puzzlePartId} Failed with`,
              error
            );
          })
          .finally(() => {
            const endTime = Date.now();
            updatePuzzlePartTime(
              nextPuzzlePart,
              (endTime - startTime) / 1000.0
            );
            setQueuedPuzzleParts((oldQueuedPuzzleParts) =>
              oldQueuedPuzzleParts.filter((x) => x !== nextPuzzlePart)
            );
            setCurrentlyRunningPuzzlePart(null);
          });
      } else {
        console.error(`Puzzle ${puzzleDay} not found`);
        setQueuedPuzzleParts((oldQueuedPuzzleParts) =>
          oldQueuedPuzzleParts.filter((x) => x !== nextPuzzlePart)
        );
        setCurrentlyRunningPuzzlePart(null);
      }
    }
  }, [
    currentlyRunningPuzzlePart,
    queuedPuzzleParts,
    setCurrentlyRunningPuzzlePart,
    setQueuedPuzzleParts,
    updatePuzzleResult,
    updatePuzzlePartTime,
    snapshot,
  ]);
};
