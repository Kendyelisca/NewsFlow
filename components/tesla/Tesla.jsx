import { NewsContext } from "../../context/news-context";
import { useContext } from "react";

const Tesla = () => {
  const { news } = useContext(NewsContext);

  if (news === undefined) {
    // You can render a loading indicator here
    return <div>Loading...</div>;
  }

  // Once 'news' is available, you can display the content
  return (
    <div>
      {news.length > 0 ? (
        news.map((article) => (
          <div key={article.title}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </div>
        ))
      ) : (
        <div>No Tesla news available</div>
      )}
    </div>
  );
};

export default Tesla;
