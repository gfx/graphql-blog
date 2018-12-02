import React from "react";
import { autobind } from "@typed-decorators/autobind";

import { ArticleList } from "./ArticleList";
import { NewArticle } from "./NewArticle";
import { ArticleType } from "./Article";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { request } from "./client";

const mainStyle = {
  margin: 40,
};

interface Props {}

interface State {
  articles: ReadonlyArray<ArticleType>;
}

export class App extends React.Component<Props, State> {
  readonly state: Readonly<State> = {
    articles: [],
  };

  async componentDidMount() {
    const result = await request<ReadonlyArray<ArticleType>>({
      method: "GET",
      url: "/articles",
    });
    this.setState({ articles: result.data });
  }

  @autobind
  async handleArticleSubmit(article: ArticleType) {
    const result = await request<ArticleType>({
      method: "POST",
      url: "/articles",
      body: { article },
    });

    this.setState({
      articles: [result.data, ...this.state.articles],
    });
  }

  render() {
    return (
      <main style={mainStyle}>
        <Header />
        <NewArticle onArticleSubmit={this.handleArticleSubmit} />
        <ArticleList articles={this.state.articles} />
        <Footer />
      </main>
    );
  }
}
