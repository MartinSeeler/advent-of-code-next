import { FC } from "react";
import { useRecoilValue } from "recoil";
import { puzzlePartResultState } from "../lib/atoms";
import { WithPuzzlePartID } from "../lib/types";

const PuzzlePartResult: FC<WithPuzzlePartID> = ({ puzzlePartID }) => {
  const puzzlePartResult = useRecoilValue(puzzlePartResultState(puzzlePartID));

  return (
    <span className="text-sm text-gray-500">
      {puzzlePartResult || "No Result"}
    </span>
  );
};
export default PuzzlePartResult;
