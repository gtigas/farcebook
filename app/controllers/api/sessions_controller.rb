class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
                  params[:user][:email],
                  params[:user][:password]
    )
    if @user
      login(@user)
      @feed = Post.where(receiver_id: @user.id)
          .or(Post.where('(author_id IN (?)) AND (receiver_id != ?)', @user.friend_ids, @user.id))
          .order(updated_at: :desc)
          .map(&:id)
      render 'api/users/session'
    else
      render json: ['Invalid username/password combination'], status: 401
    end
  end

  def destroy
    @user = current_user
    logout
    render json: ["Logged out!"], status: 200
  end

end
