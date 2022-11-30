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
      className="relative inline-flex items-center rounded-md px-4 py-1.5 btn-defaults group"
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
        className="w-4 h-4 ml-2 -mr-1 text-green-400 group-hover:text-zinc-800 group-focus:text-zinc-800"
      />
    </button>
  );
};
export default RunPartButton;
