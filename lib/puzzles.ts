import { Puzzle } from "./types";

export default [
  {
    day: "01",
    name: "Report Repair",

    parts: {
      // eslint-disable-next-line promise/avoid-new, no-promise-executor-return
      "1": () => new Promise((resolve, reject) => setTimeout(reject, 3000)),
      "2": () => Promise.reject(new Error("Not implemented")),
    },
  },
  {
    day: "02",
    name: "Password Philosophy",

    parts: {
      "1": () => Promise.resolve(1337),
      // eslint-disable-next-line promise/avoid-new, no-promise-executor-return
      "2": () => new Promise((resolve) => setTimeout(() => resolve(42), 3000)),
    },
  },
] as Puzzle[];
