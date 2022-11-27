import { FC, useContext } from "react";
import PuzzlePartStatus from "./PuzzlePartStatus";
import PuzzlePartTime from "./PuzzlePartTime";
import PuzzlePartResult from "./PuzzlePartResult";
import RunPartButton from "./RunPartButton";
import { PuzzlePartIDContext } from "../lib/context";

const PuzzlePartRow: FC = () => {
  const puzzlePartID = useContext(PuzzlePartIDContext);
  return (
    <li>
      <div className="bg-white px-4 py-4 sm:px-6 lg:px-8 grid grid-cols-4 items-center">
        <div className="flex items-center gap-x-3">
          <span className="font-medium text-sm">
            Part {puzzlePartID.split("-")[1]}
          </span>
          <PuzzlePartStatus />
        </div>
        <div className="flex justify-end">
          <PuzzlePartResult />
        </div>
        <div className="flex justify-end">
          <PuzzlePartTime />
        </div>
        <div className="flex justify-end">
          <RunPartButton />
        </div>
      </div>
    </li>
  );
};

export default PuzzlePartRow;
