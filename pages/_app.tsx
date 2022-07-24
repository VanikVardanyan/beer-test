import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Layout } from "../components/Layout";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <NextNProgress
          color="red"
          startPosition={0.9}
          stopDelayMs={200}
          height={7}
          showOnShallow={false}
        />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
