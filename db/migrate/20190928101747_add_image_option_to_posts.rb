class AddImageOptionToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :image_option, :string
  end
end
