import React from "react";
import { autobind } from "@typed-decorators/autobind";

import { ArticleList } from "./ArticleList";
import { NewArticle } from "./NewArticle";
import { ArticleType } from "./Article";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { request } from "./client";
import { Connection, arrayFromConnection } from "./relay";

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
    const query = `
      query GetArticles {
        articles {
          edges {
            node {
              id
              name
              content
              createdAt
            }
          }
        }
      }
    `;

    const result = await request<{  articles: Connection<ArticleType> }>({
      query,
    });
    this.setState({ articles: arrayFromConnection(result.data.articles) });
  }

  @autobind
  async handleArticleSubmit(article: ArticleType) {
    const query = `
      mutation CreateArticle($input: CreateArticleInput!) {
        createArticle(input: $input) {
          article {
            id
            name
            content
            createdAt
          }
        }
      }
    `;
    type CreateArticlePayload = { article: ArticleType };
    const result = await request<{ createArticle: CreateArticlePayload }>({
      query,
      variables: {
        input: {
          name: article.name,
          content: article.content,
        },
      },
    });

    this.setState({
      articles: [result.data.createArticle.article, ...this.state.articles],
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
