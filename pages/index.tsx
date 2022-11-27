import PuzzleCard from "../components/PuzzleCard";
import RunAllButton from "../components/RunAllButton";
import { usePuzzleManager } from "../lib/usePuzzleManager";
import puzzles from "../puzzles/all_puzzles";

const Home = () => {
  usePuzzleManager();
  return (
    <div className="max-w-4xl mx-auto pt-6 md:pt-12 lg:pt-16">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Advent of Code 2022
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              These are my solutions to the Advent of Code 2022 puzzles.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <RunAllButton allDays={puzzles.map((x) => x.day)} />
          </div>
        </div>
        <div className="mt-8 flex flex-col space-y-6">
          {puzzles.map((puzzle) => (
            <PuzzleCard key={`card-${puzzle.day}`} puzzle={puzzle} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
