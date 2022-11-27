import { FC, useContext } from "react";
import { BoltIcon } from "@heroicons/react/24/outline";
import { queuedPuzzlePartsState } from "@/lib/atoms";
import { useRecoilState } from "recoil";
import { PuzzleContext } from "@/lib/context";

const RunDayButton: FC = () => {
  const { day } = useContext(PuzzleContext);
  const [queuedPuzzleParts, setQueuedPuzzleParts] = useRecoilState(
    queuedPuzzlePartsState
  );
  return (
    <button
      className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={
        queuedPuzzleParts.includes(`${day}-1`) &&
        queuedPuzzleParts.includes(`${day}-2`)
      }
      onClick={() => {
        setQueuedPuzzleParts((oldQueuedPuzzleParts) => [
          ...oldQueuedPuzzleParts,
          `${day}-1`,
          `${day}-2`,
        ]);
      }}
      type="button"
    >
      <BoltIcon
        aria-hidden="true"
        className="w-5 h-5 mr-2 -ml-1 text-gray-400"
      />
      <span>Run Day</span>
    </button>
  );
};
export default RunDayButton;
