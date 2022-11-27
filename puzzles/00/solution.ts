import { Puzzle } from "@/lib/types";
import inputFile from "./input.txt";

async function solvePart1(input: string): Promise<number> {
  const seconds = Math.floor(Math.random() * 10);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Failed after ${seconds} seconds`));
    }, seconds * 1000);
  });
}

async function solvePart2(input: string): Promise<number> {
  const seconds = Math.floor(Math.random() * 10);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(seconds);
    }, seconds * 1000);
  });
}

export default {
  day: "00",
  name: "UI Demo Day",
  inputFile,
  solvePart1,
  solvePart2,
} as Puzzle;
