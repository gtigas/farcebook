# == Schema Information
#
# Table name: posts
#
#  id          :integer          not null, primary key
#  body        :text             not null
#  author_id   :integer          not null
#  receiver_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Post < ApplicationRecord
  validates :body, :author_id, :receiver_id, presence:true
  validates :body, length: { maximum: 63206 }
  has_attached_file :image, default_url: "null"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/


  belongs_to :author,
    foreign_key: :author_id,
    class_name: 'User'

  belongs_to :receiver,
    foreign_key: :receiver_id,
    class_name: 'User'

  has_many :comments,
    dependent: :destroy

  has_many :likes,
    as: :likable,
    dependent: :destroy


  has_many :likers,
    through: :likes

  has_many :notifiables,
    as: :notifiable,
    class_name: 'Notification',
    dependent: :destroy

  def user_likes(user)
    self.liker_ids.include?(user.id)
  end

end
