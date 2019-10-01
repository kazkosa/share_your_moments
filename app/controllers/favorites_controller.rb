class FavoritesController < ApplicationController
  def create
    #Get the favorite that current user checked from the current article (not expected)
    @favorite = Favorite.find_by(user_id: current_user.id, post_id: params[:post_id])

    #If it does not exist, create a new one
    @favorite = Favorite.create(user_id: current_user.id, post_id: params[:post_id]) unless @favorite

    #Get the article record as same as clicked again to use on the view side
    @post = Post.find_by(id: @favorite.post_id)

    #Get the number of records of the current article from the favorites table to use on the viw side.
    @favorite_count = Favorite.where(post_id: params[:post_id]).count
  end 
  def destroy
    #Get the favorite that current user checked from the current article
    @favorite = Favorite.find_by(user_id: current_user.id, post_id: params[:post_id])

    #Get the article record as same as clicked again to use on the view side
    @post = Post.find_by(id: @favorite.post_id)
    
    #If it exist, delete one
    @favorite.destroy if @favorite
    
    #Get the number of records of the current article from the favorites table to use on the viw side.
    @favorite_count = Favorite.where(post_id: params[:post_id]).count
  end
  
end
