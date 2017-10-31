# == Schema Information
#
# Table name: likes
#
#  id           :integer          not null, primary key
#  liker_id     :integer          not null
#  likable_type :string
#  likable_id   :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Like < ApplicationRecord
  validates :liker_id, presence:true

  belongs_to :likable, polymorphic: true


  belongs_to :liker,
    class_name: 'User'

  has_many :notifiables,
    as: :notifiable,
    class_name: 'Notification',
    dependent: :destroy

end
