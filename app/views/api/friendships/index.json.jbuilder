@friends.each do |friend|
  json.set! friend.id do
    json.id friend.id
    json.fullName [friend.first_name.capitalize,friend.last_name.capitalize].join(" ")
    json.profile_picture_url friend.profile_picture.url
  end
end
