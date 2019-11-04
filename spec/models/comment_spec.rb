require 'rails_helper'
describe Comment do
  describe 'create' do
    it 'is valid with a text' do
      user = create(:user)
      post = create(:post,user_id: user.id)
      comment = build(:comment, user_id: user.id, post_id: post.id)
      expect(comment).to be_valid
    end
    it 'is invalid without a text' do
      user = create(:user)
      post = create(:post,user_id: user.id)
      comment = build(:comment, text:"", user_id: user.id, post_id: post.id)
      comment.valid?
      expect(comment.errors[:text]).to include("can't be blank")
    end
  end
end