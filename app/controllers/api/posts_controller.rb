class Api::PostsController < ApplicationController
  before_action :ensure_logged_in

  def feed
    @current_user = User.find_by(id: params[:userId]) || current_user
    @users = User.all

    author_ids = @current_user.friend_ids + [@current_user.id]

    @posts = Post.includes(comments: {likes: :liker_id}, likes: :liker_id)
                .where('author_id IN (?) OR receiver_id = ?', author_ids, @current_user.id)
                .limit(10)
                .order(updated_at: :desc)
                .distinct

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
