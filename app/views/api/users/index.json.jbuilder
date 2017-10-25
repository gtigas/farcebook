@users.each do |user|
  json.set! user.id do
    json.fullName (user.first_name + user.last_name)
  end
end
