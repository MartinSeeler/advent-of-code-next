import { FC } from "react";
import { useRecoilState } from "recoil";
import { queuedPuzzlePartsState } from "../lib/atoms";

const RunAllButton: FC<{ allDays: string[] }> = ({ allDays }) => {
  const allPuzzlePartIDs: string[] = allDays.flatMap((day) => [
    `${day}-1`,
    `${day}-2`,
  ]);
  const [queuedPuzzleParts, seQueuedPuzzleParts] = useRecoilState(
    queuedPuzzlePartsState
  );
  return (
    <button
      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      type="button"
      disabled={allPuzzlePartIDs.every((id) => queuedPuzzleParts.includes(id))}
      onClick={() => {
        seQueuedPuzzleParts((oldQueuedPuzzleParts) => [
          ...oldQueuedPuzzleParts,
          ...allPuzzlePartIDs,
        ]);
      }}
    >
      Run All Days
    </button>
  );
};
export default RunAllButton;
