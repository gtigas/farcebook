json.received do
  @received_requests.each do |request|
    json.set! request.id do
      json.id request.id
      json.requester_id request.requester_id
      json.requester_name request.requester.first_name + " " + request.requester.last_name
      json.profile_picture_url request.requester.profile_picture.url
    end
  end
end

json.sent @sent_request_ids
