import { FC, Fragment, useContext } from "react";
import { ChevronDownIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { PuzzleContext } from "@/lib/context";
import { Menu, Transition } from "@headlessui/react";
import RunDayButton from "./RunDayButton";
import DropdownLink from "./DropdownLink";

const PuzzleCardButtonGroup: FC = () => {
  const { day } = useContext(PuzzleContext);
  return (
    <div className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Edit Puzzle Input
        <PencilSquareIcon
          aria-hidden="true"
          className="w-4 h-4 ml-2 text-gray-400"
        />
      </button>
      <RunDayButton />
      <Menu as="div" className="relative block -ml-px">
        <Menu.Button className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
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
          <Menu.Items className="absolute right-0 z-10 w-56 mt-2 -mr-1 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <DropdownLink
                    active={active}
                    href={`https://adventofcode.com/2021/day/${parseInt(
                      day,
                      10
                    )}`}
                    title="Puzzle Description"
                  />
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <DropdownLink
                    active={active}
                    href={`https://github.com/MartinSeeler/advent-of-code-next/tree/main/puzzles/${day}/solution.ts`}
                    title="Source Code"
                  />
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