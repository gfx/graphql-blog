class ArticlesController < ApplicationController

  def index
    @articles = Article.order(id: :desc)
  end

  def new
  end

  def create
    article = Article.new(params[:article].permit(:name, :content))
    article.save!
    redirect_to articles_path
  end
end
