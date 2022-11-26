import { BoltIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

const PuzzlePartRow: FC<{ part: number }> = ({ part }) => (
  <li>
    <div className="bg-white px-4 py-4 sm:px-6 lg:px-8 grid grid-cols-4 items-center">
      <div className="flex items-center gap-x-3">
        <span className="font-medium text-sm">Part {part}</span>
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
          Running
        </span>
      </div>
      <div className="flex justify-end">
        <span className="text-sm text-gray-500">00:00</span>
      </div>
      <div className="flex justify-end">
        <span className="text-sm text-gray-500">No Result</span>
      </div>
      <div className="flex justify-end">
        <button
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          type="button"
        >
          <BoltIcon aria-hidden="true" className="mr-2 h-4 w-4 text-gray-400" />
          <span>Run Part</span>
        </button>
      </div>
    </div>
  </li>
);

export default PuzzlePartRow;
