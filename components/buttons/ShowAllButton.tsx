import { FC } from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const ShowAllButton: FC = () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm max-sm:w-full dark:text-zinc-900 dark:bg-green-400 hover:bg-green-700 dark:hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed dark:ring-offset-zinc-900"
    >
      Show All Days
      <ArrowUturnLeftIcon
        aria-hidden="true"
        className="w-4 h-4 ml-1.5 -mr-1 text-white dark:text-zinc-900"
      />
    </Link>
  );
};
export default ShowAllButton;
