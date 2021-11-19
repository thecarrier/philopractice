import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import Head from "next/head";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    let btn = document.querySelector(".fa-bars");
    let nav = document.querySelector(".nav-list");
    let navWrap = document.querySelector(".navigation");

    btn.addEventListener("click", toggleFunction);
    function toggleFunction() {
      nav.classList.toggle("show-nav");
    }

    nav.addEventListener("click", outsideClose);
    function outsideClose(event) {
      if (event.target === navWrap) {
      } else {
        nav.classList.remove("show-nav");
      }
    }
  }, []);

  return (
    <main>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
          integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}

export default MyApp;
