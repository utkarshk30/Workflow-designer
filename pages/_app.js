import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import Head from "next/head";
import { FcWorkflow } from "react-icons/fc";


export default function App({ Component, pageProps }) {
  return (
    <>
     <Head>
        <title>Workflow designer</title>
        <meta name="description" content="workflow designer" />
        <link rel="icon" href="/logo.webp"  />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
