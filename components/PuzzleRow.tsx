import { FC } from "react";

import { Puzzle } from "../lib/types";
import { classNames } from "../lib/utils";

const PuzzleRow: FC<{ puzzle: Puzzle }> = ({ puzzle }) => (
  <tr>
    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 lg:pl-8">
      {puzzle.day}. {puzzle.name || "Not yet named"}
    </td>
    <td
      className={classNames(
        "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell"
      )}
    >
      0
    </td>
    <td
      className={classNames(
        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
      )}
    >
      0
    </td>
    <td
      className={classNames(
        "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8"
      )}
    >
      <button className="text-indigo-600 hover:text-indigo-900" type="button">
        Run Both
      </button>
    </td>
  </tr>
);

export default PuzzleRow;
