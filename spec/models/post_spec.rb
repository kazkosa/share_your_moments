require 'rails_helper'
describe Post do
  describe 'create' do
    it 'is valid with a image' do
      user = create(:user)
      post = build(:post,user_id: user.id)
      expect(post).to be_valid
    end
    it 'is invalid without a image' do
      user = create(:user)
      post = build(:post,image:"",user_id: user.id)
      post.valid?
      expect(post.errors[:image]).to include("can't be blank")
    end
    it 'is invalid without a content' do
      user = create(:user)
      post = build(:post,content:"",user_id: user.id)
      post.valid?
      expect(post.errors[:content]).to include("can't be blank")
    end
    it 'is invalid without a title' do
      user = create(:user)
      post = build(:post,title:"",user_id: user.id)
      post.valid?
      expect(post.errors[:title]).to include("can't be blank")
    end
  end
  describe 'update' do
    it "is valid to destroy if it have posted in already" do
      user = create(:user)
      post = create(:post,user_id: user.id)
      post.title = "test_title2"
      expect(post.save).to be_truthy
    end
  end
  describe 'destroy' do
    it "is valid to destroy if it have posted in already" do
      user = create(:user)
      post = create(:post,user_id: user.id)
      expect(post.destroy).to be_truthy
    end
  end
end