import { queuedPuzzlePartsState } from "@/lib/atoms";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FC } from "react";
import { RecoilRoot } from "recoil";
import PlausibleProvider from "next-plausible";

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <PlausibleProvider
    domain="advent-of-code-next.vercel.app"
    trackOutboundLinks={true}
    scriptProps={{
      src: "/stats/js/script.js",
      // @ts-ignore
      "data-api": "/stats/api/event",
    }}
  >
    <RecoilRoot
      initializeState={({ set }) => {
        set(queuedPuzzlePartsState, []);
      }}
    >
      <Component {...pageProps} />
    </RecoilRoot>
  </PlausibleProvider>
);

export default App;
