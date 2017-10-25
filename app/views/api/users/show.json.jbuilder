json.extract! @user, :id, :email, :birth_date
json.fullName (@user.first_name.capitalize + " " + @user.last_name.capitalize)
