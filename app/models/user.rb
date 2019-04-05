class User
  include ActiveModel::Model
  include ActiveModel::Validations
  include Virtus.model

  attribute :email, String
  attribute :age, Integer

  validates :email, :age, presence: true
  validates :age, numericality: { greater_than: 18 }
end
