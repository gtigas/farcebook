class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.integer :notifee_id
      t.integer :notifiable_id
      t.string :notifiable_type
      t.string :status

      t.timestamps
    end
    add_index :notifications, [:notifee_id, :notifiable_id, :notifiable_id], unique:true, name: 'index_on_user_notificaions'
  end
end
