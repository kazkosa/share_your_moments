class PostsController < ApplicationController
  def index
    @posts = Post.order("created_at DESC").page(params[:page]).per(18)
  end
  
  def new
    if params[:back]
      binding.pry
      @post = Post.new(post_params)
      @post.image.retrieve_from_cache! params[:post][:image_cache]
    else
      @post = Post.new
    end
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to root_path, notce: 'New airticle has been postted'
    else
      flash.now[:alert] = 'New airticle cannot be postted.'; render :index
    end
  end

  def show
    @post = Post.find(params[:id])
    @likes = @post.likes
    @like  = @likes.find_by(user_id: current_user.id)
    @comments = @post.comments
    @comment = Comment.new();
  end

  def edit
    @post = Post.find(params[:id])
    @post.image.cache!
  end

  def update
    @post = Post.find(params[:id])
    @post.update(post_params) if user_signed_in? && @post.user_id == current_user.id
    redirect_to action: :show, notice: 'The airticle have been updated'
  end
  def destroy
    @post = Post.find(params[:id])
    @post.destroy if @post.user_id == current_user.id
    redirect_to root_path, notice: 'The airticle have been deleted'
  end

  private
  def post_params
    params.require(:post).permit(:title,:content,:image,:image_cache, :image_option, :location).merge(user_id: current_user.id)
  end
end
