# == Schema Information
#
# Table name: users
#
#  id                           :integer          not null, primary key
#  email                        :string           not null
#  first_name                   :string           not null
#  last_name                    :string           not null
#  password_digest              :string           not null
#  session_token                :string           not null
#  birth_date                   :date             not null
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#  profile_picture_file_name    :string
#  profile_picture_content_type :string
#  profile_picture_file_size    :integer
#  profile_picture_updated_at   :datetime
#  cover_photo_file_name        :string
#  cover_photo_content_type     :string
#  cover_photo_file_size        :integer
#  cover_photo_updated_at       :datetime
#  hometown                     :string
#  current_city                 :string
#  school                       :string
#  workplace                    :string
#  gender                       :string
#

class User < ApplicationRecord
  validates :first_name, :last_name, presence: true
  validates :email, presence:true, uniqueness:true
  validates :gender, presence:true, inclusion: { in: ['male', 'female']}
  validates :password_digest, :session_token, presence:true
  validates :password, length: { minimum: 6, allow_nil: true }
  has_attached_file :profile_picture, default_url: "https://s3.us-east-2.amazonaws.com/farcebook-dev/default.jpeg"
  has_attached_file :cover_photo, default_url: 'https://s3.us-east-2.amazonaws.com/farcebook-dev/default.jpg'
  validates_attachment_content_type :profile_picture, content_type: /\Aimage\/.*\Z/
  validates_attachment_content_type :cover_photo, content_type: /\Aimage\/.*\Z/
  after_initialize :ensure_session_token

  attr_reader :password

  has_many :sent_requests,
    foreign_key: :requester_id,
    class_name: 'Friendship',
    dependent: :destroy

  has_many :received_requests,
    foreign_key: :receiver_id,
    class_name: 'Friendship',
    dependent: :destroy

  has_many :authored_posts,
    foreign_key: :author_id,
    class_name: 'Post',
    dependent: :destroy

  has_many :wall_posts,
    foreign_key: :receiver_id,
    class_name: 'Post',
    dependent: :destroy

  has_many :authored_comments,
    foreign_key: :author_id,
    class_name: 'Comment',
    dependent: :destroy

  has_many :notifications,
    foreign_key: :notifee_id

  def friendships
    Friendship.includes(:receiver, :requester )
              .where('(receiver_id = ? OR requester_id = ?)
                        AND status = ?', self.id, self.id, 'ACCEPTED')
    # Friendship.includes(receiver: { authored_posts: [comments: { likers: :ids}, likers: :ids],
    #                     wall_posts: [comments:{ likers: :ids}, likers: :ids]},
    #                     requester: { authored_posts: [comments: { likers: :ids}, likers: :ids],
    #                     wall_posts: [comments: { likers: :ids}, likers: :ids]})
    #                     .where('(receiver_id = ? OR requester_id = ?) AND status = ?', self.id, self.id, 'ACCEPTED')
  end

  def friends
    friends = []
    friendships.each do |friendship|
      friends << (friendship.receiver == self ? friendship.requester : friendship.receiver)
    end
    friends
  end

  def friend_ids
    friend_ids = []
    friendships.each do |friendship|
      friend_ids << ( (friendship.receiver == self) ? friendship.requester_id : friendship.receiver_id )
    end
    friend_ids
  end

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

end
