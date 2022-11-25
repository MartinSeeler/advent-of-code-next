import PuzzleRow from "../components/PuzzleRow";
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
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
              <table className="min-w-full border-separate">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                      scope="col"
                    >
                      Day
                    </th>

                    <th
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                      scope="col"
                    >
                      Part 1
                    </th>
                    <th
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      scope="col"
                    >
                      Part 2
                    </th>
                    <th
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                      scope="col"
                    >
                      <span className="sr-only">Run Both</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {puzzles.map((puzzle) => (
                    <PuzzleRow key={`puzzle-${puzzle.day}`} puzzle={puzzle} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
