import { PuzzlePartStatus } from "./types";
import { atom, atomFamily, selectorFamily } from "recoil";

export const customPuzzleInputState = atomFamily<string | null, string>({
  key: "customPuzzleInputState",
  default: null,
});

export const puzzlePartErrorState = atomFamily<Error | null, string>({
  key: "puzzlePartError",
  default: null,
});

export const puzzlePartRunningState = atomFamily<boolean, string>({
  key: "puzzlePartRunning",
  default: false,
});

export const puzzlePartResultState = atomFamily<number | null, string>({
  key: "puzzlePartResult",
  default: null,
});

export const puzzlePartTimeState = atomFamily<number | null, string>({
  key: "puzzlePartTime",
  default: null,
});

export const puzzlePartStatusState = selectorFamily<PuzzlePartStatus, string>({
  key: "puzzlePartState",
  get:
    (puzzlePartID) =>
    ({ get }) => {
      const isQueued = get(queuedPuzzlePartsState).includes(puzzlePartID);
      if (!isQueued) {
        const result = get(puzzlePartResultState(puzzlePartID));
        if (result === null) {
          const error = get(puzzlePartErrorState(puzzlePartID));
          return error === null ? "idle" : "error";
        }
        return "success";
      }
      const isRunning = get(currentlyRunningPuzzlePartState) === puzzlePartID;
      if (isRunning) {
        return "running";
      }
      return "queued";
    },
});

export const currentlyRunningPuzzlePartState = atom<string | null>({
  key: "currentlyRunningPuzzlePart",
  default: null,
});

export const queuedPuzzlePartsState = atom<string[]>({
  key: "queuedPuzzleParts",
  default: [],
});
