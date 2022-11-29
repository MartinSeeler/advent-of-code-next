import {
  ArrowPathIcon,
  CheckIcon,
  RectangleStackIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FC, useContext } from "react";
import { useRecoilValue } from "recoil";
import { puzzlePartStatusState } from "@/lib/atoms";
import { PuzzlePartIDContext } from "@/lib/context";

const PuzzlePartStatus: FC = () => {
  const puzzlePartID = useContext(PuzzlePartIDContext);
  const status = useRecoilValue(puzzlePartStatusState(puzzlePartID));
  switch (status) {
    case "success":
      return (
        <div className="text-green-800 bg-green-100 dark:bg-transparent dark:border-green-400 dark:text-green-400 badge-defaults">
          <CheckIcon className="sm:mr-1.5 -ml-1 h-4 w-4 text-green-800 dark:text-green-400" />
          <span className="max-sm:hidden">Solved</span>
        </div>
      );
    case "error":
      return (
        <div className="text-red-800 bg-red-100 dark:bg-transparent dark:border-red-400 dark:text-red-400 badge-defaults">
          <XMarkIcon
            className="sm:mr-1.5 -ml-1 h-4 w-4 text-red-800 dark:text-red-400"
            aria-hidden="true"
          />
          <span className="max-sm:hidden">Failed</span>
        </div>
      );
    case "running":
      return (
        <div className="text-yellow-800 bg-yellow-100 dark:bg-transparent dark:border-yellow-400 dark:text-yellow-400 badge-defaults">
          <ArrowPathIcon
            aria-hidden="true"
            className="sm:mr-1.5 -ml-1 h-4 w-4 text-yellow-800 dark:text-yellow-400 animate-spin"
          />
          <span className="max-sm:hidden">Running</span>
        </div>
      );
    case "queued":
      return (
        <div className="text-sky-800 bg-sky-100 dark:bg-transparent dark:border-sky-400 dark:text-sky-400 badge-defaults">
          <RectangleStackIcon
            aria-hidden="true"
            className="sm:mr-1.5 -ml-1 h-4 w-4 text-sky-800 dark:text-sky-400"
          />
          <span className="max-sm:hidden">Queued</span>
        </div>
      );
    default:
      return (
        <span className="text-zinc-800 bg-zinc-100 dark:bg-transparent dark:border-zinc-400 dark:text-zinc-400 badge-defaults">
          Idle
        </span>
      );
  }
};
export default PuzzlePartStatus;
