class AddLowerIndexesToCustomers < ActiveRecord::Migration
  def up
  	#customers_lower_last_name already exists!
  	execute %{
  		CREATE INDEX
  			customers_lower_first_name
  		ON
  			customers( lower( first_name) varchar_pattern_ops)
  	}
  	execute %{
  		CREATE INDEX
  			customers_lower_email
  		ON
  			customers( lower(email))
  	}
  end
  def down
  	remove_index :customers, name: 'customers_lower_last_name'
  	remove_index :customers, name: 'customers_lower_first_name'
  	remove_index :customers, name: 'customers_lower_email'
  end
end
