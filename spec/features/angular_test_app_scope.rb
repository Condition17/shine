require 'rails_helper'

feature "angular test" do
	let(:email){ "cristian@shine.com"}
	let(:password){ "testpasswordtest"}
	before do
		User.create!(email: email, password: password, password_confirmation: password);
	end

	scenario "Angular test app is working" do
		visit "/angular_test"

		fill_in "Email", with: "cristian@shine.com"
		fill_in "Password", with: "testpasswordtest"
		click_button "Log in"

		expect(page).to have_content("Name")

		fill_in "name", with: "Bob"
		within "header h1" do
			expect(page).to have_content("Bob")
		end
	end
end