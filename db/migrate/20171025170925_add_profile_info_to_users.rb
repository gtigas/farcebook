class AddProfileInfoToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :hometown, :string
    add_column :users, :current_city, :string
    add_column :users, :school, :string
    add_column :users, :workplace, :string
  end
end
