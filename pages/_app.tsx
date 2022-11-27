import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FC } from "react";
import { RecoilRoot } from "recoil";

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <RecoilRoot>
    <Component {...pageProps} />
  </RecoilRoot>
);

export default App;
