class Like < ApplicationRecord
  belongs_to :likable, polymorphic: true

  belongs_to :liker,
    class_name: 'User'
end
