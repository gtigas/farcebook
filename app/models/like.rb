class Like < ApplicationRecord
  validates :liker_id, presence:true
  validate :duplicate_like

  belongs_to :likable, polymorphic: true


  belongs_to :liker,
    class_name: 'User'


end
