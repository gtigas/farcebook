# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171031202917) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string "body", null: false
    t.integer "post_id", null: false
    t.integer "author_id", null: false
    t.integer "parent_comment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_comments_on_author_id"
    t.index ["post_id"], name: "index_comments_on_post_id"
  end

  create_table "friendships", force: :cascade do |t|
    t.integer "requester_id", null: false
    t.integer "receiver_id", null: false
    t.string "status", default: "PENDING", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["receiver_id", "requester_id"], name: "index_friendships_on_receiver_id_and_requester_id", unique: true
  end

  create_table "likes", force: :cascade do |t|
    t.integer "liker_id", null: false
    t.string "likable_type"
    t.bigint "likable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["likable_type", "likable_id"], name: "index_likes_on_likable_type_and_likable_id"
    t.index ["liker_id", "likable_id", "likable_type"], name: "index_likes_on_liker_id_and_likable_id_and_likable_type", unique: true
  end

  create_table "notifications", force: :cascade do |t|
    t.integer "notifee_id", null: false
    t.integer "notifiable_id", null: false
    t.string "notifiable_type"
    t.string "status", default: "UNREAD"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["notifee_id", "notifiable_id"], name: "index_on_user_notificaions", unique: true
  end

  create_table "posts", force: :cascade do |t|
    t.text "body", null: false
    t.integer "author_id", null: false
    t.integer "receiver_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_posts_on_author_id"
    t.index ["receiver_id"], name: "index_posts_on_receiver_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.date "birth_date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "profile_picture_file_name"
    t.string "profile_picture_content_type"
    t.integer "profile_picture_file_size"
    t.datetime "profile_picture_updated_at"
    t.string "cover_photo_file_name"
    t.string "cover_photo_content_type"
    t.integer "cover_photo_file_size"
    t.datetime "cover_photo_updated_at"
    t.string "hometown"
    t.string "current_city"
    t.string "school"
    t.string "workplace"
    t.string "gender"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["password_digest"], name: "index_users_on_password_digest"
    t.index ["session_token"], name: "index_users_on_session_token"
  end

end
