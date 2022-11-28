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
      (puzzlePartId: string, result: number | null, error: Error | null) => {
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
      const nextPuzzlePartId = queuedPuzzleParts[0];
      setCurrentlyRunningPuzzlePart(nextPuzzlePartId);
      const [puzzleId, puzzlePartId] = nextPuzzlePartId.split("-");
      const puzzleToSolveNext: Puzzle | undefined = puzzles.find(
        (x) => x.day === puzzleId
      );
      if (puzzleToSolveNext) {
        updatePuzzlePartTime(nextPuzzlePartId, null);
        const solveFn: SolvePuzzleFn =
          puzzlePartId === "1"
            ? puzzleToSolveNext.solvePart1
            : puzzleToSolveNext.solvePart2;
        const startTime = Date.now();
        snapshot
          .getPromise(customPuzzleInputState(puzzleToSolveNext.day))
          .then(async (customInput) => {
            const res = await solveFn(customInput || puzzleToSolveNext.input);
            if (isNaN(res)) {
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
            updatePuzzleResult(nextPuzzlePartId, result, null);
          })
          .catch((error) => {
            updatePuzzleResult(nextPuzzlePartId, null, error);
            console.error("solveFN Failed", error);
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
    updatePuzzleResult,
    updatePuzzlePartTime,
    snapshot,
  ]);
};
