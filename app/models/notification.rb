# == Schema Information
#
# Table name: notifications
#
#  id              :integer          not null, primary key
#  notifee_id      :integer
#  notifiable_id   :integer
#  notifiable_type :string
#  status          :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Notification < ApplicationRecord
  validates :notifee_id, :notifiable_id, :notifiable_type, presence:true
  validates :status, presence:true, inclusion: { in: ['UNREAD', 'READ']}

  belongs_to :user, foreign_key: :notifee_id, class_name: 'User'
  belongs_to :notifiable, polymorphic:true
end
