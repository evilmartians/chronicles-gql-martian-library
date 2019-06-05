class User < ApplicationRecord
  has_many :items, dependent: :destroy
end
