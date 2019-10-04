class RelationshipsController < ApplicationController
  before_action :set_user

  def create
    user = User.find(params[:relationship][:follow_id])
    following = current_user.follow(user)
    if following.save
      flash[:notice] = 'Followed users'
      redirect_to user
    else
      flash.now[:alert] = 'Failed to follow user'
      redirect_to user
    end
  end

  def destroy
    user = User.find(params[:relationship][:follow_id])
    following = current_user.unfollow(user)
    if following.destroy
      flash[:notice] = 'Unfollowed user'
      redirect_to user
    else
      flash.now[:alert] = 'Failed to unfollow user'
      redirect_to user
    end
  end

  private

  def set_user
    user = User.find(params[:relationship][:follow_id])
  end
end
