module Types
  class ItemInput < Types::BaseInputObject
    description "Input for creating or updating an item"

    argument :title, String, required: true
    argument :description, String, required: false
    argument :image_url, String, required: false
  end
end
