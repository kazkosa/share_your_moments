class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :title, null: false, index: true
      t.text :content
      t.text :image
      t.references :user, foreign_key: true, on_delete: :cascade
      t.timestamps
    end
  end
end
