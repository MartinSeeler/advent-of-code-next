import { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { puzzlePartStatusState, queuedPuzzlePartsState } from "../lib/atoms";
import { BoltIcon } from "@heroicons/react/24/outline";
import { WithPuzzlePartID } from "../lib/types";

const RunPartButton: FC<WithPuzzlePartID> = ({ puzzlePartID }) => {
  const status = useRecoilValue(puzzlePartStatusState(puzzlePartID));
  const setQueuedPuzzleParts = useSetRecoilState(queuedPuzzlePartsState);
  return (
    <button
      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      type="button"
      disabled={status === "queued" || status === "running"}
      onClick={() => {
        setQueuedPuzzleParts((oldQueuedPuzzleParts) => [
          ...oldQueuedPuzzleParts,
          puzzlePartID,
        ]);
      }}
    >
      <BoltIcon aria-hidden="true" className="mr-2 h-4 w-4 text-gray-400" />
      <span>Run Part</span>
    </button>
  );
};
export default RunPartButton;
