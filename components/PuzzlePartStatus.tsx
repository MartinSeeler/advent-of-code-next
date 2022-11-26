import {
  ArrowPathIcon,
  CheckIcon,
  RectangleStackIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { puzzlePartStatusState } from "../lib/atoms";
import { WithPuzzlePartID } from "../lib/types";

const PuzzlePartStatus: FC<WithPuzzlePartID> = ({ puzzlePartID }) => {
  const status = useRecoilValue(puzzlePartStatusState(puzzlePartID));
  switch (status) {
    case "success":
      return (
        <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
          <CheckIcon className="sm:mr-1.5 h-4 w-4 text-green-800" />
          <span className="max-sm:hidden">Done</span>
        </div>
      );
    case "error":
      return (
        <div className="inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">
          <XMarkIcon
            className="sm:mr-1.5 h-4 w-4 text-red-800"
            aria-hidden="true"
          />
          <span className="max-sm:hidden">Failed</span>
        </div>
      );
    case "running":
      return (
        <div className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800">
          <ArrowPathIcon
            aria-hidden="true"
            className="sm:mr-1.5 h-4 w-4 text-yellow-800 animate-spin"
          />
          <span className="max-sm:hidden">Running</span>
        </div>
      );
    case "queued":
      return (
        <div className="inline-flex items-center rounded-full bg-sky-100 px-3 py-0.5 text-sm font-medium text-sky-800">
          <RectangleStackIcon
            aria-hidden="true"
            className="sm:mr-1.5 h-4 w-4 text-sky-800"
          />
          <span className="max-sm:hidden">Queued</span>
        </div>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-700">
          Idle
        </span>
      );
  }
};
export default PuzzlePartStatus;
