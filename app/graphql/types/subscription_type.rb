module Types
  class SubscriptionType < GraphQL::Schema::Object
    field :item_added, Types::ItemType, null: false, description: "An item was added"
    field :item_updated, Types::ItemType, null: false, description: "Existing item was updated"
  end
end
