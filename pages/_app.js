import GlobalStyle from "@/styles/styles";
import Head from "next/head";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [deviceType, setDeviceType] = useState("");
  const [viewportWidth, setViewportWidth] = useState(0);

  function handleResize() {
    setViewportWidth(window.innerWidth);
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      setViewportWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (viewportWidth <= 767) {
      setDeviceType("mobile");
    } else if (viewportWidth > 767 && viewportWidth < 1024) {
      setDeviceType("tablet");
    } else if (viewportWidth > 1023) {
      setDeviceType("desktop");
    }
  }, [viewportWidth]);

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Josie Overton Portfolio</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Explore the work of artist Josie Overton"
          key="desc"
        />
        <meta property="og:title" content="Josie Overton Portfolio" />
        <meta
          property="og:description"
          content="Explore the work of artist Josie Overton"
        />
      </Head>
      <Layout>
        <Component {...pageProps} deviceType={deviceType} />
      </Layout>
    </>
  );
}
