import React from "react";
import { Article, ArticleType } from "./Article";

interface Props {
  articles: ReadonlyArray<ArticleType>;
}

export class ArticleList extends React.Component<Props> {
  render() {
    const { articles } = this.props;

    return (
      <article>
        {articles.map(article => {
          return <Article key={article.id} article={article} />;
        })}
      </article>
    );
  }
}
