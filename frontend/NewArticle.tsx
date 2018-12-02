import React from "react";
import { autobind } from "@typed-decorators/autobind";

interface ArticleType {
  name: string;
  content: string;
}

interface Props {
  onArticleSubmit(article: ArticleType): void;
}

interface State {
  article: ArticleType;
}

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  marginBottom: 10,
};

const labelStyle: React.CSSProperties = {
  display: "flex",
};

const nameInputStyle: React.CSSProperties = {
  width: 200,
};

const contentInputStyle: React.CSSProperties = {
  width: 200,
};

export class NewArticle extends React.Component<Props, State> {
  readonly state = {
    article: {
      name: "",
      content: "",
    },
  };

  @autobind
  async handleSubmit(event) {
    event.preventDefault();

    this.props.onArticleSubmit(this.state.article);
    this.setState({
      article: {
        ...this.state.article,
        content: "",
      },
    });
  }

  @autobind
  handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      article: {
        ...this.state.article,
        name: event.target.value,
      },
    });
  }

  @autobind
  handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      article: {
        ...this.state.article,
        content: event.target.value,
      },
    });
  }

  render() {
    const { article } = this.state;
    return (
      <form style={formStyle} onSubmit={this.handleSubmit}>
        <div>
          <label style={labelStyle} htmlFor="name">
            Name
          </label>
          <input style={nameInputStyle} type="text" onChange={this.handleNameChange} name="name" value={article.name} />
        </div>

        <div>
          <label style={labelStyle} htmlFor="content">
            Content
          </label>
          <textarea
            style={contentInputStyle}
            onChange={this.handleContentChange}
            name="content"
            value={article.content}
          />
        </div>

        <div>
          <input type="submit" />
        </div>
      </form>
    );
  }
}
