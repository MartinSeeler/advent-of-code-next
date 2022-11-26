import PuzzleCard from "../components/PuzzleCard";
import puzzles from "../lib/puzzles";

const Home = () => (
  <div className="max-w-7xl mx-auto pt-16">
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
          <button
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            type="button"
          >
            Run All Days
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col space-y-6">
        {puzzles.map((puzzle) => (
          <PuzzleCard key={`${puzzle.day}-${puzzle.name}`} puzzle={puzzle} />
        ))}
      </div>
    </div>
  </div>
);

export default Home;
