class Article < ApplicationRecord
  validates :name, presence: true
  validates :content, presence: true

  scope :recent, -> { order(id: :desc) }
end
