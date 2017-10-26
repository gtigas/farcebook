class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.text :body, null: false
      t.integer :author_id, null: false
      t.integer :receiver_id, null: false

      t.timestamps
    end
    add_index :posts, :author_id
    add_index :posts, :receiver_id
  end
end
