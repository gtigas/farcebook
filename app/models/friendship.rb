# == Schema Information
#
# Table name: friendships
#
#  id           :integer          not null, primary key
#  requester_id :integer          not null
#  receiver_id  :integer          not null
#  status       :string           default("PENDING"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Friendship < ApplicationRecord
  validates :requester_id, :receiver_id, presence: true
  validates :status, presence:true, inclusion: { in: ['PENDING', 'ACCEPTED'] }
  validate :cannot_add_self

  belongs_to :requester,
    class_name: 'User',
    foreign_key: :requester_id

  belongs_to :receiver,
    class_name: 'User',
    foreign_key: :receiver_id

  has_many :notifiables,
    as: :notifiable,
    class_name: 'Notification',
    dependent: :destroy

  private

  def cannot_add_self
    if requester_id == receiver_id
      errors.add(:receiver_id, 'You cannot add yourself as a friend')
    end
  end

end
