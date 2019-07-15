# app/graphql/mutations/update_item_mutation.rb

module Mutations
  class UpdateItemMutation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :attributes, Types::ItemAttributes, required: true # new argument

    field :item, Types::ItemType, null: true
    field :errors, Types::ValidationErrorsType, null: true # <= change here

    def resolve(id:, attributes:)
      check_authentication!

      item = Item.find(id)

      if item.update(attributes.to_h)
        MartianLibrarySchema.subscriptions.trigger("itemUpdated", {}, item)
        { item: item }
      else
        { errors: item.errors.full_messages }
      end
    end
  end
end