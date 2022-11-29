import { FC, useContext } from "react";
import { useRecoilValue } from "recoil";
import { puzzlePartResultState } from "@/lib/atoms";
import { PuzzlePartIDContext } from "@/lib/context";

const PuzzlePartResult: FC = () => {
  const puzzlePartID = useContext(PuzzlePartIDContext);
  const puzzlePartResult = useRecoilValue(puzzlePartResultState(puzzlePartID));

  return (
    <span className="text-sm text-gray-500 dark:text-zinc-300">
      {puzzlePartResult === null || isNaN(puzzlePartResult)
        ? "No Result"
        : puzzlePartResult}
    </span>
  );
};
export default PuzzlePartResult;
