class Post < ApplicationRecord
  belongs_to :user
  has_many :comments,:dependent   => :delete_all
  has_many :likes,:dependent      => :delete_all
  has_many :favorites,:dependent  => :delete_all
  has_many :post_tags
  has_many :tags, through: :post_tags
  validates :title, presence: true
  validates :content, presence: true
  validates :image, presence: true
  mount_uploader :image, ImageUploader
end
