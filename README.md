# Advent of Code 2022

- Framework: [Next.js](https://nextjs.org/)
- State Management: [Recoil](https://recoiljs.org/)
- Icons: [Heroicons](https://heroicons.com/)
- Deployment: [Vercel](https://vercel.com/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- FP-Linting: [eslint-plugin-fp](https://github.com/jfmengels/eslint-plugin-fp)
- Analytics: [Plausible](https://plausible.io/) with [next-plausible](https://github.com/4lejandrito/next-plausible)
- Font: [VT323](https://fonts.google.com/specimen/VT323/tester?category=Monospace&preview.text=Advent%20of%20Code&preview.text_type=custom)

## Overview

- [`puzzles/`](tree/main/puzzles) - 👈 This is where the puzzles are
- `lib/` - State management and "game" logic, to schedule puzzle execution
- `template/` - Template generator and template files for the CLI
- `pages/` - Next.js pages
- `components/` - React components
- `styles/` - Tailwind CSS styles
- `public/` - Static assets (you know, like favicon)

## Running Locally

This application requires [Node.js v16.13+](https://nodejs.org/en/download/) and [Yarn v1.22+](https://classic.yarnpkg.com/en/docs/install).

```bash
git clone https://github.com/MartinSeeler/advent-of-code-next.git
cd advent-of-code-next
yarn install
yarn dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Prepare New Solution

I won't do fancy stuff like logging in to the AoC website and downloading the puzzle input. Instead, I'll just generate a new puzzle boilerplate with the following command:

```bash
yarn new-day
```

Enter the day number and the puzzle title and you're good to go. Open the generated file in `puzzles/` and start coding. You can insert your puzzle input in the `input.txt` file and adapt tests in the `solution.test.ts` file.