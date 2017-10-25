@users.each do |user|
  json.set! user.id do
    json.fullName (user.first_name.capitalize + user.last_name.capitalize)
  end
end
