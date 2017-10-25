@users.each do |user|
  json.set! user.id do
    json.id user.id
    json.fullName [user.first_name.capitalize,user.last_name.capitalize].join(" ")
  end
end
