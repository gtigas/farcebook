# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
kermit = User.create!(email: 'kermit@TheMuppetShow.com', first_name: 'Kermit', last_name: 'The Frog', password:'asdf123', birth_date: Faker::Date.between(50.years.ago, Date.today))
kermit.update(profile_picture: File.open("#{Rails.root}/app/assets/images/kermit.jpg"))
miss_piggy = User.create!(email: 'miss.piggy@TheMuppetShow.com', first_name: 'Miss', last_name: 'Piggy', password:'asdf123', birth_date: Faker::Date.between(50.years.ago, Date.today))
miss_piggy.update(profile_picture: File.open("#{Rails.root}/app/assets/images/piggy.jpeg"))
gonzo = User.create!(email: 'gonzo@@TheMuppetShow.com', first_name: 'Gonzo', last_name:'the Muppet', password:'asdf123', birth_date: Faker::Date.between(50.years.ago, Date.today) )
gonzo.update(profile_picture: File.open("#{Rails.root}/app/assets/images/gonzo.jpeg"))
animal = User.create!(email: 'animal@TheMuppetShow.com', first_name: 'Animal', last_name: 'The Muppet', password: 'asdf123', birth_date: Faker::Date.between(50.years.ago, Date.today))
animal.update(profile_picture: File.open("#{Rails.root}/app/assets/images/animal.png"))
fozzie = User.create!(email: 'fozzie@@TheMuppetShow.com', first_name: 'Fozzie', last_name: 'Bear', password:'asdf123', birth_date: Faker::Date.between(50.years.ago, Date.today))
fozzie.update(profile_picture: File.open("#{Rails.root}/app/assets/images/fozzie.jpg"))
sam = User.create!(email: 'sam@@TheMuppetShow.com', first_name: 'Sam', last_name: 'The Eagle', password:'asdf123', birth_date: Faker::Date.between(50.years.ago, Date.today))
sam.update(profile_picture: File.open("#{Rails.root}/app/assets/images/sam.jpg"))
honeydew = User.create!(email: 'prof.honeydew@TheMuppetShow.com', first_name: 'Prof Bunsen', last_name: 'Honeydew', password: 'asdf123', birth_date: Faker::Date.between(50.years.ago, Date.today))
honeydew.update(profile_picture: File.open("#{Rails.root}/app/assets/images/honeydew.jpg"))
beaker = User.create!(email: 'prof.beaker@TheMuppetShow.com', first_name: 'Beaker', last_name:'The Muppet', password:'asdf123', birth_date:Faker::Date.between(50.years.ago, Date.today))
beaker.update(profile_picture: File.open("#{Rails.root}/app/assets/images/beaker.jpg"))
statler = User.create!(email: 'statler&waldorf@TheMuppetShow.com', first_name:'Statler', last_name:"and Waldorf", password:'asdf123', birth_date: Faker::Date.between(50.years.ago, Date.today))
statler.update(profile_picture: File.open("#{Rails.root}/app/assets/images/statler.jpg"))

Friendship.create!(requester_id: kermit.id, receiver_id: miss_piggy.id, status: 'ACCEPTED')
Friendship.create!(requester_id: kermit.id, receiver_id: gonzo.id, status: 'ACCEPTED')
Friendship.create!(requester_id: kermit.id, receiver_id: animal.id, status: 'ACCEPTED')
Friendship.create!(requester_id: kermit.id, receiver_id: statler.id, status: 'ACCEPTED')
Friendship.create!(requester_id: kermit.id, receiver_id: honeydew.id, status: 'ACCEPTED')
Friendship.create!(requester_id: beaker.id, receiver_id: miss_piggy.id, status: 'ACCEPTED')
Friendship.create!(requester_id: statler.id, receiver_id: miss_piggy.id, status: 'ACCEPTED')
Friendship.create!(requester_id: fozzie.id, receiver_id: miss_piggy.id, status: 'ACCEPTED')
Friendship.create!(requester_id: fozzie.id, receiver_id: gonzo.id, status: 'ACCEPTED')
Friendship.create!(requester_id: fozzie.id, receiver_id: sam.id, status: 'ACCEPTED')
Friendship.create!(requester_id: fozzie.id, receiver_id: statler.id, status: 'ACCEPTED')
Friendship.create!(requester_id: fozzie.id, receiver_id: kermit.id, status: 'ACCEPTED')
Friendship.create!(requester_id: gonzo.id, receiver_id: miss_piggy.id, status: 'ACCEPTED')
Friendship.create!(requester_id: gonzo.id, receiver_id: beaker.id, status: 'ACCEPTED')
Friendship.create!(requester_id: gonzo.id, receiver_id: honeydew.id, status: 'ACCEPTED')


muppet_ids = (kermit.id..statler.id).to_a

30.times do
  Post.create!(author_id:muppet_ids.sample, receiver_id:muppet_ids.sample, body: Faker::TheFreshPrinceOfBelAir.quote)
end
