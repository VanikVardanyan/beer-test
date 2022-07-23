import NextNProgress from "nextjs-progressbar";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color="red"
        startPosition={0.9}
        stopDelayMs={200}
        height={7}
        showOnShallow={false}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
