class Api::LikesController < ApplicationController

  def like_comment
    @comment = Comment.find(params[:comment_id])
    @comment.likes << Like.new(liker_id: current_user.id)
    @current_user = current_user
    render :like_comment
  end

  def like_post
    @post = Post.find(params[:post_id])
    @post.likes << Like.new(liker_id: current_user.id)
    @current_user = current_user
    render :like_post
  end

  def unlike_comment
    @comment = Comment.find(params[:comment_id])
    @comment.likes.where(liker_id: current_user.id).destroy_all
    render :like_comment
  end

  def unlike_post
    @post = Post.find(params[:post_id])
    @post.likes.where(liker_id: current_user.id).destroy_all
    render :like_post
  end

end
