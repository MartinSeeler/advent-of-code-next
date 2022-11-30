import { queuedPuzzlePartsState } from "@/lib/atoms";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FC } from "react";
import { RecoilRoot } from "recoil";

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(queuedPuzzlePartsState, []);
    }}
  >
    <Component {...pageProps} />
  </RecoilRoot>
);

export default App;
