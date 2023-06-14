import GlobalStyle from "@/styles/styles";
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
      <Layout>
        <Component {...pageProps} deviceType={deviceType} />
      </Layout>
    </>
  );
}
