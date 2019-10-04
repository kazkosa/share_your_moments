class Post < ApplicationRecord
  belongs_to :user
  has_many :comments,:dependent   => :delete_all
  has_many :likes,:dependent      => :delete_all
  has_many :favorites,:dependent  => :delete_all
  has_many :post_tags ,:dependent => :delete_all
  has_many :tags, through: :post_tags
  validates :title, presence: true
  validates :content, presence: true
  validates :image, presence: true
  mount_uploader :image, ImageUploader

  def save_tags(tag_list)
    current_tag_list = self.tags.pluck(:name) unless self.tags.nil?
    old_tag_list      = current_tag_list - tag_list
    new_tag_list      = tag_list - current_tag_list

    # Destroy old taggings:
    old_tag_list.each do |old_name|
      self.tags.delete Tag.find_by(name:old_name)
      Tag.find_by(name:old_name).delete if Tag.find_by(name:old_name).posts.empty?
    end

    # Create new taggings:
    new_tag_list.each do |new_name|
      post_tag = Tag.find_or_create_by(name:new_name)
      self.tags << post_tag
    end
  end

end
