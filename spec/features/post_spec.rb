require 'rails_helper'

feature 'post', type: :feature do
  let(:user){create(:user)}
  scenario 'redirect function before sign_in' do
    visit root_path
    expect(page).to have_no_link('Posts')

    #sing_in
    visit new_user_session_path
    fill_in 'session_email', with: user.email
    fill_in 'session_password', with: user.password
    find('.submit').click
    expect(current_path).to eq root_path
    expect(page).to have_link('Posts')
    
    #new
    visit new_post_path
    find('input[type="file"]').click
    attach_file "post_image[images][]", "public/Logo2.png"
    find('.step1 .to_step2',visible: true).click
    find('.step2 .to_step3',visible: true).click
    fill_in 'new_title',    with: "test_title2"
    fill_in 'new_content',  with: "test_content2"
    find('.step3 .to_confirm',visible: true).click
    find('.actions .submit',visible: true).click
    
    #index
    expect(current_path).to eq root_path
    find('.post-main__inner__container__list__wrapper__article-box__link').click

    expect(page).to have_content "test_title2"
    expect(page).to have_content "test_content2"
    expect(page).to have_selector("img[src$='Logo2.png']")

  end
end