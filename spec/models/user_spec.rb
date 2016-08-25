require 'rails_helper'
require 'support/violate_check_constraint_matcher'
describe User do
	describe "email" do
		let(:user){
			User.create!(email: "foo@shine.com",
				password: "thisisapassword",
				password_confirmation: "thisisapassword")
		}
		it "should prevent invalid email adresses" do
			user.update_attribute(:email, "foo@bar.com").to violate_check_constraint_matcher(:email_must_be_company_email)
		end
	end	
end