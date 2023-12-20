import Cultural from "@/components/cultural/Cultural";
import LatestNews from "@/components/latest-news/LatestNews";
import MostView from "@/components/mostview/MostView";
import Story from "@/components/story/Story";
import Subscribe from "@/components/suscribe/Suscribe";
import TopBusiness from "@/components/top-business/TopBusiness";
import { NewsContextProvider } from "@/contexts/newsContext";
import Head from "next/head";

export default function Home() {
  return (
    <main>
      <NewsContextProvider>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossorigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Fauna+One&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Sen:wght@400;700;800&family=Sofia+Sans+Condensed:ital,wght@0,1;0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,1;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap"
            rel="stylesheet"
          />

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          />
        </Head>
        <TopBusiness />
        <LatestNews />
        <MostView />
        <Story />
        <Cultural />
        <Subscribe />
      </NewsContextProvider>
    </main>
  );
}
