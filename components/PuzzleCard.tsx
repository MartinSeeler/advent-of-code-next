import { FC, useContext } from "react";

import PuzzlePartRow from "@/components/PuzzlePartRow";
import RunDayButton from "@/components/RunDayButton";
import { PuzzleContext, PuzzlePartIDContext } from "@/lib/context";

const PuzzleCard: FC = () => {
  const { day, name } = useContext(PuzzleContext);
  return (
    <div className="-mx-4 overflow-hidden bg-white sm:rounded-lg sm:shadow sm:-mx-6 lg:-mx-8">
      <div className="px-4 py-5 bg-white border-b border-gray-200 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between -mt-4 sm:flex-nowrap">
          <div className="mt-4">
            <div className="flex items-center">
              <div className="">
                <h3 className="font-medium text-gray-900">
                  Day {day} - {name}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-shrink-0 mt-4">
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
