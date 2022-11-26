import { Puzzle } from "./types";

export default [
  {
    day: "01",
    name: "Report Repair",

    part1: () => new Promise((resolve, reject) => setTimeout(reject, 3000)),
    part2: () => Promise.reject(new Error("Not implemented")),
  },
  {
    day: "02",
    name: "Password Philosophy",

    part1: () =>
      new Promise((resolve, _) => {
        console.log("Hello world");
        resolve(1337);
      }),
    part2: () => new Promise((resolve) => setTimeout(() => resolve(42), 3000)),
  },
] as Puzzle[];
