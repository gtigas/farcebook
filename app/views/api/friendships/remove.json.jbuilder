json.request do
  json.id @request.id
  json.requester @request.requester_id
  json.receiver @request.receiver_id
end

json.receiver do
  json.id @request.receiver.id
  json.profile_picture_url @request.receiver.profile_picture.url
  json.fullName [@request.receiver.first_name.capitalize,@request.receiver.last_name.capitalize].join(" ")
  json.friend_ids @request.receiver.friend_ids
end

json.requester do
  json.id @request.requester.id
  json.profile_picture_url @request.requester.profile_picture.url
  json.fullName [@request.requester.first_name.capitalize,@request.requester.last_name.capitalize].join(" ")
  json.friend_ids @request.requester.friend_ids
end
