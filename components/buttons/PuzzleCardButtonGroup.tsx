import { FC, Fragment, useContext } from "react";
import {
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { PuzzleContext } from "@/lib/context";
import { Menu, Transition } from "@headlessui/react";
import RunDayButton from "./RunDayButton";
import Link from "next/link";
import EditInputButton from "./EditInputButton";

// eslint-disable-next-line fp/no-rest-parameters
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const PuzzleCardButtonGroup: FC = () => {
  const { day } = useContext(PuzzleContext);
  return (
    <div className="inline-flex rounded-md shadow-sm">
      <EditInputButton />
      <RunDayButton />
      <Menu as="div" className="relative block -ml-px">
        <Menu.Button className="relative inline-flex items-center px-2 py-2 btn-defaults rounded-r-md">
          <span className="sr-only">Open options</span>
          <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 w-56 mt-2 -mr-1 origin-top-right border border-green-400 rounded-md shadow-lg bg-zinc-800 ring-1 ring-green-400 ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={`https://adventofcode.com/2022/day/${parseInt(
                      day,
                      10
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      active ? "bg-green-400 text-zinc-800" : "text-green-400",
                      "flex items-center justify-between px-4 py-2 text-sm hover:bg-green-400 hover:text-zinc-800"
                    )}
                  >
                    Puzzle Description
                    <ArrowTopRightOnSquareIcon
                      aria-hidden="true"
                      className="w-4 h-4"
                    />
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={`https://github.com/MartinSeeler/advent-of-code-next/tree/main/puzzles/${day}/solution.ts`}
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      active ? "bg-green-400 text-zinc-800" : "text-green-400",
                      "flex items-center justify-between px-4 py-2 text-sm hover:bg-green-400 hover:text-zinc-800"
                    )}
                  >
                    Source Code
                    <ArrowTopRightOnSquareIcon
                      aria-hidden="true"
                      className="w-4 h-4"
                    />
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export default PuzzleCardButtonGroup;
