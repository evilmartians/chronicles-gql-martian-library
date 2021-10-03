module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :items,
          [Types::ItemType],
          null: false,
          description: "Returns a list of items in the martian library"

    def items
      Item.preload(:user)
    end
  end
end
