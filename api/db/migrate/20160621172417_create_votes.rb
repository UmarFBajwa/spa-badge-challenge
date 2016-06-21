class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :badge_id, null: false
      t.boolean :upvote

      t.timestamps null: false
    end
  end
end
