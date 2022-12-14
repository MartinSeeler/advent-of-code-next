import { FC, useContext } from "react";

import PuzzlePartRow from "@/components/puzzlePart/PuzzlePartRow";
import RunDayButton from "@/components/buttons/RunDayButton";
import { PuzzleContext, PuzzlePartIDContext } from "@/lib/context";
import PuzzleCardButtonGroup from "./buttons/PuzzleCardButtonGroup";
import Link from "next/link";
import { slugifyPuzzle } from "@/lib/utils";

const PuzzleCard: FC<{ hideLink?: boolean }> = ({ hideLink = false }) => {
  const puzzle = useContext(PuzzleContext);
  return (
    <div className="-mx-4 overflow-hidden sm:rounded-lg sm:shadow sm:-mx-6 lg:-mx-8">
      <div className="px-4 py-5 border-b-2 border-dotted border-zinc-600 bg-zinc-800 sm:px-6 lg:px-8">
        <div className="flex justify-between -mt-4 sm:items-center max-sm:flex-col">
          <div className="mt-4">
            <div className="flex items-center">
              <div className="">
                <h3 className="text-lg font-medium text-green-400">
                  {hideLink ? (
                    <span>
                      Day {puzzle.day} - {puzzle.name}
                    </span>
                  ) : (
                    <Link
                      href={`/${slugifyPuzzle(puzzle)}`}
                      className="a-defaults"
                    >
                      Day {puzzle.day} - {puzzle.name}
                    </Link>
                  )}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-shrink-0 mt-4">
            <PuzzleCardButtonGroup />
          </div>
        </div>
      </div>
      <ul className="divide-y-2 divide-zinc-600 divide-dotted">
        <PuzzlePartIDContext.Provider value={`${puzzle.day}-1`}>
          <PuzzlePartRow />
        </PuzzlePartIDContext.Provider>
        <PuzzlePartIDContext.Provider value={`${puzzle.day}-2`}>
          <PuzzlePartRow />
        </PuzzlePartIDContext.Provider>
      </ul>
    </div>
  );
};

export default PuzzleCard;
