import { FC, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useElapsedTime } from "use-elapsed-time";
import { puzzlePartStatusState } from "../lib/atoms";
import { WithPuzzlePartID } from "../lib/types";

const PuzzlePartTime: FC<WithPuzzlePartID> = ({ puzzlePartID }) => {
  const status = useRecoilValue(puzzlePartStatusState(puzzlePartID));
  const { elapsedTime, reset } = useElapsedTime({
    isPlaying: status === "running",
  });
  useEffect(() => {
    if (status === "queued") {
      reset();
    }
  }, [status, reset]);
  return (
    <span className="text-sm text-gray-500">
      {elapsedTime
        .toLocaleString(undefined, {
          minimumIntegerDigits: 2,
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })
        .replace(",", ":")}
    </span>
  );
};
export default PuzzlePartTime;
