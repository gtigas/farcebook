json.array!(@friends) do |friend|
  json.requester_id friend.requester_id
  json.receiver_id friend.receiver_id
end
