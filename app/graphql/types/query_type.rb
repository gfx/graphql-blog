module Types
  class QueryType < Types::BaseObject
    field :articles, Types::ArticleType.connection_type, null: false, resolve: -> (_object, _args, _context) do
      Article.recent
    end
  end
end
