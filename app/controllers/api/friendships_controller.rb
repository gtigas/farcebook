class Api::FriendshipsController < ApplicationController

  def friends
    @frends = Friendship.where(receiver_id: current_user.id, status:'ACCEPTED')
    render :index
  end

  def pending_requests
    @requests = Friendship.where(receiver_id: current_user.id, status:'PENDING')
    render :index
  end

  def request_friendship
    @request = Friendship.new(friendship_params)
    @request.receiver = current_user
    if @request.save
      login(@request)
      render :show
    else
      render json: @request.errors.full_messages, status: 422
    end
  end

  def accept_friendship
    @request = Friendship.where(requester_id: params[:id], receiver_id: current_user.id)[0]
    @request.status = 'ACCEPTED'
    @request.save!
    render :show
  end

  def reject_friendship
    request = Friendship.where(requester_id: params[:id], receiver_id: current_user.id)[0]
    request.destroy!
  end

  private

  def friendship_params
    params.require(:friendship).permit(:requester_id)
  end
end
