import React from "react";

export interface ArticleType {
  id: number;
  name: string;
  content: string;
  createdAt: string;
}

interface Props {
  article: ArticleType;
}

const articleStyle: React.CSSProperties = {
  borderTop: "1px solid gray",
};

const timestampStyle: React.CSSProperties = {
  color: "gray",
  fontStyle: "normal",
};

export class Article extends React.Component<Props> {
  render() {
    const { article } = this.props;
    return (
      <div style={articleStyle}>
        <p>
          <strong>{article.name}</strong>
          &nbsp;
          <em style={timestampStyle}>{article.createdAt}</em>
        </p>
        <p>{article.content}</p>
      </div>
    );
  }
}
