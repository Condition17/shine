require 'rails_helper'

def create_customer(first_name: nil, last_name: nil, email: nil)
	first_name ||= Faker::Name.first_name
	last_name ||= Faker::Name.last_name
	email ||= "#{Faker::Internet.user_name}#{rand(3500)}@#{Faker::Internet.domain_name}"
	Customer.create!(first_name: first_name, last_name: last_name, email: email, username: "#{Faker::Internet.user_name}#{rand(1000)}")
end

feature "Shine search" do
	let(:email){ "cristian@shine.com"}
	let(:password){ "testpasswordtest"}

	before do
		User.create!(email: email, password: password, password_confirmation: password);
		create_customer first_name: "Robert",last_name: "Aaron"

    create_customer first_name: "Bob",last_name: "Johnson"

    create_customer first_name: "JR",last_name: "Bob", email: "bobolino@something.com"

    create_customer first_name: "Bobby",last_name: "Dobbs"

    create_customer first_name: "Bob", last_name: "Jones", email: "bob123@somewhere.net"

    visit("/customers")
		fill_in "Email", with: "cristian@shine.com"
		fill_in "Password", with: "testpasswordtest"
		click_button "Log in"
	end

	scenario "searching by name works" do

		within "section.search-form" do
			fill_in "keywords", with: "Bob"
		end
		within "section .search-results" do
			expect(page).to have_content( "Results")
			expect(page.all("ol li.list-group-item").count).to eq(4)
			expect(page.all("ol li.list-group-item")[0]).to have_content("Bob")
			expect(page.all("ol li.list-group-item")[0]).to have_content("JR")
			expect(page.all("ol li.list-group-item")[1]).to have_content("Dobbs")
			expect(page.all("ol li.list-group-item")[1]).to have_content("Bobby")
			expect(page.all("ol li.list-group-item")[2]).to have_content("Johnson")
			expect(page.all("ol li.list-group-item")[2]).to have_content("Bob")
			expect(page.all("ol li.list-group-item")[3]).to have_content("Jones")
			expect(page.all("ol li.list-group-item")[3]).to have_content("Bob")

		end
	end

	scenario "search by email works" do
		within "section.search-form" do
			fill_in "keywords", with: "bobolino@something.com"
		end
		within "section .search-results" do
			expect(page).to have_content( "Results")
			expect(page.all("ol li.list-group-item").count).to eq(1)
			expect(page.all("ol li.list-group-item")[0]).to have_content("Bob")
			expect(page.all("ol li.list-group-item")[0]).to have_content("JR")
		end
	end
end

