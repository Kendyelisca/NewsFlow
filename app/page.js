import LatestNews from "@/components/latest-news/LatestNews";
import Subscribe from "@/components/suscribe/Suscribe";
import TopBusiness from "@/components/top-business/TopBusiness";
import Head from "next/head";

export default function Home() {
  return (
    <main>
      <Head>
        {" "}
        <link
          href="https://fonts.googleapis.com/css2?family=Times+New+Roman&display=swap"
          rel="stylesheet"
        />
      </Head>
      <TopBusiness />
      <LatestNews />
      <Subscribe />
    </main>
  );
}
