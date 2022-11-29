import { HeartIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="max-w-md px-4 py-12 mx-auto overflow-hidden sm:px-6 lg:px-8">
      <div className="">
        <p className="flex items-center justify-center text-base text-gray-400 dark:text-gray-500 gap-x-2">
          <span>Made with</span>
          <HeartIcon aria-hidden="true" className="w-4 h-4 mx-1 text-red-500" />
          <span>by</span>
          <a
            href="https://martinseeler.com?utm_source=aoc2022&utm_medium=footer"
            target={"_blank"}
            rel="noopener noreferrer"
            className="underline underline-offset-8 hover:text-green-500 dark:decoration-dotted"
          >
            Martin Seeler
          </a>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
