import PuzzleCard from "@/components/PuzzleCard";
import RunAllButton from "@/components/buttons/RunAllButton";
import { PuzzleContext } from "@/lib/context";
import { usePuzzleManager } from "@/lib/usePuzzleManager";
import puzzles from "@/puzzles/index";
import Footer from "@/components/Footer";
import {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { slugifyPuzzle } from "@/lib/utils";
import ShowAllButton from "@/components/buttons/ShowAllButton";
import Head from "next/head";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = puzzles.map((puzzle) => ({
    params: { puzzle: slugifyPuzzle(puzzle) },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const puzzleDay = puzzles.find(
    (puzzle) => slugifyPuzzle(puzzle) === params?.puzzle
  )?.day;
  return { props: { puzzleDay } };
};

const PuzzlePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  puzzleDay,
}) => {
  usePuzzleManager();
  const puzzle = puzzles.find((puzzle) => puzzle.day === puzzleDay)!;
  return (
    <div className="max-w-4xl pt-6 mx-auto md:pt-12 lg:pt-16">
      <div className="px-4 sm:px-6 lg:px-8">
        <PuzzleContext.Provider value={puzzle}>
          <header className="sm:flex sm:items-center">
            <Head>
              <title>Advent of Code 2022 - Solution for Day {puzzle.day}</title>
              <meta
                name="description"
                content={`Solution by Martin Seeler for Advent of Code 2022 day ${puzzle.day} - ${puzzle.name}, written in Typescript, using Next.js, Tailwind and Recoil.`}
              />
              <meta
                property="og:image"
                content={`https://advent-of-code-next.vercel.app/api/og?title=${encodeURIComponent(
                  `Day ${puzzle.day} - ${puzzle.name}`
                )}`}
              />
            </Head>
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-green-400">
                Advent of Code 2022 - Day {puzzle.day}
              </h1>
              <p className="max-w-xl mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                This is{" "}
                <a
                  href={`https://github.com/MartinSeeler/advent-of-code-next/blob/main/puzzles/${puzzle.day}/solution.ts`}
                  target={"_blank"}
                  rel="noopener noreferrer"
                  className="a-defaults"
                >
                  my solution
                </a>{" "}
                for the{" "}
                <a
                  href={`https://adventofcode.com/2022/day/${parseInt(
                    puzzle.day
                  )}`}
                  target={"_blank"}
                  rel="noopener noreferrer"
                  className="a-defaults"
                >
                  Advent of Code 2022 - Day {puzzle.day}
                </a>{" "}
                puzzle, written in TypeScript, using{" "}
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
          </header>
          <main className="flex flex-col my-8 space-y-8">
            <PuzzleCard hideLink />
            <div className="flex justify-center">
              <ShowAllButton />
            </div>
          </main>
          <Footer />
        </PuzzleContext.Provider>
      </div>
    </div>
  );
};

export default PuzzlePage;
