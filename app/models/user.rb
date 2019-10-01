class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :posts
  has_many :comments
  has_many :comments,:dependent   => :delete_all
  has_many :likes,:dependent      => :delete_all
  has_many :favorites,:dependent  => :delete_all
  has_one_attached :avatar
  validates :name, presence: true, length: {maximum: 15}
  validates :email, presence: true
  #mount_uploader :avatar, ImageUploader
end
