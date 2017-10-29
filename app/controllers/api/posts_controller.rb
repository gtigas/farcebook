class Api::PostsController < ApplicationController
  before_action :ensure_logged_in

  def feed
    @users = current_user.friends
    @current_user = current_user
    @posts = @users.inject([]) do |posts, user|
      posts.concat(user.authored_posts)
      posts.concat(user.wall_posts)
    end
    @posts.concat(@current_user.authored_posts)
    @posts.concat(@current_user.wall_posts)
    @posts = @posts.uniq
    @comments = @posts.inject([]) do |comments, post|
      comments.concat(post.comments)
    end
  end

  def index
    @posts = Post.where(receiver_id: params[:user_id])
                  .includes(:comments)
                  .order(updated_at: :asc)
    @comments = []
    @posts.each do |post|
      @comments.concat(post.comments)
    end
  end

  def create
    @post = Post.new(post_params)
    @post.author = current_user
    if @post.save
      render :post
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def update
    @post = Post.find(params[:id])
    @post.update_attributes(post_params)
    @post.save
    render :post
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render :post
  end

  private

  def post_params
    params.require(:post).permit(:body, :receiver_id)
  end
end
