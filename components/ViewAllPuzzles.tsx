import { PuzzleContext } from "@/lib/context";
import { usePuzzleManager } from "@/lib/usePuzzleManager";
import puzzles from "../puzzles";
import RunAllButton from "./buttons/RunAllButton";
import Footer from "./Footer";
import PuzzleCard from "./PuzzleCard";

const ViewAllPuzzles = () => {
  usePuzzleManager();
  return (
    <div className="max-w-4xl pt-6 mx-auto md:pt-12 lg:pt-16">
      <div className="px-4 sm:px-6 lg:px-8">
        <header className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-green-400">
              Advent of Code 2022
            </h1>
            <p className="max-w-xl mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
              These are{" "}
              <a
                href="https://github.com/MartinSeeler/advent-of-code-next"
                target={"_blank"}
                rel="noopener noreferrer"
                className="a-defaults"
              >
                my solutions
              </a>{" "}
              for the{" "}
              <a
                href="https://adventofcode.com/2022"
                target={"_blank"}
                rel="noopener noreferrer"
                className="a-defaults"
              >
                Advent of Code 2022
              </a>{" "}
              puzzles, written in TypeScript, using{" "}
              <a
                href="https://nextjs.org/"
                target={"_blank"}
                rel="noopener noreferrer"
                className="a-defaults"
              >
                Next.js
              </a>
              ,{" "}
              <a
                href="https://tailwindui.com/"
                target={"_blank"}
                rel="noopener noreferrer"
                className="a-defaults"
              >
                Tailwind CSS
              </a>{" "}
              and{" "}
              <a
                href="https://recoiljs.org/"
                target={"_blank"}
                rel="noopener noreferrer"
                className="a-defaults"
              >
                Recoil
              </a>
              .
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <RunAllButton allDays={puzzles.map((x) => x.day)} />
          </div>
        </header>
        <main className="flex flex-col my-8 space-y-8">
          {puzzles.map((puzzle) => (
            <PuzzleContext.Provider value={puzzle} key={`card-${puzzle.day}`}>
              <PuzzleCard />
            </PuzzleContext.Provider>
          ))}
        </main>
        <Footer />
      </div>
    </div>
  );
};
export default ViewAllPuzzles;
