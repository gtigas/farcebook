class CreateFriendships < ActiveRecord::Migration[5.1]
  def change
    create_table :friendships do |t|
      t.integer :requester_id, null:false
      t.integer :receiver_id, null:false
      t.string :status, null:false,  default:'PENDING'
      t.timestamps
    end
    add_index :friendships,  [:receiver_id, :requester_id], unique: true
  end
end
