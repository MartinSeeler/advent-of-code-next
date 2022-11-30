import puzzles from "@/puzzles/index";
import {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { slugifyPuzzle } from "@/lib/utils";
import Head from "next/head";
import dynamic from "next/dynamic";
const ViewSinglePuzzle = dynamic(
  () => import("@/components/ViewSinglePuzzle"),
  {
    ssr: false,
  }
);

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
  const puzzle = puzzles.find((puzzle) => puzzle.day === puzzleDay)!;
  return (
    <>
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
      <ViewSinglePuzzle puzzleDay={puzzleDay} />
    </>
  );
};

export default PuzzlePage;
