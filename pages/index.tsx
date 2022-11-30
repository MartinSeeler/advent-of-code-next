import dynamic from "next/dynamic";
import Head from "next/head";
const ViewAllPuzzles = dynamic(() => import("@/components/ViewAllPuzzles"), {
  ssr: false,
});

const Home = () => {
  return (
    <>
      <Head>
        <title>Advent of Code 2022 - Solutions</title>
        <meta
          name="description"
          content="Solutions by Martin Seeler for Advent of Code 2022, written in Typescript, using Next.js, Tailwind and Recoil."
        />
        <meta
          property="og:image"
          content="https://advent-of-code-next.vercel.app/api/og"
        />
      </Head>
      <ViewAllPuzzles />
    </>
  );
};

export default Home;
