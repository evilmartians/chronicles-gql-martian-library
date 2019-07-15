module Mutations
  class SignInMutation < Mutations::BaseMutation
    argument :email, String, required: true

    field :token, String, null: true
    field :user, Types::UserType, null: true

    def resolve(email:)
      user = User.find_by!(email: email)

      token = Base64.encode64(user.email)

      {
        token: token,
        user: user
      }
    rescue ActiveRecord::RecordNotFound
      raise GraphQL::ExecutionError, "user not found"
    end
  end
end