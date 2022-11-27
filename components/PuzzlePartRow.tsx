import { FC, useContext } from "react";
import PuzzlePartStatus from "@/components/PuzzlePartStatus";
import PuzzlePartTime from "@/components/PuzzlePartTime";
import PuzzlePartResult from "@/components/PuzzlePartResult";
import RunPartButton from "@/components/RunPartButton";
import { PuzzlePartIDContext } from "@/lib/context";

const PuzzlePartRow: FC = () => {
  const puzzlePartID = useContext(PuzzlePartIDContext);
  return (
    <li>
      <div className="grid items-center grid-cols-4 px-4 py-4 bg-white sm:px-6 lg:px-8">
        <div className="flex items-center gap-x-3">
          <span className="text-sm font-medium">
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
