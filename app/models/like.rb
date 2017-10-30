class Like < ApplicationRecord
  belongs_to :likable, polymorphic: true
end
