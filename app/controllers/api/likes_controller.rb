class Api::LikesController < ApplicationController

  def like_comment
    @comment = Comment.find(params[:id])
    @comment.likes << Like.new(liker_id: current_user.id)
  end

  def like_post
    @post = Post.find(params[:id])
    @post.likes << Like.new(liker_id: current_user.id)
  end

  def unlike_comment
    @comment = Comment.find(params[:id])

  end

  def unlike_post
    @post = Post.find(params[:id])

  end

end
