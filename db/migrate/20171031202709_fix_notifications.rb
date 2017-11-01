class FixNotifications < ActiveRecord::Migration[5.1]
  def change
    change_column :notifications, :status, :string, default: 'UNDREAD'
    change_column :notifications, :notifee_id, :integer, null: false
    change_column :notifications, :notifiable_id, :integer, null: false
  end
end
