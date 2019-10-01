class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.references :user, foreign_key: true, on_delete: :cascade
      t.references :post, foreign_key: true, on_delete: :cascade
      t.timestamps
    end
  end
end
