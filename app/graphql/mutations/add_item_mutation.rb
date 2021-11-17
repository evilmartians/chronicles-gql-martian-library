module Mutations
  class AddItemMutation < Mutations::BaseMutation
    argument :input, Types::ItemInput, required: true

    field :item, Types::ItemType, null: true
    field :errors, Types::ValidationErrorsType, null: true

    def resolve(input:)
      check_authentication!

      item = Item.new(input.to_h.merge(user: context[:current_user]))

      if item.save
        MartianLibrarySchema.subscriptions.trigger("itemAdded", {}, item)
        { item: item }
      else
        { errors: item.errors }
      end
    end
  end
end
