class Api::LikesController < ApplicationController

  def like_comment
    @comment = Comment.find(params[:comment_id])
    new_like =  Like.new(liker_id: current_user.id)
    @comment.likes << new_like
    if @comment.author_id != current_user.id
      Like.last.notifiables << Notification.new(notifee_id: @comment.author_id)
    end
    @current_user = current_user
    render :like_comment
  end

  def like_post
    @post = Post.find(params[:post_id])
    new_like =  Like.new(liker_id: current_user.id)
    @post.likes << Like.new(liker_id: current_user.id)
    if @post.author_id != current_user.id
      Like.last.notifiables << Notification.new(notifee_id: @post.author_id)
    end
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
