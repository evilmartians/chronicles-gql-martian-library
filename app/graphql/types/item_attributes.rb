module Types
  class ItemAttributes < Types::BaseInputObject
    description "Attributes for creating or updating an item"

    argument :title, String, required: true
    argument :description, String, required: false
    argument :image_url, String, required: false
  end
end
