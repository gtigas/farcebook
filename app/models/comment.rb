# == Schema Information
#
# Table name: comments
#
#  id                :integer          not null, primary key
#  body              :string           not null
#  post_id           :integer          not null
#  author_id         :integer          not null
#  parent_comment_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Comment < ApplicationRecord
  validates :body, :post_id, :author_id, presence:true
  validates :body, length: { maximum: 300 }

  belongs_to :author,
    class_name: 'User'

  belongs_to :post

  belongs_to :parent_comment,
    class_name: 'Comment',
    foreign_key: :parent_comment_id,
    optional: true

  has_many :child_comments,
    class_name: 'Comment',
    foreign_key: :parent_comment_id
end
