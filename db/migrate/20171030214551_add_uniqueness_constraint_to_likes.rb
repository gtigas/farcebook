class AddUniquenessConstraintToLikes < ActiveRecord::Migration[5.1]
  def change
    add_index :likes, [:liker_id, :likable_id], unique:true
  end
end
