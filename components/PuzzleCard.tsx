import { FC, useContext } from "react";

import PuzzlePartRow from "@/components/puzzlePart/PuzzlePartRow";
import RunDayButton from "@/components/buttons/RunDayButton";
import { PuzzleContext, PuzzlePartIDContext } from "@/lib/context";
import PuzzleCardButtonGroup from "./buttons/PuzzleCardButtonGroup";

const PuzzleCard: FC = () => {
  const { day, name } = useContext(PuzzleContext);
  return (
    <div className="-mx-4 overflow-hidden sm:rounded-lg sm:shadow sm:-mx-6 lg:-mx-8">
      <div className="px-4 py-5 bg-white border-b border-gray-200 border-dotted dark:border-green-500/50 dark:bg-zinc-800 sm:px-6 lg:px-8">
        <div className="flex justify-between -mt-4 sm:items-center max-sm:flex-col">
          <div className="mt-4">
            <div className="flex items-center">
              <div className="">
                <h3 className="font-medium text-gray-900 dark:text-green-400">
                  Day {day} - {name}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-shrink-0 mt-4">
            <PuzzleCardButtonGroup />
          </div>
        </div>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-green-500/50 dark:divide-dotted">
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
