require 'rails_helper'
describe PostImage do
  describe 'create' do
    it 'is valid with a image' do
      user = create(:user)
      post = create(:post,user_id: user.id)
      post_image = build(:post_image, post_id: post.id)
      expect(post_image).to be_valid
    end
    it 'is invalid without a image' do
      user = create(:user)
      post = create(:post,user_id: user.id)
      post_image = build(:post_image, image:"", post_id: post.id)
      post_image.valid?
      expect(post_image.errors[:image]).to include("can't be blank")
    end
  end
  describe 'destroy' do
    it 'is vlid to destroy if it have posted in already' do
      user = create(:user)
      post = create(:post,user_id: user.id)
      post_image = create(:post_image, post_id: post.id)
      expect(post_image.destroy).to be_truthy
    end
  end
end
