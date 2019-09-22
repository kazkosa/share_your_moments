class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.text :text, null: false
      t.references :user, foreign_key: true, on_delete: :cascade
      t.references :post, foreign_key: true, on_delete: :cascade
      t.timestamps
    end
  end
end
