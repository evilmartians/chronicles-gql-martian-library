module Types
  class ValidationErrorsType < Types::BaseObject
    field :details, String, null: false
    field :full_messages, [String], null: false

    def details
      object.details.to_json
    end
  end
end
