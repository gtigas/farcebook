class FixNotificationAgain < ActiveRecord::Migration[5.1]
  def change
    change_column :notifications, :status, :string, default: 'UNREAD'
  end
end
