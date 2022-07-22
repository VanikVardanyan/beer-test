import NextNProgress from "nextjs-progressbar";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress
        color="red"
        startPosition={0.9}
        stopDelayMs={200}
        height={7}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
