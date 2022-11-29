import { FC, useContext, useEffect } from "react";
import { useRecoilValue, waitForAll } from "recoil";
import { useElapsedTime } from "use-elapsed-time";
import { puzzlePartStatusState, puzzlePartTimeState } from "@/lib/atoms";
import { PuzzlePartIDContext } from "@/lib/context";

const PuzzlePartTime: FC = () => {
  const puzzlePartID = useContext(PuzzlePartIDContext);
  const [status, time] = useRecoilValue(
    waitForAll([
      puzzlePartStatusState(puzzlePartID),
      puzzlePartTimeState(puzzlePartID),
    ])
  );
  const { elapsedTime, reset } = useElapsedTime({
    isPlaying: status === "running",
  });
  useEffect(() => {
    if (status === "queued") {
      reset();
    }
    return;
  }, [status, reset]);
  return (
    <span className="text-sm text-gray-500 dark:text-zinc-300">
      {(time || elapsedTime)
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
