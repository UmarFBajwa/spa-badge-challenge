class Teacher < ActiveRecord::Base
  has_many :badges
  validates_presence_of :name
end
