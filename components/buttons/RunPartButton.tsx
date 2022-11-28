import { FC, useContext } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { BoltIcon, PlayIcon } from "@heroicons/react/24/outline";
import { puzzlePartStatusState, queuedPuzzlePartsState } from "@/lib/atoms";
import { PuzzlePartIDContext } from "@/lib/context";

const RunPartButton: FC = () => {
  const puzzlePartID = useContext(PuzzlePartIDContext);
  const status = useRecoilValue(puzzlePartStatusState(puzzlePartID));
  const setQueuedPuzzleParts = useSetRecoilState(queuedPuzzlePartsState);
  return (
    <button
      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      type="button"
      disabled={status === "queued" || status === "running"}
      onClick={() => {
        setQueuedPuzzleParts((oldQueuedPuzzleParts) => [
          ...oldQueuedPuzzleParts,
          puzzlePartID,
        ]);
      }}
    >
      <span>Run</span>
      <PlayIcon
        aria-hidden="true"
        className="w-4 h-4 ml-2 -mr-1 text-gray-400"
      />
    </button>
  );
};
export default RunPartButton;
