json.extract! @user, :id, :email, :birth_date, :hometown, :current_city, :school, :workplace, :gender
json.fullName [@user.first_name.capitalize,@user.last_name.capitalize].join(" ")
json.profile_picture_url @user.profile_picture.url
json.cover_photo_url @user.cover_photo.url
