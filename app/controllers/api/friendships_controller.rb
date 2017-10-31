class Api::FriendshipsController < ApplicationController
  before_action :ensure_logged_in

  def friends
    @friends = current_user.friends
    render :index
  end

  def pending_requests
    @received_requests = current_user.received_requests.where(status:'PENDING')
    sent_requests = current_user.sent_requests.where(status:'PENDING')
    @sent_request_ids = []
    sent_requests.each{ |req| @sent_request_ids << req.receiver_id }
    render :pending
  end

  def request_friendship
    @request = Friendship.new()
    @request.requester = current_user
    @request.receiver_id = params[:user_id]
    if @request.save
      @request.notifiables << Notification.new(notifee_id: params[:user_id])
      render :show
    else
      render json: @request.errors.full_messages, status: 422
    end
  end

  def accept_friendship
    @request = Friendship.includes(:requester, :receiver).where(requester_id: params[:user_id], receiver_id: current_user.id)[0]
    @request.status = 'ACCEPTED'
    @request.save!
    render :remove
  end

  def reject_friendship
    @request = Friendship.where('(requester_id = ? AND receiver_id = ?)
                              OR (requester_id = ? AND receiver_id = ?)',
                              params[:user_id], current_user.id,
                              current_user.id, params[:user_id])[0]
    @request.destroy
    render :remove
  end

end
