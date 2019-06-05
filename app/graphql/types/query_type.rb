module Types
  class QueryType < Types::BaseObject
    field :items,
          [Types::ItemType],
          null: false,
          description: "Returns a list of items in the martian library"

    def items
      Item.preload(:user)
    end
  end
end
