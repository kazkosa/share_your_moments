class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    @posts = Post.order("created_at DESC").page(params[:page]).per(18)
  end
  
  def new
    if params[:back]
      @post = Post.new(post_params)
      @post.image.retrieve_from_cache! params[:post][:image_cache]
    else
      @post = Post.new
      @post.post_images.build
    end
  end

  def create
    @post = Post.new(post_params) 
    tag_list = @post.content.scan(%r|\s?(#[^\s[　,<br>]]+)\s?|).flatten
    if @post.save
      @post.save_tags(tag_list)
      redirect_to root_path, notce: 'New airticle has been postted'
    else
      flash.now[:alert] = 'New airticle cannot be postted.'; render :index
    end    
  end

  def show
    @likes = @post.likes
    @like  = @likes.find_by(user_id: current_user.id)
    @favorites = @post.favorites
    @favorite  = @favorites.find_by(user_id: current_user.id)
    @comments = @post.comments
    @comment = Comment.new();
  end

  def edit
    @post.image.cache!
  end

  def update
    if user_signed_in? && @post.user_id == current_user.id
      @post.update(post_params)
      tag_list = @post.content.scan(%r|\s?(#[^\s[　,<>]]+)\s?|).flatten
      @post.save_tags(tag_list)
      redirect_to action: :show, notice: 'The airticle have been updated'
    else
      flash.now[:alert] = 'This airticle cannot be editted.'; render :show
    end
  end
  
  def destroy
    tag_list = @post.content.scan(%r|\s?(#[^\s[　,<>]]+)\s?|).flatten
    if @post.user_id == current_user.id
      @post.destroy 
      tag_list.each do |currnt_post_has_tag_name|
        Tag.find_by(name:currnt_post_has_tag_name).delete if Tag.find_by(name:currnt_post_has_tag_name).posts.empty?
      end
      redirect_to root_path, notice: 'The airticle have been deleted'
    end
  end

  def search
    @posts_title    = Post.where("title LIKE(?)" ,"%#{params[:keyword]}%")
    @posts_content  = Post.where("content LIKE(?)" ,"%#{params[:keyword]}%")
    @posts_location = Post.where("location LIKE(?)" ,"%#{params[:keyword]}%")
    @tags_name      = Tag.where("name LIKE(?)" ,"%#{params[:keyword]}%")
    @search_keyword= params[:keyword]
    
    if params[:keyword] != ""
      @posts = @posts_title.or(@posts_content).or(@posts_location)
      @posts_page = @posts.order("created_at DESC").page(params[:page]).per(15)

      respond_to do |format|
        format.html
        format.json
      end
    else
      respond_to do |format|
        format.html { redirect_to posts_path }
        format.json
      end
    end

  end

  private

  def post_params
    params.require(:post).permit(:title,:content,:image,:image_cache, :image_option, :location).merge(user_id: current_user.id)
  end

  def set_post
    @post = Post.find(params[:id])
  end
end
