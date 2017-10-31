class FixIndexOnLikes < ActiveRecord::Migration[5.1]
  def change
    remove_index :likes, name: "index_likes_on_liker_id_and_likable_id"
    add_index :likes, [:liker_id, :likable_id, :likable_type], unique:true
  end
end
