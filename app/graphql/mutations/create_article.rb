module Mutations
  class CreateArticle < GraphQL::Schema::RelayClassicMutation

    argument :name, String, required: true
    argument :content, String, required: true

    field :article, Types::ArticleType, null: false

    def resolve(name:, content:)
      article = Article.new(name: name, content: content)
      article.save!
      { article: article }
    end
  end
end
