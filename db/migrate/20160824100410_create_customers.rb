class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|
    	t.string :firstname, null: false
    	t.string :lastname, null:false
    	t.string :email, null:false
    	t.string :username, null:false
    	t.timestamps null: false
    end

    add_index :customers, [:username, :email], unique: true
  end
end
