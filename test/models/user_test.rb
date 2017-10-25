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

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
