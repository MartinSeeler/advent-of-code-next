import { FC } from "react";
import { BoltIcon } from "@heroicons/react/24/outline";
import { CalendarIcon } from "@heroicons/react/20/solid";

import { Puzzle } from "../lib/types";

import PuzzlePartRow from "./PuzzlePartRow";

const PuzzleCard: FC<{ puzzle: Puzzle }> = ({ puzzle }) => (
  <div className="overflow-hidden bg-white sm:rounded-lg sm:shadow -mx-4 sm:-mx-6 lg:-mx-8">
    <div className="border-b border-gray-200 bg-white py-5 px-4 sm:px-6 lg:px-8">
      <div className="-mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="mt-4">
          <div className="flex items-center">
            <div className="">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {puzzle.name}
              </h3>
              <div className="flex items-center pt-1">
                <CalendarIcon className="h-4 w-4 text-gray-400" />
                <p className="text-sm text-gray-500 pl-2">
                  {puzzle.day.padStart(2, "0")}.12.2022
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-shrink-0">
          <button
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="button"
          >
            <BoltIcon
              aria-hidden="true"
              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
            />
            <span>Run Day</span>
          </button>
        </div>
      </div>
    </div>
    <ul className="divide-y divide-gray-200">
      <PuzzlePartRow part={1} />
      <PuzzlePartRow part={2} />
    </ul>
  </div>
);

export default PuzzleCard;
