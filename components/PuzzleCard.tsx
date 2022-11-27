import { FC, useContext } from "react";
import { CalendarIcon } from "@heroicons/react/20/solid";

import { Puzzle } from "../lib/types";

import PuzzlePartRow from "./PuzzlePartRow";
import RunDayButton from "./RunDayButton";
import { PuzzleContext, PuzzlePartIDContext } from "../lib/context";

const PuzzleCard: FC = () => {
  const { day, name } = useContext(PuzzleContext);
  return (
    <div className="overflow-hidden bg-white sm:rounded-lg sm:shadow -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="border-b border-gray-200 bg-white py-5 px-4 sm:px-6 lg:px-8">
        <div className="-mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="mt-4">
            <div className="flex items-center">
              <div className="">
                <h3 className="font-medium text-gray-900">
                  Day {day} - {name}
                </h3>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-shrink-0">
            <RunDayButton />
          </div>
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        <PuzzlePartIDContext.Provider value={`${day}-1`}>
          <PuzzlePartRow />
        </PuzzlePartIDContext.Provider>
        <PuzzlePartIDContext.Provider value={`${day}-2`}>
          <PuzzlePartRow />
        </PuzzlePartIDContext.Provider>
      </ul>
    </div>
  );
};

export default PuzzleCard;
