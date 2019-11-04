require 'rails_helper'

feature 'user', type: :feature do
  let(:user){create(:user)}
  scenario 'redirect function before sign_in' do
    visit root_path
    expect(page).to have_no_link('Posts')
  end
  scenario 'sing_up function' do
    visit new_user_registration_path
    fill_in 'registration_name', with: "R_Downey"    
    fill_in 'registration_email', with: "downey@mail.com"
    fill_in 'registration_password', with: "543210"
    fill_in 'registration_password_confirmation', with: "543210"
    find('.submit').click
    expect(current_path).to eq root_path
    expect(page).to have_link('Posts')
  end 
  scenario 'sing_in and edit function' do
    #sing_in
    visit new_user_session_path
    fill_in 'session_email', with: user.email
    fill_in 'session_password', with: user.password
    find('.submit').click
    expect(current_path).to eq root_path
    expect(page).to have_link('Posts')
    #edit
    visit "users/#{user.id}/edit" 
    fill_in 'edit_name', with: "Jude_Law2019"    
    fill_in 'edit_email', with: "jude_law2019@mail.com"
    find('.submit').click
    expect(current_path).to eq user_path(user)
  end
end