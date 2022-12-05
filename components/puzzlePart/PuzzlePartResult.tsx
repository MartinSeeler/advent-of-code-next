import { FC, useContext } from "react";
import { useRecoilValue } from "recoil";
import { puzzlePartResultState, puzzlePartStatusState } from "@/lib/atoms";
import { PuzzlePartIDContext } from "@/lib/context";

const PuzzlePartResult: FC = () => {
  const puzzlePartID = useContext(PuzzlePartIDContext);
  const puzzlePartResult = useRecoilValue(puzzlePartResultState(puzzlePartID));
  const puzzlePartStatus = useRecoilValue(puzzlePartStatusState(puzzlePartID));

  return (
    <span className="text-sm text-zinc-300">
      {puzzlePartStatus === "queued" || puzzlePartStatus === "running"
        ? "..."
        : typeof puzzlePartResult === "string"
        ? puzzlePartResult
        : puzzlePartResult === null || isNaN(puzzlePartResult)
        ? "No Result"
        : puzzlePartResult}
    </span>
  );
};
export default PuzzlePartResult;
