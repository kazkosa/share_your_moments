FactoryBot.define do
  factory :post do
    image { Rack::Test::UploadedFile.new(File.join(Rails.root, 'public/Logo.png'))}
    image_option {"normal"}
    title   {"test_title"}
    content {"test_content"}
    user
    #user_id {1}
    created_at { Faker::Time.between(from: DateTime.now - 2, to: DateTime.now) }
  end
end