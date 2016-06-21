class Badge < ActiveRecord::Base
  belongs_to :teacher
  validates_presence_of :phrase
end
