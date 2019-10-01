class LikesController < ApplicationController
  def create
    #Get the like that current user checked from the current article (not expected)
    @like = Like.find_by(user_id: current_user.id, post_id: params[:post_id])

    #If it does not exist, create a new one
    @like = Like.create(user_id: current_user.id, post_id: params[:post_id]) unless @like

    #Get the article record as same as clicked again to use on the view side
    @post = Post.find_by(id: @like.post_id)
    
    #Get the number of records of the current article from the Likes table to use on the viw side.
    @like_count = Like.where(post_id: params[:post_id]).count
  end 
  def destroy
    #Get the like that current user checked from the current article
    @like = Like.find_by(user_id: current_user.id, post_id: params[:post_id])

    #Get the article record as same as clicked again to use on the view side
    @post = Post.find_by(id: @like.post_id)
    
    #If it exist, delete one
    @like.destroy if @like
    
    #Get the number of records of the current article from the Likes table to use on the viw side.
    @like_count = Like.where(post_id: params[:post_id]).count
  end
    
end
