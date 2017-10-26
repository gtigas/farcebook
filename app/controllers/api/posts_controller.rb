class Api::PostsController < ApplicationController
  before_action :ensure_logged_in

  def index
    @posts = Post.where(receiver_id: current_user.id)
  end

  def create
    @post = Post.new(post_params)
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
    params.require(:post).permit(:body, :receiver_id, :author_id)
  end
end
