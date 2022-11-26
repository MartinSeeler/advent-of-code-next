import { FC } from "react";
import { WithPuzzlePartID } from "../lib/types";
import PuzzlePartStatus from "./PuzzlePartStatus";
import PuzzlePartTime from "./PuzzlePartTime";
import PuzzlePartResult from "./PuzzlePartResult";
import RunPartButton from "./RunPartButton";

const PuzzlePartRow: FC<WithPuzzlePartID> = ({ puzzlePartID }) => {
  return (
    <li>
      <div className="bg-white px-4 py-4 sm:px-6 lg:px-8 grid grid-cols-4 items-center">
        <div className="flex items-center gap-x-3">
          <span className="font-medium text-sm">
            Part {puzzlePartID.split("-")[1]}
          </span>
          <PuzzlePartStatus puzzlePartID={puzzlePartID} />
        </div>
        <div className="flex justify-end">
          <PuzzlePartResult puzzlePartID={puzzlePartID} />
        </div>
        <div className="flex justify-end">
          <PuzzlePartTime puzzlePartID={puzzlePartID} />
        </div>
        <div className="flex justify-end">
          <RunPartButton puzzlePartID={puzzlePartID} />
        </div>
      </div>
    </li>
  );
};

export default PuzzlePartRow;
