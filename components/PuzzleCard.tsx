import { FC } from "react";
import { CalendarIcon } from "@heroicons/react/20/solid";

import { Puzzle } from "../lib/types";

import PuzzlePartRow from "./PuzzlePartRow";
import RunDayButton from "./RunDayButton";

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
          <RunDayButton puzzleDay={puzzle.day} />
        </div>
      </div>
    </div>
    <ul className="divide-y divide-gray-200">
      <PuzzlePartRow puzzlePartID={`${puzzle.day}-1`} />
      <PuzzlePartRow puzzlePartID={`${puzzle.day}-2`} />
    </ul>
  </div>
);

export default PuzzleCard;
