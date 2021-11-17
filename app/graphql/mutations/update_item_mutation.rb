module Mutations
  class UpdateItemMutation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :input, Types::ItemInput, required: true

    field :item, Types::ItemType, null: true
    field :errors, [String], null: false

    def resolve(id:, input:)
      check_authentication!

      item = Item.find(id)

      if item.update(input.to_h)
        MartianLibrarySchema.subscriptions.trigger("itemUpdated", {}, item)
        { item: item }
      else
        { errors: item.errors.full_messages }
      end
    end
  end
end
