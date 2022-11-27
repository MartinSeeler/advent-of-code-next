import inquirer from "inquirer";
import {
  existsSync,
  mkdirSync,
  copyFileSync,
  writeFileSync,
  readdirSync,
  readFileSync,
} from "fs";

const getAllPuzzleDirs = () =>
  readdirSync("./puzzles", { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

inquirer
  .prompt([
    {
      type: "input",
      name: "day",
      message: "Day",
      default: new Date().getDate().toString().padStart(2, "0"),
      validate: (input) => {
        const day = parseInt(input);
        return day >= 1 && day <= 25 ? true : "Day must be between 1 and 25";
      },
    },
    {
      type: "input",
      name: "title",
      message: "Puzzle Title",
      validate: (input) =>
        input.trim().length > 0 ? true : "Please enter a title",
    },
  ])
  .then((answers) => {
    const { day, title } = answers;
    const paddedDay = day.padStart(2, "0");
    const trimmedTitle = title.trim();

    // const puzzleDirs = getAllPuzzleDirs();

    const dir = `./puzzles/${paddedDay}`;
    if (existsSync(dir)) {
      console.log("Day already exists");
      return;
    }
    console.log(
      "Preparing new puzzle solution for: Day",
      paddedDay,
      "-",
      trimmedTitle
    );
    mkdirSync(dir);
    copyFileSync("./template/input.txt", `${dir}/input.txt`);
    writeFileSync(
      `${dir}/solution.ts`,
      readFileSync("./template/solution.ts", "utf8")
        .replace(/\[\[DAY\]\]/g, paddedDay)
        .replace(/\[\[TITLE\]\]/g, trimmedTitle)
    );
    writeFileSync(
      `${dir}/solution.test.ts`,
      readFileSync("./template/solution.test.ts", "utf8")
        .replace(/\[\[DAY\]\]/g, paddedDay)
        .replace(/\[\[TITLE\]\]/g, trimmedTitle)
    );
    const allPuzzleDirs = getAllPuzzleDirs();
    const allPuzzlesContent = `import { Puzzle } from "../lib/types";\n\n${allPuzzleDirs
      .map((d) => `import puzzle${d} from "./${d}/solution";`)
      .join("\n")}\n\nexport default [${allPuzzleDirs
      .reverse()
      .map((d) => `puzzle${d}`)
      .join(", ")}] as Puzzle[];
    `;
    writeFileSync("./puzzles/index.ts", allPuzzlesContent);
    console.log("Done");
  });
