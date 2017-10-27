json.request do
  json.id @request.id
  json.requester @request.requester_id
  json.receiver @request.receiver_id
end

json.receiver do
  json.partial! 'api/users/user', user: @receiver
end

json.requester do
  json.partial! 'api/users/user', user: @requester
end
