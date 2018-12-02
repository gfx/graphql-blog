class ArticlesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def root
  end

  def index
    articles = Article.order(id: :desc)
    render json: {
      data: articles.map do |article|
        {
          id: article.id,
          name: article.name,
          content: article.content,
          createdAt: article.created_at,
        }
      end,
    }
  end

  def create
    article = Article.new(params[:article].permit(:name, :content))
    article.save!
    render json: {
      data: {
        id: article.id,
        name: article.name,
        content: article.content,
        createdAt: article.created_at,
      },
    }
  end
end
