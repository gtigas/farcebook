class Api::FriendshipsController < ApplicationController

  def friends
    @friends = Friendship.where(receiver_id: current_user.id, status:'ACCEPTED')
    render :index
  end

  def pending_requests
    @friends = Friendship.where(receiver_id: current_user.id, status:'PENDING')
    render :index
  end

  def request_friendship
    @request = Friendship.new()
    @request.requester = current_user
    @request.receiver_id = params[:user_id]
    if @request.save
      render :show
    else
      render json: @request.errors.full_messages, status: 422
    end
  end

  def accept_friendship
    @request = Friendship.where(requester_id: params[:user_id], receiver_id: current_user.id)[0]
    @request.status = 'ACCEPTED'
    @request.save!
    render :show
  end

  def reject_friendship
    request = Friendship.where(requester_id: params[:user_id], receiver_id: current_user.id)[0]
    request.destroy!
  end

end
