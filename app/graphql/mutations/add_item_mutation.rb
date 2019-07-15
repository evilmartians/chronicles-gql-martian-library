# app/graphql/mutations/add_item_mutation.rb

module Mutations
  class AddItemMutation < Mutations::BaseMutation
    argument :title, String, required: true
    argument :description, String, required: false
    argument :image_url, String, required: false

    field :item, Types::ItemType, null: true
    field :errors, Types::ValidationErrorsType, null: true # this line has changed

    def resolve(title:, description: nil, image_url: nil)
      check_authentication!

      item = Item.new(
        title: title,
        description: description,
        image_url: image_url,
        user: context[:current_user]
      )

      if item.save
        { item: item }
      else
        { errors: item.errors } # change here
      end
    end
  end
end