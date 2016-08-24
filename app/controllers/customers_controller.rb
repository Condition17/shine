class CustomersController < ApplicationController
	PAGE_SIZE = 10
  def index
  	@page_size = PAGE_SIZE
  	@customers = []
  	@page = params[:page].to_i > 0 ? params[:page].to_i : 0
    if params[:keywords].present? 
    	@keywords = params[:keywords]
    	customer_search_term = CustomerSearchTerm.new( @keywords )
    	@customers = Customer.where(customer_search_term.where_clause,customer_search_term.where_args).order(customer_search_term.order).offset(PAGE_SIZE*@page).limit(PAGE_SIZE)
    end
  end
end
