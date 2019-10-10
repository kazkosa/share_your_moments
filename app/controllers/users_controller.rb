class UsersController < ApplicationController
  before_action :set_user, only: [:edit, :show]

  def edit
  end
  def edit_avatar
  end
  
  def update
    if current_user.update(user_params)
      redirect_to user_path(current_user)
    else
      render :edit
    end
  end

  def show
    @user = User.find(params[:id])
    @favorites = @user.favorites
    @Post_favorites = Post.find( @favorites.map{ |favorite| favorite[:post_id]   } )
    @followers = @user.followers
    @followings = @user.followings
    following_ids = @followings.map{ |following| following.posts.map{|post| post.id}   }.flatten.sort {|a, b| b <=> a }
    @Post_followings = following_ids.map{|id| Post.find(id)}.slice(0,5)
  end

  private

  def user_params
    params.require(:user).permit(:name,:email,:avatar)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
