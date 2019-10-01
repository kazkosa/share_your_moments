class CommentsController < ApplicationController
  def new
  end
  def create
    @post = Post.find(params[:post_id])
    @comment = Comment.new(comment_params)

    respond_to do |format|
      if @comment.save
        format.html {redirect_to post_path(@post), notice:"commented"}
        format.json
      else
        format.html {redirect_to post_path(@post), notice:"Comment rejected"}
        format.json
      end
    end

  end

  private
  def comment_params
    params.require(:comment).permit(:text).merge(user_id: current_user.id, post_id: params[:post_id])
  end
end
