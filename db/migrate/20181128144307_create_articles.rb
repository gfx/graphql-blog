class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.text :name, null: false
      t.text :content, null: false

      t.timestamps(null: false)
    end
  end
end
