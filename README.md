# Advent of Code 2022

- Framework: [Next.js](https://nextjs.org/)
- State Management: [Recoil](https://recoiljs.org/)
- Icons: [Heroicons](https://heroicons.com/)
- Deployment: [Vercel](https://vercel.com/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- FP-Linting: [eslint-plugin-fp](https://github.com/jfmengels/eslint-plugin-fp)

## Overview

- `puzzles/` - 👈 This is where the puzzles are
- `lib/` - State management and "game" logic, to schedule puzzle execution
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