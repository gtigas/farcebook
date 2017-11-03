class Api::PostsController < ApplicationController
  before_action :ensure_logged_in

  def feed
    @current_user = current_user
    @users = User.all
    @notifications = @current_user.notifications.order(created_at: :desc)

    author_ids = @current_user.friend_ids + [@current_user.id]

    @posts = Post.includes(comments: [{likes: :liker}, :child_comments], likes: :liker)
                .where('author_id IN (?) OR receiver_id = ?', author_ids, @current_user.id)
                .limit(10)
                .order(updated_at: :desc)
                .distinct

    @comments = []
    @posts.each do |post|
      @comments.concat(post.comments)
    end

  end

  def index
    @current_user = current_user
    @users = User.all
    @notifications = @current_user.notifications.order(created_at: :desc)
    @posts = Post.where(receiver_id: params[:user_id])
                  .includes(comments: [{likes: :liker}, :child_comments], likes: :liker)
                  .order(updated_at: :desc)
    @comments = []
    @posts.each do |post|
      @comments.concat(post.comments)
    end
    render :feed
  end

  def show
    @post = Post
            .includes(comments: [{likes: :liker}, :child_comments], likes: :liker)
            .find(params[:id])
    @comments = @post.comments
    @current_user = current_user
  end

  def create
    @post = Post.new(post_params)
    @current_user = current_user
    @post.author = current_user
    if @post.save
      if @post.receiver_id != @post.author_id
        @post.notifiables << Notification.new(notifee_id: @post.receiver_id)
      end
      render :post
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def update
    @post = Post.find(params[:id])
    @current_user = current_user
    @post.update_attributes(post_params)
    @post.save
    render :post
  end

  def destroy
    @post = Post.find(params[:id])
    @current_user = current_user
    @post.destroy
    render :post
  end

  private

  def post_params
    params.require(:post).permit(:body, :receiver_id, :image)
  end
end
