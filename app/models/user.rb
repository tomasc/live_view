class User
  include ActiveModel::Model
  include ActiveModel::Validations
  include Virtus.model

  attribute :email, String
  attribute :age, Integer

  validates :email, :age, presence: true
  validates :email, length: { minimum: 5 }
  validates :age, numericality: { greater_than: 18 }
end
