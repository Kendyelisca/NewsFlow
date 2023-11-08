import LatestNews from "@/components/latest-news/LatestNews";
import Subscribe from "@/components/suscribe/Suscribe";
import TopBusiness from "@/components/top-business/TopBusiness";

export default function Home() {
  return (
    <main>
      <TopBusiness />
      <LatestNews />
      <Subscribe />
    </main>
  );
}
